import IPFS, { Buffer } from 'ipfs-http-client';
import _ from 'underscore';
import Init from './init';
import Helper from './utils/helper';
import Cubit from './cubit';

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const product = Init.getProductContract;
const currentAccount = Init.getCurrentAccount;

/**
 * @module Products
 * */
const Products = {

  /**
   * @function isValidProductID
   * @param {String} productID
   * */
  isValidProductID(productID) {
    return product().methods.isValidProductID(productID).call();
  },

  /**
   * @function addProduct
   * @param {Object} productData
   * */
  addProduct(productData) {
    const intPrice = parseInt((productData.price * 100).toFixed(2), 10);
    const bufferToUpload = Buffer.from(JSON.stringify(productData));
    return ipfs.add(bufferToUpload).then((result) => {
      const hash = Helper.getBytes32FromIpfsHash(result[0].hash);
      return currentAccount()
        .then(currAccount => product().methods.addProduct(
          intPrice,
          productData.availability,
          productData.VAT,
          hash,
        ).send({ from: currAccount }));
    });
  },

  /**
   * @function buyProducts
   * @param {Array} products
   * */
  buyProducts(products) {
    let value = 0;
    const intPriceProducts = products.map(element => ({
      ...element,
      price: parseInt((element.price * 100).toFixed(0), 10),
    }));
    intPriceProducts.forEach((element) => {
      value += element.price * element.quantity;
    });
    return currentAccount()
      .then(currAccount => Cubit.setAllowance(product().options.address, value)
        .then(() => product().methods.buyProducts(
          intPriceProducts.map(element => element.id),
          intPriceProducts.map(element => element.quantity),
        ).send({ from: currAccount })));
  },

  /**
   * @function deleteProduct
   * @param {String} productID
   * */
  deleteProduct(productID) {
    return currentAccount()
      .then(currAccount => product().methods.deleteProduct(productID)
        .send({ from: currAccount }));
  },

  /**
   * @function getProductData
   * @param {String} productID
   * */
  getProductData(productID) {
    return product().methods.getProductData(productID)
      .call().then(ethProductData => ipfs.cat(Helper.getIpfsHashFromBytes32(ethProductData[5]))
        .then((ipfsResult) => {
          let ipfsProductData = JSON.parse(ipfsResult.toString());
          const floatPrice = parseFloat((parseFloat(ethProductData[0]) / 100.00).toFixed(2));
          ipfsProductData = {
            ...ipfsProductData,
            id: productID,
            price: floatPrice,
            VAT: ethProductData[1],
            availability: ethProductData[2],
            owner: ethProductData[3],
            deleted: ethProductData[4],
          };
          return ipfsProductData;
        }));
  },

  /**
   * @function changeAvailability
   * @param {String} productID
   * @param {Number} availability
   * */
  changeAvailability(productID, availability) {
    return currentAccount()
      .then(currAccount => product().methods.changeProductAvailability(productID, availability)
        .send({ from: currAccount }));
  },

  /**
   * @function editProduct
   * @param {Object} productData
   * */
  editProduct(productData) {
    return this.getProductData(productData.id).then((currentProduct) => {
      const currentProductOnlyUsefulData = _.omit(currentProduct, ['owner', 'deleted']);
      // check if productData & currentProduct are !==
      if (!_.isEqual(productData, currentProductOnlyUsefulData)
      // check if productData & currentProduct have === attrs and values except availability
      && _.isEqual(_.omit(productData, 'availability'), _.omit(currentProductOnlyUsefulData, 'availability'))) {
        return Products.changeAvailability(productData.id, productData.availability);
      }
      return Products.deleteProduct(productData.id).then(() => this.addProduct(productData));
    });
  },

  /**
   * @function getAllProducts
   * */
  getAllProducts() {
    return product().methods.getAllProducts().call();
  },

  /**
   * @function getAllProductsData
   * @param {String} ownerAddress
   * */
  getAllProductsData(ownerAddress = null) {
    return Products.getAllProducts().then(results => Promise.all(
      results.map(productID => Products.getProductData(productID)
        .then((productData) => {
          if (ownerAddress === null || ownerAddress === productData.owner) {
            return productData;
          }
          return null;
        })),
    ));
  },

  /**
   * @function getAllOwnersProductsData
   * */
  getAllOwnersProductsData() {
    return currentAccount().then(currAccount => this.getAllProductsData(currAccount));
  },
};

export default Products;
