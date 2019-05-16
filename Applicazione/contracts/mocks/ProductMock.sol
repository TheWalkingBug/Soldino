pragma solidity >=0.5.0;

import "../Product.sol";

///@title Product
contract ProductMock is Product {
    function initializeMock(address _userManager, address _cubit, address _productTransaction) public {
        Product.initialize(_userManager, _cubit, _productTransaction);
    }

    function callProductTransactionAddTransaction(uint256[] memory _productIDs, uint256[] memory _quantities,
        address _buyer, address _seller) public {
        return productTransaction.addTransaction(_productIDs,_quantities,_buyer,_seller);
    }
}
