import moment from 'moment';
import Init from './init';
import users from './users';
import cubit from './cubit';

const vat = Init.getVatContract;
const vatTransaction = Init.getVatTransactionContract;
const productTransaction = Init.getProductTransactionContract;
const currentAccount = Init.getCurrentAccount;

/**
 * @module Vat
 * */
const Vat = {
  /**
   * @function getTransactionData
   * @param transactionID: the ID of the transaction we want to get the vat total
   * */
  getTransactionData(transactionID) {
    return vatTransaction().methods.getVATTransactionData(transactionID).call()
      .then(ethData => ({
        id: transactionID,
        amount: parseFloat((parseFloat(ethData[0]) / 100.00).toFixed(2)),
        date: ethData[1],
        addresser: ethData[2],
        addressee: ethData[3],
        refused: ethData[4],
      }));
  },

  /**
   * Returns the given transaction's VAT total
   * @function getTransactionVATTotal
   * @param transactionID: the ID of the transaction we want to get the vat total
   * */
  getTransactionVATTotal(transactionID) {
    return productTransaction().methods.getTransactionVATTotal(transactionID).call();
  },

  /**
   * Returns the VAT balance of a given quarter of a given business owner
   * @function getQuarterVATBalance
   * @param year: referenced year
   * @param quarter: referenced quarter
   * @param businessOwner: business owner whose VAT balance we want to know
   * */
  getQuarterVATBalance(year, quarter, businessOwner) {
    return vat().methods.getQuarterVATBalance(year, quarter, businessOwner).call();
  },

  /**
   * Allows a business owner to pay VAT to government
   * @function payVATToGovernment
   * @param year: referenced year
   * @param quarter: referenced quarter
   * */
  payVATToGovernment(year, quarter, amount) {
    return currentAccount()
      .then(currAccount => cubit
        .setAllowance(vat().options.address, parseInt((parseFloat(amount) * 100).toFixed(2), 10))
        .then(() => vat().methods.payVATToGovernment(year, quarter)
          .send({ from: currAccount })));
  },

  /**
   * Allows the government to pay VAT to a business owner
   * @function payVATToBusinessOwner
   * @param year: referenced year
   * @param quarter: referenced quarter
   * @param businessOwner: business owner who the government wants to pay VAT to
   * @param amount: the amount of cubit that the government should pay
   * */
  payVATToBusinessOwner(year, quarter, businessOwner, amount) {
    return currentAccount()
      .then(currAccount => cubit
        .setAllowance(vat().options.address, parseInt((parseFloat(amount) * 100).toFixed(2), 10))
        .then(() => vat().methods.payVATToBusinessOwner(year, quarter, businessOwner)
          .send({ from: currAccount })));
  },

  refuseVAT(year, quarter) {
    return currentAccount()
      .then(currAccount => vat().methods.refusePayment(year, quarter)
        .send({ from: currAccount }));
  },

  /**
   * Returns the caller's amount of VAT deductions of a specific quarter
   * @function getVATDeductions
   * @param fromYear: start year
   * @param fromQuarter: start quarter
   * @param toYear: end year
   * @param toQuarter: end quarter
   * */
  getVATDeductions(fromYear, fromQuarter, toYear, toQuarter) {
    return vatTransaction().methods.getVATDeductions(fromYear, fromQuarter, toYear, toQuarter)
      .call();
  },

  /**
   * Returns the caller's amount of VAT compensations of a specific quarter
   * @function getVATCompensations
   * @param fromYear: start year
   * @param fromQuarter: start quarter
   * @param toYear: end year
   * @param toQuarter: end quarter
   * */
  getVATCompensations(fromYear, fromQuarter, toYear, toQuarter) {
    return vatTransaction().methods.getVATCompensations(fromYear, fromQuarter, toYear, toQuarter)
      .call();
  },

  /**
   * Returns the caller's payment history
   * @function getBusinessOwnerVATHistory
   * @param {String} address the address that we want to confirm
   * */
  getBusinessOwnerVATHistory(address = null) {
    return currentAccount().then(currAccount => users
      .isBusinessOwnerConfirmed(address === null ? currAccount : address)
      .then((result) => {
        const confirmedDate = moment.unix(result);
        const confirmedYear = confirmedDate.year();
        const confirmedQuarter = confirmedDate.quarter();

        const actualDate = moment();
        const actualYear = actualDate.year();
        const actualQuarter = actualDate.quarter();

        let startQuarter = confirmedQuarter;
        let endQuarter = 4;
        const res = [];
        for (let curYear = confirmedYear; curYear <= actualYear; curYear += 1) {
          if (curYear === actualYear) {
            endQuarter = actualQuarter;
          }

          for (let curQuarter = startQuarter; curQuarter <= endQuarter; curQuarter += 1) {
            res.push(Vat.getBusinessVATStatus(curYear, curQuarter,
              address === null ? currAccount : address)
              .then(vatStatus => ({
                year: curYear,
                quarter: curQuarter,
                status: vatStatus,
              })));
          }
          startQuarter = 1;
        }
        return Promise.all(res);
      }));
  },

  /**
   * Returns the status of a given payment related to a specific quarter
   * @function getBusinessVATStatus
   * @param year year of payment
   * @param quarter quarter of payment
   * @param businessAddress address of the business who we want to check payment
   * */
  getBusinessVATStatus(year, quarter, businessAddress) {
    return vat().methods.getBusinessVATStatus(year, quarter, businessAddress)
      .call().then((status) => {
        console.log(status);
        switch (parseInt(status[0], 10)) {
          case 0: return { status: 'NotNecessary' };
          case 1:
            return Vat.getQuarterVATBalance(year, quarter, businessAddress).then(amount => ({
              status: 'ToReceive',
              amount: parseFloat((parseFloat(amount) / 100.00).toFixed(2)),
            }));
          case 2:
            return Vat.getQuarterVATBalance(year, quarter, businessAddress).then(amount => ({
              status: 'ToPay',
              amount: -parseFloat((parseFloat(amount) / 100.00).toFixed(2)),
            }));
          case 3:
            return Vat.getTransactionData(status[1]).then(transData => ({
              status: 'Received',
              transaction: transData,
            }));
          case 4:
            return Vat.getTransactionData(status[1]).then(transData => ({
              status: 'Payed',
              transaction: transData,
            }));
          case 5:
            return Vat.getTransactionData(status[1]).then(transData => ({
              status: 'Refused',
              transaction: transData,
            }));
          default: return { status: 'StatusNotFound' };
        }
      });
  },

  /**
   * Gets Vat compensation from a transaction
   * @function getVATTransactionData
   * @param transactionID
   * */
  getVATTransactionData(transactionID) {
    return vatTransaction().methods.getVATCompensations(transactionID).call();
  },
};

export default Vat;
