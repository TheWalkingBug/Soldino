pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";

import "./UserManager.sol";

/// @title Business Owner
contract BusinessOwner is Initializable{

    address[] private registeredBusinessOwners;
    mapping(address => bytes32) private businessHashes;
    mapping(address => uint256) private confirmedBusinesses;
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
    * @dev Registers the given user as a business owner
    * @param _hash the hash of the data of the citizen present in ipfs
    * @param _user the address of the business owner to be registered
    */
    function registerBusinessOwner (bytes32 _hash, address _user) public onlyUserManager {
        businessHashes[_user] = _hash;
        registeredBusinessOwners.push(_user);
    }

    /**
    * @dev Returns the hash of the data of a specific user
    * @param _user The address of the business owner whose data to return
    */
    function login(address _user) public onlyUserManager view returns(bytes32)  {
        return businessHashes[_user];
    }

    /**
    * @dev Returns a dynamic array containing all registered business owners' addresses
    */
    function getAllBusinessOwners() public onlyUserManager view returns(address[] memory) {
        return registeredBusinessOwners;
    }

    /**
    * @dev Returns true if the given business owner is confirmed
    * @param _businessOwner The address of the business owner to check
    */
    function isConfirmed(address _businessOwner) public onlyUserManager view returns(uint256) {
        return confirmedBusinesses[_businessOwner];
    }

    /**
    * @dev Confirms the given business owner
    * @param _businessOwner The address of the business owner to confirm
    */
    function confirmBusiness(address _businessOwner) public onlyUserManager {
        confirmedBusinesses[_businessOwner] = now;
    }

    /**
    * @dev Removes the given business owner
    * @param _businessOwner The address of the business owner to remove
    */
    function removeBusiness(address _businessOwner) public onlyUserManager {
        confirmedBusinesses[_businessOwner] = 0;
        businessHashes[_businessOwner] = 0x0;
        for (uint256 i = 0; i < registeredBusinessOwners.length; i++) {
            if (registeredBusinessOwners[i] == _businessOwner) {
                registeredBusinessOwners[i] = registeredBusinessOwners[registeredBusinessOwners.length - 1];
                delete registeredBusinessOwners[registeredBusinessOwners.length - 1];
                registeredBusinessOwners.length--;
            }
        }
    }
}
