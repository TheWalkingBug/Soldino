const CubitAbi = require('./build/contracts/Cubit');
// import GovernmentAbi from './build/contracts/Government';
// import UserManagerAbi from './build/contracts/UserManager';
// import VATAbi from './build/contracts/VAT';
// import VATTransactionAbi from './build/contracts/VATTransaction';
const ProductTransactionAbi = require('./build/contracts/ProductTransaction');
const ProductAbi = require('./build/contracts/Product');
const BusinessOwnerAbi = require('./build/contracts/BusinessOwner');
const CitizenAbi = require('./build/contracts/Citizen');

const proxyAddresses = require('./proxyAddresses.development');
const getData = require('./initialData');

module.exports = async function (callback) {
  try {
    // const userManagerAdd = proxyAddresses.userManagerAddress();
    const businessOwnerAdd = proxyAddresses.businessOwnerAddress();
    const citizenAdd = proxyAddresses.citizenAddress();
    const cubitAdd = proxyAddresses.cubitAddress();
    // const governmentAdd = proxyAddresses.governmentAddress();
    const productAdd = proxyAddresses.productAddress();
    const productTransactionAdd = proxyAddresses.productTransactionAddress();
    // const vatAdd = proxyAddresses.vatAddress();
    // const vatTransactionAdd = proxyAddresses.vatTransactionAddress();

    const data = await getData();

    console.log(' - Initializing BusinessOwner');
    const BusinessOwner = new web3.eth.Contract(BusinessOwnerAbi.abi, businessOwnerAdd);
    console.log(data);
    await BusinessOwner.methods.initData(
      data.businessOwners.map(item => item.address),
      data.businessOwners.map(item => item.hash),
      data.businessOwners.map(item => item.confirmed),
    ).send({ from: '0x0409d8EA8Fb40d2C4765246F25256719143b6EF7', gasPrice: 1, gas: 6721975 });

    console.log(' - Initializing Citizen');
    const Citizen = new web3.eth.Contract(CitizenAbi.abi, citizenAdd);
    await Citizen.methods.initData(
      data.citizens.map(item => item.address),
      data.citizens.map(item => item.hash),
    ).send({ from: '0x0409d8EA8Fb40d2C4765246F25256719143b6EF7', gasPrice: 1, gas: 6721975 });

    console.log(' - Initializing Cubit');
    const Cubit = new web3.eth.Contract(CubitAbi.abi, cubitAdd);
    await Cubit.methods.initData(
      data.balances.map(item => item.address),
      data.balances.map(item => item.balance),
    ).send({ from: '0x0409d8EA8Fb40d2C4765246F25256719143b6EF7', gasPrice: 1, gas: 6721975 });

    console.log(' - Initializing Product');
    const Product = new web3.eth.Contract(ProductAbi.abi, productAdd);
    await Product.methods.initData(
      data.products.map(item => item.hash),
      data.products.map(item => item.price),
      data.products.map(item => item.owner),
      data.products.map(item => item.availability),
      data.products.map(item => item.VAT),
      data.products.map(item => item.deleted),
    ).send({ from: '0x0409d8EA8Fb40d2C4765246F25256719143b6EF7', gasPrice: 1, gas: 6721975 });

    console.log(' - Initializing ProductTransaction');
    const ProductTransaction = new web3.eth.Contract(ProductTransactionAbi.abi,
      productTransactionAdd);
    await Promise.all(data.productTransactions.map(item => ProductTransaction.methods
      .add(
        item.products,
        item.productQuantity,
        item.date,
        item.buyer,
        data.products[item.products[0]].owner,
      ).send({ from: '0x0409d8EA8Fb40d2C4765246F25256719143b6EF7', gasPrice: 1, gas: 6721975 })
      .then(() => { console.log('inserted'); })));

    /* console.log(' - Initializing VATTransaction');
    const VATTransaction = new web3.eth.Contract(VATTransactionAbi.abi,
    vatTransactionAdd);
    await vatTransaction.methods.initialize(userManagerAdd, vatAdd).send({ from: '0x0409d8EA8Fb40d2C4765246F25256719143b6EF7' }); */
  } catch (err) {
    callback(err);
  }
  callback();
};
