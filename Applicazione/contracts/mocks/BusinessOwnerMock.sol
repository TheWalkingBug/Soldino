pragma solidity ^0.5.0;

import "./../BusinessOwner.sol";

/// @title Business Owner
contract BusinessOwnerMock is BusinessOwner {
    function initializeMock(address _userManager) public {
        BusinessOwner.initialize(_userManager);
    }
}
