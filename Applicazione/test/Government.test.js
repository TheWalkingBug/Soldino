const Citizen = artifacts.require('CitizenMock');
const BusinessOwner = artifacts.require('BusinessOwnerMock');
const Cubit = artifacts.require('CubitMock');
const Government = artifacts.require('GovernmentMock');
const UserManager = artifacts.require('UserManagerMock');


const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
should = chai.should();
chai.use(chaiAsPromised);

contract('Government', accounts =>{
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

    this.userManager.registerUser(
      1,
      web3.utils.fromAscii('CitizenHash'),
      {from: accounts[1]}
    );
    this.userManager.registerUser(
      1,
      web3.utils.fromAscii('SecondCitizenHash'),
      {from: accounts[2]}
    );
    this.userManager.registerUser(
      2,
      web3.utils.fromAscii('ConfirmedBusinessHash'),
      {from: accounts[3]}
    );
    this.userManager.registerUser(
      2,
      web3.utils.fromAscii('NotConfirmedBusinessHash'),
      {from: accounts[4]}
    );
    this.userManager.confirmBusinessOwner(accounts[3], {from: accounts[0]});
  });

  describe('#isGovernment', () => {

    it('should return true', () => {
      return this.government.isGovernment(accounts[0]).should.become(true);
    });

    it('should return false', () => {
      return this.government.isGovernment(accounts[1]).should.become(false);
    });
  });

  describe('#getGovernmentAddress', () => {
    it('should return the government\'s address', () => {
      return this.government.getGovernmentAddress().should.become(accounts[0]);
    });
  });

  describe('#distributeToUsers', () => {
    before(() => {
      this.cubit.mint(accounts[0], 100000, {from: accounts[0]});
      this.cubit.approve(this.government.address, 100000, {from: accounts[0]});
    });

    describe('should fail to call the function if the calling user is not the government', () => {
      it('checking the failure', () => {
        return this.government.distributeToUsers([accounts[1], accounts[2]], 25000, {from: accounts[1]}).should.be.rejected;
      });

      it('checking that no cubits were spent', () => {
        return this.cubit.balanceOf(accounts[0]).should.become(web3.utils.toBN(100000));
      });
    });

    describe('should correctly distribute 25000 Cubits to account 1 & account 3', () => {
      it('distributing cubits', () => {
        return this.government.distributeToUsers([accounts[1], accounts[3], accounts[4], accounts[5]], 25000, {from: accounts[0]}).should.be.fulfilled;
      });

      it('checking if cubits were distributed to account 1', () => {
        return this.cubit.balanceOf(accounts[1]).should.become(web3.utils.toBN(25000));
      });

      it('checking if cubits were not distributed to account 2', () => {
        return this.cubit.balanceOf(accounts[2]).should.become(web3.utils.toBN(0));
      });

      it('checking if cubits were distributed to account 3', () => {
        return this.cubit.balanceOf(accounts[3]).should.become(web3.utils.toBN(25000));
      });

      it('checking that no cubits were distributed to account 4 as its registration was not confirmed', () => {
        return this.cubit.balanceOf(accounts[4]).should.become(web3.utils.toBN(0));
      });

      it('checking that no cubits were distributed to account 5 as it\'s neither a citizen nor a business owner', () => {
        return this.cubit.balanceOf(accounts[5]).should.become(web3.utils.toBN(0));
      });

      it('checking that cubits were removed from the government\'s account', () => {
        return this.cubit.balanceOf(accounts[0]).should.become(web3.utils.toBN(50000));
      });
    });

    describe('should fail to distribute cubits because the allowance is too low', () => {
      it('checking the failure', () => {
        return this.government.distributeToUsers([accounts[1], accounts[2], accounts[3]], 25000, {from: accounts[0]}).should.be.rejected;
      });

      it('checking that no cubits were spent', () => {
        return this.cubit.balanceOf(accounts[0]).should.become(web3.utils.toBN(50000));
      });
    });
  });

  describe('#distributeToAll', () => {
    before(() => {
      this.cubit.mint(accounts[0], 50000, {from: accounts[0]});
      this.cubit.approve(this.government.address, 100000, {from: accounts[0]});
    });

    describe('should fail to call the function if the calling user is not the government', () => {
      it('checking the failure', () => {
        return this.government.distributeToAll(25000, {from: accounts[1]}).should.be.rejected;
      });

      it('checking that no cubits were spent', () => {
        return this.cubit.balanceOf(accounts[0]).should.become(web3.utils.toBN(100000));
      });
    });

    describe('should correctly distribute 25000 Cubits to account 1, 2 & 3', () => {
      it('distributing cubits', () => {
        return this.government.distributeToAll(25000, {from: accounts[0]}).should.be.fulfilled;
      });

      it('checking if cubits were distributed to account 1', () => {
        return this.cubit.balanceOf(accounts[1]).should.become(web3.utils.toBN(50000));
      });

      it('checking if cubits were distributed to account 2', () => {
        return this.cubit.balanceOf(accounts[2]).should.become(web3.utils.toBN(25000));
      });

      it('checking if cubits were distributed to account 3', () => {
        return this.cubit.balanceOf(accounts[3]).should.become(web3.utils.toBN(50000));
      });

      it('checking that no cubits were distributed to account 4 as its registration was not confirmed', () => {
        return this.cubit.balanceOf(accounts[4]).should.become(web3.utils.toBN(0));
      });

      it('checking that no cubits were distributed to account 5 as it\'s neither a citizen nor a business owner', () => {
        return this.cubit.balanceOf(accounts[5]).should.become(web3.utils.toBN(0));
      });

      it('checking that cubits were removed from the government\'s account', () => {
        return this.cubit.balanceOf(accounts[0]).should.become(web3.utils.toBN(25000));
      });
    });

    describe('should fail to distribute cubits because the allowance is too low', () => {
      it('checking the failure', () => {
        return this.government.distributeToAll(25000, {from: accounts[0]}).should.be.rejected;
      });

      it('checking that no cubits were spent', () => {
        return this.cubit.balanceOf(accounts[0]).should.become(web3.utils.toBN(25000));
      });
    });
  });
});
