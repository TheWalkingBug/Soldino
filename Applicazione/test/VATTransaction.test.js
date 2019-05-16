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


contract('VATTransaction', accounts => {
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
        web3.utils.fromAscii('ConfirmedBusinessHash2'),
        {from: accounts[3]}
    );
  });

  describe('#addTransaction', () => {
    it('should add correctly a deduction', () => {
      return Promise.all([
        this.vat.callVATTransactionAddTransaction(10, accounts[2], accounts[0], false, moment().year(), moment().quarter()).should.be.fulfilled,
        this.vatTransaction.getVATDeductions(2000, 1, 2040, 1).should.become([web3.utils.toBN(1)])
      ])
    });

    it('should add correctly a compensation', () => {
      return Promise.all([
        this.vat.callVATTransactionAddTransaction(10, accounts[0], accounts[3], false, moment().year(), moment().quarter()).should.be.fulfilled,
        this.vatTransaction.getVATCompensations(2000, 1, 2020, 1).should.become([web3.utils.toBN(2)])
      ]);
    });

    it('should fail to add a transaction because the one of the 2 users is not the government', () => {
      return this.vat.callVATTransactionAddTransaction(10, accounts[2], accounts[1]).should.be.rejected;
    });

    it('should fail to add a transaction because the first user is not a business', () => {
      return this.vat.callVATTransactionAddTransaction(10, accounts[1], accounts[0]).should.be.rejected;
    });

    it('should fail to add a transaction because the first user is not a business', () => {
      return this.vat.callVATTransactionAddTransaction(10, accounts[0], accounts[1]).should.be.rejected;
    });
  });

  describe('#getVATDeductions', () => {
    it('should return the only present deduction', () => {
      return this.vatTransaction.getVATDeductions(2000, 1, 2020, 1).should.become([web3.utils.toBN(1)]);
    });

    it('should return nothing as the only deduction is too recent', () => {
      return this.vatTransaction.getVATDeductions(2000, 1, 2018, 1).should.become([]);
    });

    it('should return nothing as the only deduction is too old', () => {
      return this.vatTransaction.getVATDeductions(2020, 1, 2030, 1).should.become([]);
    });
  });

  describe('#getVATCompensations', () => {
    it('should return the only present compensation', () => {
      return this.vatTransaction.getVATCompensations(2000, 1, 2020, 1).should.become([web3.utils.toBN(2)]);
    });

    it('should return nothing as the only compensation is too recent', () => {
      return this.vatTransaction.getVATCompensations(2000, 1, 2018, 1).should.become([]);
    });

    it('should return nothing as the only compensation is too old', () => {
      return this.vatTransaction.getVATCompensations(2020, 1, 2030, 1).should.become([]);
    });
  });

  describe('#getTransactionData', () => {
    it('should correctly return the data of the transaction with index 1', () => {
      return this.vatTransaction.getVATTransactionData(2).should.be.fulfilled.then((result) => {
        web3.utils.toDecimal(result[0]).should.be.equal(10);
        result[2].should.be.equal(accounts[0]);
        result[3].should.be.equal(accounts[3]);
        result[4].should.be.equal(false);
      });
    });
  });
});
