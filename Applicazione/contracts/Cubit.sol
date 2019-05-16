pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";

import "openzeppelin-eth/contracts/token/ERC20/ERC20Mintable.sol";

/// @title Cubit
contract Cubit is Initializable, ERC20Mintable {

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public INITIAL_SUPPLY;

    /**
    * @dev Mints INITIAL_SUPPLY cubits and gives them to the given user
    * @param minter The address of the user who will be able to mint cubits
    */
    function initialize(address minter) initializer public {
        name = "Cubit";
        symbol = "CUB";
        decimals = 2;
        INITIAL_SUPPLY = 0;
        super.initialize(minter);
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}

