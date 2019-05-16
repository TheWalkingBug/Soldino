const Citizen = artifacts.require('CitizenMock');
const BusinessOwner = artifacts.require('BusinessOwnerMock');
const Cubit = artifacts.require('CubitMock');
const Government = artifacts.require('GovernmentMock');
const UserManager = artifacts.require('UserManagerMock');



const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
should = chai.should();
chai.use(chaiAsPromised);

contract('Citizen', accounts => {

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

  describe('#registerCitizen', () => {

    it('should register correctly a citizen', () => {
      return Promise.all([
        this.userManager.callCitizenRegisterCitizen(
          web3.utils.fromAscii('testHash'),
          accounts[1]
        ).should.be.fulfilled,
        this.userManager.callCitizenLogin(accounts[1]).should.be.fulfilled
          .then((result) => {
            web3.utils.toUtf8(result).should.eq('testHash');
        })
      ]);
    });

  });
  describe('#login', () => {
    it('should return the correct hash', () => {
      return this.userManager.callCitizenLogin(accounts[1]).should.be.fulfilled
        .then((result)=>{
          web3.utils.toUtf8(result).should.eq('testHash');
        });
    });
  });

  describe('#getAllCitizens', () => {

    it('should return the list of all citizens', () => {
      return this.userManager.callCitizenGetAllCitizens().should.become([accounts[1]]);
    });
  });
});
