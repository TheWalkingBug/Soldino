pragma solidity ^0.5.0;

import "../Cubit.sol";

/// @title Cubit
contract CubitMock is Cubit {
    constructor(address _minter) public {
        Cubit.initialize(_minter);
    }
}

