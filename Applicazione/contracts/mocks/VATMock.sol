pragma solidity >= 0.5.0;

import "../VAT.sol";

contract VATMock is VAT{
    function initializeMock(address _cubit, address _userManager, address _vatTransaction, address _productTransaction)
    public {
        VAT.initialize(_cubit, _userManager, _vatTransaction, _productTransaction);
    }

    function getVATToPay(uint256 _fromDate, uint256 _toDate, address _businessOwner) view public returns(uint) {
        return VAT._getVATToPay(_fromDate, _toDate, _businessOwner);
    }

    function getVATToCollect(uint256 _fromDate, uint256 _toDate, address _businessOwner) view public returns(uint) {
        return VAT._getVATToCollect(_fromDate, _toDate, _businessOwner);
    }

    function callVATTransactionAddTransaction(uint256 _amount, address _addresser, address _addressee, bool _refused, uint256 _year, uint8 _quarter) public {
        vatTransaction.addTransaction(_amount, _addresser, _addressee, _refused, _year, _quarter);
    }

    function callProductTransactionGetSellerTransaction(address _seller) view public returns(uint256[] memory) {
        return productTransaction.getSellerTransaction(_seller);
    }

    function callProductTransactionGetSellerTransactionFromDateToDate(address _seller, uint256 _fromDate, uint256 _toDate) view public returns(uint256[] memory) {
        return productTransaction.getSellerTransaction(_seller, _fromDate, _toDate);
    }

    function callProductTransactionGetBuyerTransaction(address _buyer) view public returns(uint256[] memory) {
        return productTransaction.getBuyerTransaction(_buyer);
    }

    function callProductTransactionGetBuyerTransactionFromDateToDate(address _buyer, uint256 _fromDate, uint256 _toDate) view public returns(uint256[] memory) {
        return productTransaction.getBuyerTransaction(_buyer, _fromDate, _toDate);
    }
}
