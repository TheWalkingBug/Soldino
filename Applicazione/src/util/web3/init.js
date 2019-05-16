const { Contracts, ZWeb3 } = require('zos-lib');
const proxyAddresses = require('./proxyAddresses.ropsten');

const userManagerAdd = proxyAddresses.userManagerAddress();
const businessOwnerAdd = proxyAddresses.businessOwnerAddress();
const citizenAdd = proxyAddresses.citizenAddress();
const cubitAdd = proxyAddresses.cubitAddress();
const governmentAdd = proxyAddresses.governmentAddress();
const productAdd = proxyAddresses.productAddress();
const productTransactionAdd = proxyAddresses.productTransactionAddress();
const vatAdd = proxyAddresses.vatAddress();
const vatTransactionAdd = proxyAddresses.vatTransactionAddress();
let governmentUserAddress;

module.exports = async function (callback) {
  ZWeb3.initialize(web3.currentProvider);
  ({ governmentUserAddress } = { governmentUserAddress: (await web3.eth.getAccounts())[0] });
  Contracts.setArtifactsDefaults({
    gas: 5000000,
    gasPrice: 9,
    from: governmentUserAddress,
  });
  try {

    const BusinessOwner = Contracts.getFromLocal('BusinessOwner');
    console.log(' - Initializing BusinessOwner');
    const businessOwner = await BusinessOwner.at(businessOwnerAdd);
    await businessOwner.methods.initialize(userManagerAdd).send();

    const Citizen = Contracts.getFromLocal('Citizen');
    console.log(' - Initializing Citizen');
    const citizen = await Citizen.at(citizenAdd);
    await citizen.methods.initialize(userManagerAdd).send();

    const Cubit = Contracts.getFromLocal('Cubit');
    console.log(' - Initializing Cubit');
    const cubit = await Cubit.at(cubitAdd);
    await cubit.methods['initialize(address)'](governmentUserAddress).send();

    const Government = Contracts.getFromLocal('Government');
    console.log(' - Initializing Government');
    const government = await Government.at(governmentAdd);
    await government.methods.initialize(userManagerAdd, cubitAdd,
      governmentUserAddress).send();

    const Product = Contracts.getFromLocal('Product');
    console.log(' - Initializing Product');
    const product = await Product.at(productAdd);
    await product.methods.initialize(userManagerAdd, cubitAdd, productTransactionAdd).send();

    const ProductTransaction = Contracts.getFromLocal('ProductTransaction');
    console.log(' - Initializing ProductTransaction');
    const productTransaction = await ProductTransaction.at(productTransactionAdd);
    await productTransaction.methods.initialize(productAdd, vatAdd).send();

    const UserManager = Contracts.getFromLocal('UserManager');
    console.log(' - Initializing UserManager');
    const userManager = await UserManager.at(userManagerAdd);
    await userManager.methods.initialize(citizenAdd, businessOwnerAdd, governmentAdd).send();

    const VAT = Contracts.getFromLocal('VAT');
    console.log(' - Initializing VAT');
    const vat = await VAT.at(vatAdd);
    await vat.methods.initialize(cubitAdd, userManagerAdd, vatTransactionAdd,
      productTransactionAdd).send();

    const VATTransaction = Contracts.getFromLocal('VATTransaction');
    console.log(' - Initializing VATTransaction');
    const vatTransaction = await VATTransaction.at(vatTransactionAdd);
    await vatTransaction.methods.initialize(userManagerAdd, vatAdd).send();
  } catch (err) {
    callback(err);
  }
  callback();
};
