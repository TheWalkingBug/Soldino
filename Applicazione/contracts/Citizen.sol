pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "zos-lib/contracts/application/App.sol";

import "./UserManager.sol";

/// @title Citizen
contract Citizen is Initializable {

    address[] private registeredCitizens;
    mapping(address => bytes32) private citizenHashes;
    UserManager internal userManager;

    /**
    * @dev Initializes the contract saving the instances of the proxies of the contracts used by this contract
    * @param _userManager The instance of the proxy of the UserManager contract of this project
    */
    function initialize(address _userManager) initializer public {
        userManager = UserManager(_userManager);
    }

    /**
    * @dev A modifier that assures that the function is called only by the UserManager contract
    */
    modifier onlyUserManager() {
        require(msg.sender == address(userManager), "Only userManager");
        _;
    }

    /**
    * @dev Registers the given user as a citizen
    * @param _hash the hash of the data of the citizen present in ipfs
    * @param _user the address of the citizen to be registered
    */
    function registerCitizen(bytes32 _hash, address _user) public onlyUserManager {
        citizenHashes[_user] = _hash;
        registeredCitizens.push(_user);
    }

    /**
    * @dev Returns the hash of the data of a specific citizen
    * @param _user The address of the citizen whose data to return
    */
    function login(address _user) public onlyUserManager view returns(bytes32) {
        return citizenHashes[_user];
    }

    /**
    * @dev Returns a dynamic array containing all registered citizens' addresses
    */
    function getAllCitizens() public onlyUserManager view returns(address[] memory) {
        return registeredCitizens;
    }
}
