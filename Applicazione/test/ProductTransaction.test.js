const Citizen = artifacts.require('CitizenMock');
const BusinessOwner = artifacts.require('BusinessOwnerMock');
const Cubit = artifacts.require('CubitMock');
const Government = artifacts.require('GovernmentMock');
const UserManager = artifacts.require('UserManagerMock');
const VAT = artifacts.require('VATMock');
const VATTransaction = artifacts.require('VATTransactionMock');
const ProductTransaction = artifacts.require('ProductTransactionMock');
const Product = artifacts.require('ProductMock');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
should = chai.should();
chai.use(chaiAsPromised);

contract('ProductTransaction', accounts =>{
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
    await this.userManager.registerUser(2, web3.utils.fromAscii('SellerHash'), {from: accounts[1]});
    await this.userManager.registerUser(2, web3.utils.fromAscii('BuyerHash'), {from: accounts[2]});
    await this.product.addProduct(
      10,
      10,
      21,
      web3.utils.fromAscii('firstProductHash'), {from: accounts[2]});
    await this.product.addProduct(
      10,
      10,
      21,
      web3.utils.fromAscii('secondProductHash'), {from: accounts[2]});
  });

  describe('#addTransaction',()=>{
    it('Adding transaction from product contract', ()=>{
      return this.product.callProductTransactionAddTransaction(
        [0, 1],
        [10, 3],
        accounts[1],
        accounts[2]
      ).should.be.fulfilled;
    });

    it('Adding transaction from other contract', ()=>{
      return this.productTransaction.addTransaction(
        [0, 1],
        [10, 3],
        accounts[1],
        accounts[2]
      ).should.be.rejected;
    });

    it('Adding a transaction of number of products different of number of quantities',()=>{
      return Promise.all([
        this.productTransaction.addTransaction(
          [0,1],
          [10],
          accounts[1],
          accounts[2],
          {from: accounts[0]}
        ).should.be.rejected,
        this.productTransaction.addTransaction(
          [0],
          [10, 3],
          accounts[1],
          accounts[2],
          {from: accounts[0]}
        ).should.be.rejected
      ]);
    })
  });

  describe('#getSellerTransaction', ()=>{
    it('get all transaction of a seller',()=> {
      return this.vat.callProductTransactionGetSellerTransaction(accounts[2])
        .should.become([web3.utils.toBN('0')]);
    });

    it('get all transaction of a seller from not VAT contract',()=> {
      return this.productTransaction.getSellerTransaction(accounts[2], { from: accounts[0] })
        .should.be.rejected;
    });

    it('get all transaction of a seller from date to date',()=>{
      return this.vat.callProductTransactionGetSellerTransactionFromDateToDate(accounts[2], 1546300800, 1893456000)
        .should.become([web3.utils.toBN('0')]);
    });

    it('get all transaction of a seller from date to date from not VAT contract',()=>{
      return this.productTransaction.getSellerTransaction(accounts[2], 0, 10000000 , { from: accounts[0] })
        .should.be.rejected;
    });
  });

  describe('#getBuyerTransaction', ()=>{
    it('get all transaction of a buyer',()=>{
      return this.vat.callProductTransactionGetBuyerTransaction(accounts[1])
        .should.become([web3.utils.toBN('0')])
    });

    it('get all transaction of a buyer from not VAT contract',()=>{
      return this.productTransaction.getBuyerTransaction(accounts[1],{ from: accounts[0] })
        .should.be.rejected;
    });

    it('get all transaction of a buyer from date to date',()=>{
      return this.vat.callProductTransactionGetBuyerTransactionFromDateToDate(accounts[1], 0, 10000000)
        .should.become([web3.utils.toBN('0')])
    });

    it('get all transaction of a buyer from date to date from not VAT contract',()=>{
      return this.productTransaction.getBuyerTransaction(accounts[1], 0, 10000000 , { from: accounts[0] })
        .should.be.rejected;
    });
  });

  describe('#getTransactionData', ()=>{
    it('Get transaction data',()=>{
      return this.productTransaction.getTransactionData(0).should.be.fulfilled.then((result) => {
        result[0][0].toString().should.be.equal(web3.utils.toBN(0).toString());
        result[0][1].toString().should.be.equal(web3.utils.toBN(1).toString());
        result[1][0].toString().should.be.equal(web3.utils.toBN(10).toString());
        result[1][1].toString().should.be.equal(web3.utils.toBN(3).toString());
        result[3].should.be.equal(accounts[1]);
      });
    });
  });

  describe('#getTransactionVATTotal', ()=>{
    it('get the VAT amount of a certain transaction',()=>{
      return this.productTransaction.getTransactionVATTotal(0).should.become(web3.utils.toBN(27));
    });
  });
});
