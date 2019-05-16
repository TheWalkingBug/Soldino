pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";

import "./Citizen.sol";
import "./BusinessOwner.sol";
import "./Government.sol";

/// @title UserManager
contract UserManager is Initializable{

    enum userType { NotRegistered, Citizen, BusinessOwner, Government }

    Citizen internal citizen;
    BusinessOwner internal businessOwner;
    Government internal government;

    /**
    * @dev Initializes the contract saving the instances of the proxies of the contracts used by this contract
    * @param _citizen The instance of the proxy of the Citizen contract of this project
    * @param _businessOwner The instance of the proxy of the BusinessOwner contract of this project
    * @param _government The instance of the proxy of the Government contract of this project
    */
    function initialize(address _citizen, address _businessOwner, address _government) initializer public {
        citizen = Citizen(_citizen);
        businessOwner = BusinessOwner(_businessOwner);
        government = Government(_government);
    }

    /**
    * @dev Checks that only the government user can call a function
    */
    modifier onlyGovernment {
        userType uType = isRegistered(msg.sender);
        require(uType == userType.Government);
        _;
    }

    /**
    * @dev Checks that only not registered users can call a function
    */
    modifier onlyNotRegistered {
        userType uType = isRegistered(msg.sender);
        require(uType == userType.NotRegistered);
        _;
    }

    /**
    * @dev Returns the user type of the user who calls the function
    */
    function login() public view returns(userType){
        return isRegistered(msg.sender);
    }

    /**
    * @dev Returns the user type of a given user
    * @param _user The address of the user to check
    */
    function isRegistered(address _user) public view returns(userType){
        bytes32 hash = citizen.login(_user);
        if(hash != 0x0)
            return userType.Citizen;
        hash = businessOwner.login(_user);
        if(hash != 0x0)
            return userType.BusinessOwner;
        if(government.isGovernment(_user))
            return userType.Government;
        return userType.NotRegistered;
    }

    /**
    * @dev Returns the hash of a given user if it's either a citizen or a business owner; 0x0 otherwise
    * @param _user The address of the user
    */
    function getUserHash(address _user) public view returns(bytes32){
        userType uType = isRegistered(_user);
        if(uType == userType.Citizen)
            return citizen.login(_user);
        if(uType == userType.BusinessOwner)
            return businessOwner.login(_user);
        return 0x0;
    }

    /**
    * @dev Registers a user either as a citizen or a business owner
    * @param _type The type of the user to register
    * @param _hash The hash of the data (in IPFS) of the user to register
    */
    function registerUser(userType _type, bytes32 _hash) public onlyNotRegistered {
        require(_type == userType.Citizen || _type == userType.BusinessOwner);
        if(_type == userType.Citizen) {
            citizen.registerCitizen(_hash, msg.sender);
        } else {
            businessOwner.registerBusinessOwner(_hash, msg.sender);
        }
    }

    /**
    * @dev Returns a dynamic array containing all registered citizens' addresses
    */
    function getAllCitizens() public view returns(address[] memory){
        return citizen.getAllCitizens();
    }

    /**
    * @dev Returns a dynamic array containing all registered business owners' addresses
    */
    function getAllBusinessOwners() public view returns(address[] memory){
        return businessOwner.getAllBusinessOwners();
    }

    /**
    * @dev Returns the address of the government user
    */
    function getGovernmentAddress() public view returns(address){
        return government.getGovernmentAddress();
    }


    /**
    * @dev Returns a dynamic array containing all registered users' addresses
    */
    function getAllRegisteredUsers() public view returns(address[] memory){
        address[] memory allCitizens = getAllCitizens();
        address[] memory allBusinessOwners = getAllBusinessOwners();
        address[] memory registeredUsers = new address[](allCitizens.length + allBusinessOwners.length);
        uint256 index = 0;
        for (uint256 i = 0; i < allCitizens.length; i++) {
            registeredUsers[index] = allCitizens[i];
            index ++;
        }
        for (uint256 i = 0; i < allBusinessOwners.length; i++) {
            registeredUsers[index] = allBusinessOwners[i];
            index ++;
        }
        return registeredUsers;
    }

    /**
    * @dev Returns true if the given business owner is confirmed
    * @param _businessOwner The address of the business owner to check
    */
    function isBusinessOwnerConfirmed(address _businessOwner) public view returns(uint256) {
        return businessOwner.isConfirmed(_businessOwner);
    }

    /**
    * @dev Confirms the given business owner
    * @param _businessOwner The address of the business owner to confirm
    */
    function confirmBusinessOwner(address _businessOwner) public onlyGovernment {
        businessOwner.confirmBusiness(_businessOwner);
    }

    /**
    * @dev Removes the given business owner
    * @param _businessOwner The address of the business owner to remove
    */
    function removeBusinessOwner(address _businessOwner) public onlyGovernment {
        businessOwner.removeBusiness(_businessOwner);
    }

}
