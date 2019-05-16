pragma solidity ^0.5.0;

import "../Government.sol";

/// @title Government
contract GovernmentMock is Government{
    function initializeMock(address _userManager, address _cubit, address _governmentAddress) public {
        Government.initialize(_userManager, _cubit, _governmentAddress);
    }

    function distribute(address[] memory _to, uint256 _amount) public  {
        Government._distribute(_to, _amount);
    }
}
