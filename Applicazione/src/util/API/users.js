import IPFS, { Buffer } from 'ipfs-http-client';
import Init from './init';
import Helper from './utils/helper';

const currentAccount = Init.getCurrentAccount;
const userManager = Init.getUserManagerContract;
const cubit = Init.getCubitContract;

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

/**
 * @module Users
 * */
const Users = {

  /**
   * Registers the given user by taking the user’s data and parsing them into a JSON file.
   * Once the JSON file has been created this will be stored in IPFS; this operation returns an hash
   * that will be used to register the user inside the blockchain
   * @function registerUser
   * @param {Object} userData object that contains the data belonging the user to register
   * */
  registerUser(userData) {
    const bufferToUpload = Buffer.from(JSON.stringify(userData));
    return ipfs.add(bufferToUpload).then((result) => {
      const hash = Helper.getBytes32FromIpfsHash(result[0].hash);
      return currentAccount()
        .then(currAccount => userManager().methods.registerUser(userData.userType, hash)
          .send({ from: currAccount }));
    });
  },

  /**
   * This method builds the JSON ob- ject containing the citizens’s data to be
   * sent to the function "registerUser()" in order to register a citizen
   * @function registerCitizen
   * @param {String} name citizen's name
   * @param {String} surname citizen's surname
   * @param {String} fiscalCode citizen's fiscal code
   * @param {String} mail citizen's mail
   * */
  registerCitizen(name, surname, fiscalCode, mail) {
    return currentAccount().then(() => Users.registerUser({
      userType: 1,
      name,
      surname,
      fiscalCode,
      mail,
    }));
  },

  /**
   * This method builds the JSON object containing the business owner’s data to be sent to the
   * function "registerUser()" in order to register a business owner
   * @function registerBusinessOwner
   * @param {String} businessName business owner's businessName
   * @param {String} location business owner's location
   * @param {String} VATNumber business owner's VATNumber
   * @param {String} CE business owner's CE
   * */
  registerBusinessOwner(businessName, location, VATNumber, CE) {
    return currentAccount().then(() => Users.registerUser({
      userType: 2,
      businessName,
      location,
      VATNumber,
      CE,
    }));
  },

  /**
   * Retrieve the caller’s balance in Cubit
   * @function getUserBalance
   * @param {String} address user account address
   * */
  getUserBalance(address) {
    return cubit().methods.balanceOf(address).call()
      .then(result => new Promise((resolve => resolve(
        (parseFloat(result) / 100.00).toFixed(2),
      ))));
  },

  /**
   * Retrieve citizen data from address
   * @function getCitizenData
   * @param {String} address user account address
   * */
  getCitizenData(address) {
    return userManager().methods.getUserHash(address)
      .call().then(hash => ipfs.cat(Helper.getIpfsHashFromBytes32(hash))
        .then(ipfsResult => Users.getUserBalance(address)
          .then(balance => ({
            ...JSON.parse(ipfsResult.toString()),
            address,
            balance,
          }))));
  },

  /**
   * Retrieve BusinessOwner data from address
   * @function getBusinessData
   * @param {String} address user account address
   * */
  getBusinessData(address) {
    return userManager().methods.getUserHash(address)
      .call().then(hash => ipfs.cat(Helper.getIpfsHashFromBytes32(hash))
        .then(ipfsResult => Users.getUserBalance(address)
          .then(balance => Users.isBusinessOwnerConfirmed(address)
            .then(confirmed => ({
              ...JSON.parse(ipfsResult.toString()),
              balance,
              address,
              confirmed,
            })))));
  },

  /**
   * Retrieve the caller’s data by taking the balance from the blockchain
   * @function getGovernmentData
   * @param {String} address government account address
   * */
  getGovernmentData(address) {
    return Users.getUserBalance(address).then(balance => ({ userType: 3, balance }));
  },

  /**
   * Takes care to return an error if an attempt of login went wrong
   * @function failedLogin
   * @param {Object} error object containing the error to be resolved
   * */
  failedLogin(error) {
    return new Promise((resolve) => {
      resolve({
        userType: 0,
        error,
      });
    });
  },

  /**
   * Allows a registered user to log in Soldino and returns the user’s data
   * @function login
   * @param {String} address user account address
   * */
  login(address = null) {
    return currentAccount().then(currAccount => userManager().methods
      .isRegistered(address === null ? currAccount : address)
      .call({ from: currAccount })
      .then((result) => {
        console.log(result);
        switch (result.toString()) {
          case '0': return Users.failedLogin('User not registered');
          case '1': return Users.getCitizenData(address === null ? currAccount : address);
          case '2': return Users.getBusinessData(address === null ? currAccount : address);
          case '3': return Users.getGovernmentData(address === null ? currAccount : address);
          default: return Users.failedLogin(`Authentication.login returned an unrecognized value: ${result}`);
        }
      }));
  },

  /**
   * Retrieve the list of all citizens
   * @function getAllCitizens
   * */
  getAllCitizens() {
    return userManager().methods.getAllCitizens().call().then(result => result);
  },

  /**
   * Retrieve the list of all confirmed business owners
   * @function getAllBusinessOwners
   * */
  getAllBusinessOwners() {
    return userManager().methods.getAllBusinessOwners().call().then(result => result);
  },

  /**
   * Checks if a the given business owner has been confirmed by the government
   * @function isBusinessOwnerConfirmed
   * @param {String} address the address that we want to know if it belongs to a
   * confirmed business owner
   * */
  isBusinessOwnerConfirmed(address) {
    return userManager().methods.isBusinessOwnerConfirmed(address)
      .call();
  },

  /**
   * Gets a list of objects containing all businesses'data
   * @return {Array} Array of objects with two attributes: address and a boolean
   * value that identifies if the businessOwner is confirmed.
   * @function getAllBusinessData
   * */
  getAllBusinessData() {
    return Users.getAllBusinessOwners()
      .then(allBusinesses => Promise.all(allBusinesses
        .map(business => Users.getBusinessData(business))));
  },

  /**
   * Gets a list of objects containing all citizens'data
   * @function getAllCitizenData
   * @return {Array} Array of objects
   * */
  getAllCitizenData() {
    return Users.getAllCitizens()
      .then(allCitizens => Promise.all(allCitizens
        .map(citizen => Users.getCitizenData(citizen))));
  },

  /**
   * Gets a list of confirmed businessOwner data
   * @function getAllConfirmedBusinessOwnersData
   * @return {Array} Array of objects
   * */
  getAllConfirmedBusinessOwnersData() {
    return Users.getAllBusinessData()
      .then(results => results
        .filter(business => business.confirmed !== '0'));
  },

  /**
   * Retrieve the list of all the registered users that contains all citizens and all
   * the confirmed business owners
   * @function getAllRegisteredUsers
   * */
  getAllRegisteredUsers() {
    return userManager().methods.getAllRegisteredUsers().call().then(result => result);
  },

  /**
   * Lets the government confirm the given business
   * @function confirmBusinessOwner
   * @param {String} address the address that we want to confirm
   * */
  confirmBusinessOwner(address) {
    return currentAccount().then(currAccount => userManager().methods.confirmBusinessOwner(address)
      .send({ from: currAccount }));
  },

  /**
   * Removes the given business from the list of the business owners
   * @function removeBusinessOwner
   * @param {String} address the address that we want to remove
   * */
  removeBusinessOwner(address) {
    return currentAccount().then(currAccount => userManager().methods.removeBusinessOwner(address)
      .send({ from: currAccount }));
  },
};

export default Users;
