const Citizen = artifacts.require('CitizenMock');
const BusinessOwner = artifacts.require('BusinessOwnerMock');
const Cubit = artifacts.require('CubitMock');
const Government = artifacts.require('GovernmentMock');
const UserManager = artifacts.require('UserManagerMock');


const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
should = chai.should();
chai.use(chaiAsPromised);

contract('UserManager', accounts =>{
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

  describe('#registerUser', ()=>{
    it('should correctly register a citizen', ()=>{
      return Promise.all([
        this.userManager.registerUser(1,
          web3.utils.fromAscii('CitizenHash'),
          {from: accounts[1]}
        ).should.be.fulfilled,

        this.userManager.isRegistered(accounts[1]).should.become(web3.utils.toBN('1')),

        this.userManager.getUserHash(accounts[1]).should.be.fulfilled
          .then((result) => {
            web3.utils.toUtf8(result).should.eq('CitizenHash');
          })
      ]);
    });

    it('should correctly register a business owner', ()=>{
      return Promise.all([
        this.userManager.registerUser(2,
          web3.utils.fromAscii('BusinessHash'),
          {from: accounts[2]}
        ).should.be.fulfilled,
      this.userManager.isRegistered(accounts[2]).should.become(web3.utils.toBN('2')),
      this.userManager.getUserHash(accounts[2]).should.be.fulfilled
          .then((result) => {
            web3.utils.toUtf8(result).should.eq('BusinessHash');
          })
      ]);
    });

    it('should fail to register an already registered citizen', ()=> {
      return Promise.all([
        this.userManager.registerUser(1,
          web3.utils.fromAscii('CitizenHashAgain'),
          { from: accounts[1] }
        ).should.be.rejected,
      this.userManager.registerUser(1,
          web3.utils.fromAscii('GovernmentCitizenHash'),
          { from: accounts[0] }
        ).should.be.rejected
      ]);
    });

    it('should fail to register a user who is neither a citizen nor a business owner', ()=> {
      return Promise.all([
        this.userManager.registerUser(0,
          web3.utils.fromAscii('Hash'),
          { from: accounts[3] }
        ).should.be.rejected,
        this.userManager.registerUser(3,
          web3.utils.fromAscii('Hash'),
          { from: accounts[3] }
        ).should.be.rejected
      ]);
    });
  });

  describe('#login', ()=>{

    it('Logging in a citizen', ()=>{
      return this.userManager.login({from: accounts[1]}).should.become(web3.utils.toBN('1'));
    });

    it('Logging in a business owner', ()=>{
      return this.userManager.login({from: accounts[2]}).should.become(web3.utils.toBN('2'));
    });

    it('Logging in the government', ()=>{
      return this.userManager.login({from: accounts[0]}).should.become(web3.utils.toBN('3'));
    });

    it('Logging a not registered user', ()=>{
      return this.userManager.login({from: accounts[3]}).should.become(web3.utils.toBN('0'));
    });
  });

  describe('#isRegistered', ()=>{

    it('Logging in a citizen', ()=>{
      return this.userManager.isRegistered(accounts[1]).should.become(web3.utils.toBN('1'));
    });

    it('Logging in a business owner', ()=>{
      return this.userManager.isRegistered(accounts[2]).should.become(web3.utils.toBN('2'));
    });

    it('Logging in the government', ()=>{
      return this.userManager.isRegistered(accounts[0]).should.become(web3.utils.toBN('3'));
    });

    it('Logging a not registered user', ()=>{
      return this.userManager.isRegistered(accounts[3]).should.become(web3.utils.toBN('0'));
    });
  });

  describe('#getUserHash', ()=> {
    it('Getting citizen hash', ()=>{
      return this.userManager.getUserHash(accounts[1]).should.be.fulfilled
        .then((result) => {
          web3.utils.toUtf8(result).should.eq('CitizenHash');
        });
    });
    it('Getting business owner hash', ()=>{
      return this.userManager.getUserHash(accounts[2]).should.be.fulfilled
        .then((result) => {
          web3.utils.toUtf8(result).should.eq('BusinessHash');
        });
    });
    it('Getting empty hash', ()=>{
      return this.userManager.getUserHash(accounts[0]).should.be.fulfilled
        .then((result) => {
          web3.utils.toUtf8(result).should.eq('');
        });
    });
  });

  describe('#getAllCitizens', ()=>{
    it('returning list of all citizens', ()=>{
      return this.userManager.getAllCitizens().should.become([accounts[1]]);
    });
  });

  describe('#getAllBusinessOwners', ()=>{
    it('returning list of all business owners', ()=>{
      return this.userManager.getAllBusinessOwners().should.become([accounts[2]]);
    });
  });

  describe('#getAllRegisteredUsers', ()=>{
    it('returning list of all registered users', ()=>{
      return this.userManager.getAllRegisteredUsers().should.become([accounts[1], accounts[2]]);
    });
  });

  describe('#getGovernmentAddress', () => {
    it('should return the government\'s address', () => {
      return this.userManager.getGovernmentAddress().should.become(accounts[0]);
    });
  });

  describe('#confirmBusinessOwner', ()=>{
    it('Correctly conferming a business owner', ()=>{
      return Promise.all([
        this.userManager.confirmBusinessOwner(accounts[2], {from: accounts[0]}).should.be.fulfilled,
        this.userManager.isBusinessOwnerConfirmed(accounts[2])
          .should.eventually.deep.not.equal(web3.utils.toBN(0))
      ]);
    });

    it('should fail as the calling user is not the government', ()=>{
      return this.userManager.confirmBusinessOwner(accounts[2], {from: accounts[1]}).should.be.rejected;
    });
  });

  describe('#isBusinessOwnerConfirmed', ()=>{
    it('checking if business owner is confirmed', ()=>{
      return !this.userManager.isBusinessOwnerConfirmed(accounts[2])
        .should.eventually.deep.not.equal(web3.utils.toBN(0));
    });
  });

  describe('#removeBusinessOwner', ()=>{
    it('Correctly removing a business owner', ()=>{
      return Promise.all([
        this.userManager.removeBusinessOwner(accounts[2], {from: accounts[0]}).should.be.fulfilled,
        this.userManager.isRegistered(accounts[2]).should.become(web3.utils.toBN('0'))
      ])
    });
    it('should fail as the calling user is not the government', ()=>{
      return this.userManager.removeBusinessOwner(accounts[2], {from: accounts[1]}).should.be.rejected;
    });
  });
});
