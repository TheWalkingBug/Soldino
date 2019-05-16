pragma solidity >=0.5.0;

import "../ProductTransaction.sol";

contract ProductTransactionMock is ProductTransaction {
    function initializeMock(address _product, address _vat) public {
        ProductTransaction.initialize(_product, _vat);
    }
}
