pragma solidity >= 0.5.0;

import "../VATTransaction.sol";

contract VATTransactionMock is VATTransaction{
    function initializeMock(address _userManager, address _vat) public {
        VATTransaction.initialize(_userManager, _vat);
    }
}
