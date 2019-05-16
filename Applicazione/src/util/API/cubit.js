import Init from './init';
import Users from './users';

const cubit = Init.getCubitContract;
const government = Init.getGovernmentContract;
const currentAccount = Init.getCurrentAccount;

/**
 * @module Cubit
 * */
const Cubit = {

  /**
   * Allows the government to mint the given amount of Cubit
   * @function mint
   * @param amount amount of Cubit to be minted
   * */
  mint(amount) {
    const intAmount = parseInt((amount * 100).toFixed(2), 10);
    return currentAccount().then(currAccount => cubit().methods.mint(currAccount, intAmount)
      .send({ from: currAccount }));
  },

  /**
   * Allows to set the allowance to a specific user of the given value
   * @function setAllowance
   * @param spender the user we want to set allowance to
   * @param value the value with which we want to set the allowance
   * */
  setAllowance(spender, value) {
    return currentAccount().then(currAccount => cubit().methods.approve(spender, value)
      .send({ from: currAccount }));
  },

  /**
   * Allows the government to distribute the given amount of Cubit to all registered
   * users except those business owners that have not yet been confirmed by the government
   * @function distributeToAll
   * @param amount the amount of Cubit we want to distribute to each user
   * */
  distributeToAll(amount) {
    const intAmount = parseInt((amount * 100).toFixed(2), 10);
    return currentAccount()
      .then(currAccount => Users.getAllRegisteredUsers()
        .then(users => Cubit.setAllowance(government().options.address, users.length * intAmount)
          .then(() => government().methods.distributeToAll(intAmount)
            .send({ from: currAccount }))));
  },

  /**
   * Allows the government to to distribute the given amount of Cubit to the user contained
   * in the given list
   * @function distributeToUsers
   * @param users the list of user we want to distribute some Cubit to
   * @param amount the amount of Cubit we want to distribute to each user
   * * */
  distributeToUsers(users, amount) {
    const intAmount = parseInt((amount * 100).toFixed(2), 10);
    return currentAccount().then(currAccount => Cubit
      .setAllowance(government().options.address, users.length * intAmount)
      .then(() => government().methods.distributeToUsers(users, intAmount)
        .send({ from: currAccount })));
  },
};

export default Cubit;
