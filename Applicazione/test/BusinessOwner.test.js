const Citizen = artifacts.require('CitizenMock');
const BusinessOwner = artifacts.require('BusinessOwnerMock');
const Cubit = artifacts.require('CubitMock');
const Government = artifacts.require('GovernmentMock');
const UserManager = artifacts.require('UserManagerMock');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
should = chai.should();
chai.use(chaiAsPromised);


contract('BusinessOwner', accounts => {

  before(async () => {
    this.userManager = await UserManager.new();
    this.citizen = await Citizen.new();
    this.businessOwner = await BusinessOwner.new();
    this.cubit = await Cubit.new(accounts[0]);
    this.government = await Government.new();

    await this.userManager.initializeMock(this.citizen.address, this.businessOwner.address, this.government.address);
    await this.citizen.initializeMock(this.userManager.address);
    await this.businessOwner.initializeMock(this.userManager.address);
    await this.government.initializeMock(this.userManager.address, this.cubit.address, accounts[0]);
  });

  describe('#registerBusinessOwner', () => {
    it('should register correctly a business owner', () => {
      return Promise.all([
        this.userManager.callBusinessOwnerRegisterBusinessOwner(
          web3.utils.fromAscii('testHashBO'),
          accounts[1]
        ).should.be.fulfilled,
      this.userManager.callBusinessOwnerLogin(accounts[1]).should.be.fulfilled
          .then((result) => {
            web3.utils.toUtf8(result).should.eq('testHashBO');
          })
      ]);
    });
  });

  describe('#login', () => {

    it('should return correct hash', () => {
      return this.userManager.callBusinessOwnerLogin(accounts[1]).should.be.fulfilled
        .then((result) => {
          web3.utils.toUtf8(result).should.eq('testHashBO');
        });
    });
  });

  describe('#getAllBusinessOwners', () => {

    it('should return the list of all business owners', () => {
      return this.userManager.callBusinessOwnerGetAllBusinessOwners().should.become([accounts[1]]);
    });
  });

  describe('#confirmBusiness', ()=>{

    it('Confirming a business owner', ()=>{
      return this.userManager.callBusinessOwnerConfirmBusiness(accounts[1], {from: accounts[0]}).should.be.fulfilled;
    });

    it('Checking if the business owner has been confirmed', ()=>{
      return this.userManager.callBusinessOwnerIsConfirmed(accounts[1]).should.eventually.deep.not.equal(web3.utils.toBN(0));
    });
  });

  describe('#isConfirmed', ()=>{

    before(()=> {
      this.userManager.callBusinessOwnerRegisterBusinessOwner(
        web3.utils.fromAscii('testHashBO_tmp'),
        accounts[2]);
    });

    it('Checking if the business owner has been confirmed', ()=>{
      return this.userManager.callBusinessOwnerIsConfirmed(accounts[1])
        .should.eventually.deep.not.equal(web3.utils.toBN(0));
    });

    it('Checking that the function returns false with a not confirmed business owner', ()=>{
      return this.userManager.callBusinessOwnerIsConfirmed(accounts[2]).should.become(web3.utils.toBN(0));
    });
  });

  describe('#removeBusiness', ()=>{

    it('Deleting the business owner', ()=>{
      return this.userManager.callBusinessOwnerRemoveBusiness(accounts[2], {from:accounts[0]}).should.be.fulfilled;
    });

    it('Checking if the deletion was successful', ()=>{
      return this.userManager.callBusinessOwnerLogin(accounts[2]).should.be.fulfilled
        .then( (result) => {
          web3.utils.toUtf8(result).should.eq('');
      });
    });
  });
});
