const Citizen = artifacts.require('CitizenMock');
const BusinessOwner = artifacts.require('BusinessOwnerMock');
const Cubit = artifacts.require('CubitMock');
const Government = artifacts.require('GovernmentMock');
const UserManager = artifacts.require('UserManagerMock');
const VAT = artifacts.require('VATMock');
const VATTransaction = artifacts.require('VATTransactionMock');
const ProductTransaction = artifacts.require('ProductTransactionMock');
const Product = artifacts.require('ProductMock');

const moment = require('moment');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
should = chai.should();
chai.use(chaiAsPromised);


contract('VAT', accounts => {
  before(async () => {
    this.userManager = await UserManager.new();
    this.citizen = await Citizen.new();
    this.businessOwner = await BusinessOwner.new();
    this.cubit = await Cubit.new(accounts[0]);
    this.government = await Government.new();
    this.vat = await VAT.new();
    this.vatTransaction = await VATTransaction.new();
    this.productTransaction = await ProductTransaction.new();
    this.product = await Product.new();

    await this.userManager.initializeMock(this.citizen.address, this.businessOwner.address, this.government.address);
    await this.citizen.initializeMock(this.userManager.address);
    await this.businessOwner.initializeMock(this.userManager.address);
    await this.government.initializeMock(this.userManager.address, this.cubit.address, accounts[0]);
    await this.product.initializeMock(this.userManager.address, this.cubit.address, this.productTransaction.address);
    await this.productTransaction.initializeMock(this.product.address, this.vat.address);
    await this.vat.initializeMock(this.cubit.address, this.userManager.address, this.vatTransaction.address, this.productTransaction.address);
    await this.vatTransaction.initializeMock(this.userManager.address, this.vat.address);


    await this.userManager.registerUser(1,
      web3.utils.fromAscii('SecondCitizenHash'),
      {from: accounts[1]}
    );
    await this.userManager.registerUser(2,
      web3.utils.fromAscii('ConfirmedBusinessHash'),
      {from: accounts[2]}
    );
    await this.userManager.registerUser(2,
      web3.utils.fromAscii('SecondConfirmedBusinessHash'),
      {from: accounts[3]}
    );

    await this.product.addProduct(
      10,
      10,
      21,
      web3.utils.fromAscii('firstProductHash'), {from: accounts[2]});
    await this.product.addProduct(
      15,
      10,
      21,
      web3.utils.fromAscii('secondProductHash'), {from: accounts[2]});

    // 3 buys for a total of (4 * 10 + 5 * 15) = 115C, Total VAT = 115 / 100 * 21 = 24.15 (24)
    // from 2
    await this.product.callProductTransactionAddTransaction([0,1], [4,5], accounts[3], accounts[2]);

    // 3 buys for a total of (4 * 10 + 3 * 15) = 85C, Total VAT = 85 / 100 * 21 = 17.85 (17)
    //from 2
    await this.product.callProductTransactionAddTransaction([0,1], [4,3], accounts[3], accounts[2]);

  });

  describe('#_getVATToPay', () => {

    it('should return the correct VAT to pay for account 2', () => {
      return this.vat.getVATToPay(
        1546300800,
        1893456000,
        accounts[2]
      ).should.become(web3.utils.toBN(41));
    });

    it('should return the correct VAT to pay for account 3', () => {
      return this.vat.getVATToPay(
        1546300800,
        1893456000,
        accounts[3]
      ).should.become(web3.utils.toBN(0));
    });
  });

  describe('#_getVATToCollect', () => {

    it('should return the correct VAT to get for account 2', () => {
      return this.vat.getVATToCollect(
        1546300800,
        1893456000,
        accounts[2]
      ).should.become(web3.utils.toBN(0));
    });

    it('should return the correct VAT to get for account 3', () => {
      return this.vat.getVATToCollect(
        1546300800,
        1893456000,
        accounts[3]
      ).should.become(web3.utils.toBN(41));
    });
  });

  describe('#getQuarterVATBalance', () => {

    it('should return the correct balance for account 2', () => {
      now = new Date();
      return this.vat.getQuarterVATBalance(now.getFullYear(), parseInt(now.getMonth() / 3) + 1, accounts[2])
        .should.become(web3.utils.toBN(-41));
    });

    it('should return the correct balance for account 3', () => {
      now = new Date();
      return this.vat.getQuarterVATBalance(now.getFullYear(), parseInt(now.getMonth() / 3) + 1, accounts[3])
        .should.become(web3.utils.toBN(41));
    });
  });

  describe('#payVATToGovernment', () => {

    before(async () => {
      await this.cubit.mint(accounts[0], 100, {from: accounts[0]});
      await this.cubit.mint(accounts[2], 100, {from: accounts[0]});
      await this.cubit.mint(accounts[3], 100, {from: accounts[0]});
      await this.cubit.approve(this.vat.address, 100, {from: accounts[0]});
      await this.cubit.approve(this.vat.address, 100, {from: accounts[2]});
      await this.cubit.approve(this.vat.address, 100, {from: accounts[3]});
    });

    it('should fail as the calling user is not a business owner',() => {
      return this.vat.payVATToGovernment(moment().year(), moment().quarter(), {from: accounts[0]}).should.be.rejected;
    });

    it('should fail as the calling user has negative taxes',() => {
      return this.vat.payVATToGovernment(moment().year(), moment().quarter(), {from: accounts[3]}).should.be.rejected;
    });

    it('should correctly pay the taxes for account 2',() => {
      return this.vat.payVATToGovernment(moment().year(), moment().quarter(), {from: accounts[2]}).should.be.fulfilled
          .then(() => {
            return this.cubit.balanceOf(accounts[2]).should.become(web3.utils.toBN(59))
                .then(() => {
                  return this.cubit.balanceOf(accounts[0]).should.become(web3.utils.toBN(141))
                })
          })
    });
  });

  describe('#payVATToBusinessOwner', () => {

    before(async () => {
      await this.cubit.approve(this.vat.address, 100, {from: accounts[0]});
      await this.cubit.approve(this.vat.address, 100, {from: accounts[2]});
      await this.cubit.approve(this.vat.address, 100, {from: accounts[3]});
    });

    it('should fail as the calling user is not the government',() => {
      return this.vat.payVATToBusinessOwner(moment().year(), moment().quarter(), accounts[3], {from: accounts[2]}).should.be.rejected;
    });

    it('should fail as the calling user has positive taxes',() => {
      return this.vat.payVATToBusinessOwner(moment().year(), moment().quarter(), accounts[2], {from: accounts[0]}).should.be.rejected;
    });

    it('should correctly pay the taxes for account 3',() => {
      return this.vat.payVATToBusinessOwner(moment().year(), moment().quarter(), accounts[3], { from: accounts[0] }).should.be.fulfilled
          .then(() => {
            return this.cubit.balanceOf(accounts[0])
                .should
                .become(web3.utils.toBN(100))
                .then(() => {
                  return this.cubit.balanceOf(accounts[3])
                      .should
                      .become(web3.utils.toBN(141))
                })
          });
    });
  });
});




