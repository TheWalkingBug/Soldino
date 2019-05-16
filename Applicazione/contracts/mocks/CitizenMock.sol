pragma solidity ^0.5.0;

import "../Citizen.sol";

/// @title Citizen
contract CitizenMock is Citizen {
    function initializeMock(address _userManager) public {
        Citizen.initialize(_userManager);
    }
}
