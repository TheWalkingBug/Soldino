const Citizen = artifacts.require('CitizenMock');
const BusinessOwner = artifacts.require('BusinessOwnerMock');
const Cubit = artifacts.require('CubitMock');
const Government = artifacts.require('GovernmentMock');
const UserManager = artifacts.require('UserManagerMock');
const Product = artifacts.require('ProductMock');
const ProductTransaction = artifacts.require('ProductTransactionMock');
const VAT = artifacts.require('VATMock');


const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

should = chai.should();
chai.use(chaiAsPromised);

contract('Product', (accounts) => {
  before(async () => {
    this.userManager = await UserManager.new();
    this.citizen = await Citizen.new();
    this.businessOwner = await BusinessOwner.new();
    this.cubit = await Cubit.new(accounts[0]);
    this.government = await Government.new();
    this.product = await Product.new();
    this.productTransaction = await ProductTransaction.new();
    this.vat = await VAT.new();

    await this.userManager.initializeMock(this.citizen.address, this.businessOwner.address, this.government.address);
    await this.citizen.initializeMock(this.userManager.address);
    await this.businessOwner.initializeMock(this.userManager.address);
    await this.government.initializeMock(this.userManager.address, this.cubit.address, accounts[0]);
    await this.product.initializeMock(this.userManager.address, this.cubit.address, this.productTransaction.address);
    await this.productTransaction.initializeMock(this.product.address, this.productTransaction.address);

    this.userManager.registerUser(
      1,
      web3.utils.fromAscii('CitizenHash'),
      { from: accounts[1] },
    );
    this.userManager.registerUser(
      2,
      web3.utils.fromAscii('ConfirmedBusinessHash'),
      { from: accounts[2] },
    );
    this.userManager.registerUser(
      2,
      web3.utils.fromAscii('NotConfirmedBusinessHash'),
      { from: accounts[3] },
    );
    this.userManager.confirmBusinessOwner(accounts[2], { from: accounts[0] });
    this.cubit.mint(accounts[0], 100001, { from: accounts[0] });
    this.cubit.increaseAllowance(this.government.address, 100000, { from: accounts[0] });
    this.government.distributeToAll(90, { from: accounts[0] });
    this.cubit.increaseAllowance(this.product.address, 90, { from: accounts[1] });
  });

  describe('#addProduct', () => {
    it('Adding a product to accounts[2]', () => Promise.all([
      this.product.addProduct(
        10,
        10,
        21,
        web3.utils.fromAscii('firstProductHash'), { from: accounts[2] },
      ).should.be.fulfilled,
      this.product.getProductData(0).should.become({
        0: web3.utils.toBN('10'),
        1: web3.utils.toBN('21'),
        2: web3.utils.toBN('10'),
        3: accounts[2],
        4: false,
        5: `${web3.utils.fromAscii('firstProductHash')}00000000000000000000000000000000`,
      }),
    ]));
  });

  describe('#getProductData', () => {
    it('Checking the product data', () => this.product.getProductData(0)
      .should.become({
        0: web3.utils.toBN('10'),
        1: web3.utils.toBN('21'),
        2: web3.utils.toBN('10'),
        3: accounts[2],
        4: false,
        5: `${web3.utils.fromAscii('firstProductHash')}00000000000000000000000000000000`,
      }));
  });

  describe('#isValidProductID', () => {
    // Creating and deleting a new product
    before(async () => {
      await this.product.addProduct(
        10,
        10,
        21,
        web3.utils.fromAscii('productToDeleteHash'), { from: accounts[2] },
      );
      await this.product.deleteProduct(1, { from: accounts[2] });
    });

    it('Checking if with a valid product the method returns true', () => this.product.isValidProductID(0).should.become(true));

    it('Checking if with a non-valid product the method returns true', () => this.product.isValidProductID(1).should.become(false));
  });

  describe('#getAllProducts', () => {
    it('Should be successful', () => this.product.getAllProducts().should.be.fulfilled);
    it('Checking it returns only valid product IDs', () => this.product.getAllProducts().should.become([web3.utils.toBN('0')]));
  });

  describe('#deleteProduct', () => {
    before(() => {
      this.product.addProduct(
        10,
        10,
        21,
        web3.utils.fromAscii('productToDeleteHash'),
        { from: accounts[2] },
      );
    });

    it('deleting the product', () => this.product.deleteProduct(2, { from: accounts[2] }).should.be.fulfilled);

    it('Checking if the product has been deleted', () => this.product.isValidProductID(2).should.become(false));
  });

  describe('#increaseProductAvailability', () => {
    it('Increasing product availability', () => this.product.increaseProductAvailability(0, 10, { from: accounts[2] }).should.be.fulfilled);

    it('Checking if the availability has been increased', () => this.product.getProductData(0).should.become({
      0: web3.utils.toBN('10'),
      1: web3.utils.toBN('21'),
      2: web3.utils.toBN('20'),
      3: accounts[2],
      4: false,
      5: `${web3.utils.fromAscii('firstProductHash')}00000000000000000000000000000000`,
    }));
    it('Increasing product availability from wrong product owner', () => this.product.increaseProductAvailability(0, 10, { from: accounts[5] }).should.be.rejected);
  });

  describe('#decreaseProductAvailability', () => {
    it('Decreasing product availability', () => this.product.decreaseProductAvailability(0, 10, { from: accounts[2] }).should.be.fulfilled);

    it('Checking if the availability has been decreased', () => this.product.getProductData(0).should.become({
      0: web3.utils.toBN('10'),
      1: web3.utils.toBN('21'),
      2: web3.utils.toBN('10'),
      3: accounts[2],
      4: false,
      5: `${web3.utils.fromAscii('firstProductHash')}00000000000000000000000000000000`,
    }));

    it('Decreasing product availability from wrong product owner', () => this.product.decreaseProductAvailability(0, 10, { from: accounts[5] }).should.be.rejected);
  });

  describe('#buyProductFromOWner', () => {
    // buy product
    it('Trying to buy a valid product', () => Promise.all([
      this.product.buyProductsFromOwner(
        [0],
        [3],
        accounts[2],
        { from: accounts[1] },
      ).should.be.fulfilled,
      this.product.getProductData(0).should.become({
        0: web3.utils.toBN('10'),
        1: web3.utils.toBN('21'),
        2: web3.utils.toBN('7'),
        3: accounts[2],
        4: false,
        5: `${web3.utils.fromAscii('firstProductHash')}00000000000000000000000000000000`,

      }),
    ]));

    it('Buying a non-valid product', () => this.product.buyProductsFromOwner(
      [1],
      [3],
      accounts[2],
      { from: accounts[1] },
    ).should.be.rejected);

    it('Buying a product with not enough money', () => this.product.buyProductsFromOwner(
      [0],
      [7],
      accounts[2],
      { from: accounts[1] },
    ).should.be.rejected);

    it('Trying to buy product mistaking the quantity', () => Promise.all([
      this.product.buyProductsFromOwner(
        [0],
        [1, 1],
        accounts[2],
        { from: accounts[1] },
      ).should.be.rejected,
      this.product.buyProductsFromOwner(
        [0, 0],
        [1],
        accounts[2],
        { from: accounts[1] },
      ).should.be.rejected,
    ]));

    it('Trying to buy a product inserting wrong product owner', () => this.product.buyProductsFromOwner(
      [0],
      [1],
      accounts[3],
      { from: accounts[1] },
    ).should.be.rejected);

    it('Trying to buy a product with not enough availability ', () => this.product.buyProductsFromOwner(
      [1],
      [1],
      accounts[2],
      { from: accounts[1] },
    ).should.be.rejected);

    it('Trying to buy a product from a not registered user', () => this.product.buyProductsFromOwner(
      [1],
      [1],
      accounts[2],
      { from: accounts[5] },
    ).should.be.rejected);
  });
});
