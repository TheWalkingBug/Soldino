pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";

import "./UserManager.sol";
import "./Cubit.sol";

/// @title Government
contract Government is Initializable{

    address private governmentAddress;
    UserManager internal userManager;
    Cubit internal cubit;

    /**
    * @dev Initializes the contract saving the instances of the proxies of the contracts used by this contract and the address of the government user
    * @param _userManager The instance of the proxy of the UserManager contract of this project
    * @param _cubit The instance of the proxy of the Cubit contract of this project
    * @param _governmentAddress The address of the government user
    */
    function initialize(address _userManager, address _cubit, address _governmentAddress)
    initializer public {
        userManager = UserManager(_userManager);
        cubit = Cubit(_cubit);
        governmentAddress = _governmentAddress;
    }

    /**
    * @dev Checks if the user who calls this function is the government
    */
    modifier onlyGovernment {
        require(governmentAddress == msg.sender, "Not a registered citizen!");
        _;
    }

    /**
    * @dev Returns true if the given user is the government
    * @param _user The address of the user to check
    */
    function isGovernment(address _user) public view returns(bool) {
        return governmentAddress == _user;
    }

    /**
    * @dev Allows the government to distribute cubits to a specific set of users
    * @param _to An array containing the addresses of the users to whom send cubits
    * @param _amount the amount of cubits to give to EACH of the users
    */
    function distributeToUsers(address[] memory _to, uint256 _amount) onlyGovernment public {
        require((_to.length * _amount <= cubit.balanceOf(msg.sender)),
                "Not enough tokens");
        _distribute(_to, _amount);
    }

    /**
    * @dev Allows the government to distribute cubits to all citizens and business owners registered in the system
    * @param _amount the amount of cubits to give to EACH of the users
    */
    function distributeToAll(uint256 _amount) public onlyGovernment { // TODO REMOVE IN FAVOR OF distributeToUsers
        address[] memory users = userManager.getAllRegisteredUsers();
        require(users.length * _amount <= cubit.balanceOf(msg.sender),
            "Not enough tokens");

        _distribute(users, _amount);
    }

    /**
    * @dev Internal function that tries to distribute money to a specific set of users (no requires are used)
    * @param _to An array containing the addresses of the users to whom send cubits
    * @param _amount the amount of cubits to give to EACH of the users
    */
    function _distribute(address[] memory _to, uint256 _amount) internal  {

        uint256 userType;
        for(uint256 i = 0; i <  _to.length; i++){
            userType = uint(userManager.isRegistered(_to[i]));
            if(!(userType != 1 && (userType != 2 || userManager.isBusinessOwnerConfirmed(_to[i]) == 0)))
                cubit.transferFrom(governmentAddress, _to[i], _amount);
        }
    }

    /**
    * @dev Returns the address of the government user
    */
    function getGovernmentAddress() view public returns(address) {
        return governmentAddress;
    }
}
