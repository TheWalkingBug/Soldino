import moment from 'moment';
import products from './products';
import users from './users';
import Init from './init';
import Vat from './vat';

const productTransaction = Init.getProductTransactionContract;
const currentAccount = Init.getCurrentAccount;

/**
 * @module Orders
 * */
const Orders = {

  /**
   * Returns the given transaction's data
   * @function getTransactionData
   * @param transactionID: the ID of the transaction we want to get data
   * */
  getTransactionData(transaction) {
    return productTransaction().methods.getTransactionData(transaction).call()
      .then((data) => {
        const buyerAddress = data[3];
        return Vat.getTransactionVATTotal(transaction).then((totalVat) => {
          const retData = {
            id: transaction,
            productQuantities: data[1],
            date: moment.unix(data[2]).toDate().toDateString(),
            totalVat: parseFloat((parseFloat(totalVat) / 100.00).toFixed(2)),
          };
          return Promise.all(data[0].map(productID => products.getProductData(productID)))
            .then((productsData) => {
              retData.products = productsData;
              const sellerAddress = productsData[0].owner;
              retData.total = 0;
              for (let i = 0; i < productsData.length; i += 1) {
                retData.total += productsData[i].price * retData.productQuantities[i];
              }
              return users.login(buyerAddress).then((buyerData) => {
                switch (buyerData.userType) {
                  case 1:
                    retData.buyer = `${buyerData.name} ${buyerData.surname}`;
                    break;
                  case 2:
                    retData.buyer = buyerData.businessName;
                    break;
                  case 3:
                    retData.buyer = 'Government';
                    break;
                  default:
                    break;
                }
                return users.login(sellerAddress).then((sellerData) => {
                  switch (sellerData.userType) {
                    case 1:
                      retData.seller = `${sellerData.name} ${sellerData.surname}`;
                      break;
                    case 2:
                      retData.seller = sellerData.businessName;
                      break;
                    case 3:
                      retData.seller = 'Government';
                      break;
                    default:
                      break;
                  }
                  return retData;
                });
              });
            });
        });
      });
  },

  /**
   * @function getAllSellerTransactions
   * @param {String} address user account address
   * */
  getAllSellerTransactions(address) {
    return currentAccount().then(currAccount => productTransaction().methods
      .getSellerTransaction(address === undefined ? currAccount : address).call()
      .then(transactions => Promise.all(transactions.map((transaction) => {
        const transData = this.getTransactionData(transaction);
        transData.id = transaction;
        return transData;
      }))));
  },

  /**
   * @function getSellerTransactions
   * @param {String} address user account address
   * @param {String} fromDate
   * @param {String} toDate
   * */
  getSellerTransactions(address = null, fromDate, toDate) {
    return currentAccount().then(currAccount => productTransaction().methods
      .getSellerTransaction(address === null ? currAccount : address, fromDate, toDate).call()
      .then(transactions => Promise.all(transactions.map((transaction) => {
        const transData = this.getTransactionData(transaction);
        transData.id = transaction;
        return transData;
      }))));
  },

  /**
   * @function getAllBuyerTransactions
   * @param {String} address user account address
   * */
  getAllBuyerTransactions(address) {
    return currentAccount().then(currAccount => productTransaction().methods
      .getBuyerTransaction(address === undefined ? currAccount : address).call()
      .then(transactions => Promise.all(transactions.map((transaction) => {
        const transData = this.getTransactionData(transaction);
        transData.id = transaction;
        return transData;
      }))));
  },

  /**
   * @function getBuyerTransactions
   * @param {String} address user account address
   * @param {String} fromDate
   * @param {String} toDate
   * */
  getBuyerTransactions(address = null, fromDate, toDate) {
    return currentAccount().then(currAccount => productTransaction().methods
      .getBuyerTransaction(address === null ? currAccount : address, fromDate, toDate).call()
      .then(transactions => Promise.all(transactions.map((transaction) => {
        const transData = this.getTransactionData(transaction);
        transData.id = transaction;
        return transData;
      }))));
  },
};

export default Orders;
