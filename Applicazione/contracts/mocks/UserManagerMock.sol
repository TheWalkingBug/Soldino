pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";

import "./../UserManager.sol";

/// @title UserManagerMock
contract UserManagerMock is UserManager {
    function initializeMock(address _citizen, address _businessOwner, address _government) public {
        UserManager.initialize(_citizen, _businessOwner, _government);
    }

    function callBusinessOwnerRegisterBusinessOwner(bytes32 _hash, address _user) public {
        businessOwner.registerBusinessOwner(_hash, _user);
    }
    function callBusinessOwnerLogin(address _user) public view returns(bytes32){
        return businessOwner.login(_user);
    }
    function callBusinessOwnerGetAllBusinessOwners() public view returns(address[] memory){
        return businessOwner.getAllBusinessOwners();
    }
    function callBusinessOwnerIsConfirmed(address _businessOwner) public view returns(uint256){
        return businessOwner.isConfirmed(_businessOwner);
    }
    function callBusinessOwnerConfirmBusiness(address _businessOwner) public {
        businessOwner.confirmBusiness(_businessOwner);
    }
    function callBusinessOwnerRemoveBusiness(address _businessOwner) public {
        businessOwner.removeBusiness(_businessOwner);
    }

    function callCitizenRegisterCitizen(bytes32 _hash, address _user) public {
        citizen.registerCitizen(_hash, _user);
    }
    function callCitizenLogin(address _user) public view returns(bytes32) {
        return citizen.login(_user);
    }
    function callCitizenGetAllCitizens() public view returns(address[] memory) {
        return citizen.getAllCitizens();
    }
}
