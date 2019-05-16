pragma solidity >= 0.5.0;

import "zos-lib/contracts/Initializable.sol";

import "./UserManager.sol";
import "./BPBDateTimeLibrary.sol";
import "./BusinessOwner.sol";
import "./VAT.sol";

contract VATTransaction is Initializable{
    using BPBDateTimeLibrary for uint;

    struct vatTransaction {
        uint256 date;
        uint256 amount;
        address addresser;
        address addressee;
        bool refused;
    }

    uint256 private nextTransaction;
    mapping(uint256 => vatTransaction) private transactionData;
    mapping(uint256 => mapping(uint8 => mapping(address => uint))) private VATDeductions;
    mapping(uint256 => mapping(uint8 => mapping(address => uint))) private VATCompensations;
    UserManager internal userManager;
    VAT internal vat;

    /**
    * @dev Initializes the contract saving the instances of the proxies of the contracts used by this contract
    * @param _vat The instance of the proxy of the VAT contract of this project
    * @param _userManager The instance of the proxy of the UserManager contract of this project
    */
    function initialize(address _userManager, address _vat) initializer public {
        userManager = UserManager(_userManager);
        vat = VAT(_vat);
        nextTransaction = 1;
    }

    /**
    * @dev Checks that only the VAT contract can call a function
    */
    modifier onlyVATContract() {
        require(msg.sender == address(vat));
        _;
    }

    /**
    * @dev Stores the data of a new transaction associated with the paying of the VAT of a single business owner in given quarter
    * @param _amount The amount in Cubit cents that was payed
    * @param _addresser The address of the paying user
    * @param _addressee The address of the payed user
    * @param _refused A boolean value that indicates if the transaction stands for the refusal of a payment
    * @param _year The year of the quarter
    * @param _quarter The quarter (1-4) in the given year
    */
    function addTransaction(uint256 _amount, address _addresser, address _addressee, bool _refused, uint256 _year, uint8 _quarter) public onlyVATContract {
        transactionData[nextTransaction].date = now;
        transactionData[nextTransaction].amount = _amount;
        transactionData[nextTransaction].addresser = _addresser;
        transactionData[nextTransaction].addressee = _addressee;
        transactionData[nextTransaction].refused = _refused;

        if(uint(userManager.isRegistered(_addresser)) == 3) {
            require(uint(userManager.isRegistered(_addressee)) == 2, "Only business can pay quarterly VAT");
            VATCompensations[_year][_quarter][_addressee] =
                nextTransaction;
        }else if (uint(userManager.isRegistered(_addressee)) == 3) {
            require(uint(userManager.isRegistered(_addresser)) == 2, "Only business can pay quarterly VAT");
            VATDeductions[_year][_quarter][_addresser] =
                nextTransaction;
        }else { revert("Neither the addresser nor the addressee is the government"); }
        nextTransaction ++;
    }

    /**
    * @dev Returns all the vat deductions in a given period of time (for all users)
    * @param _fromYear The year of the starting quarter
    * @param _fromQuarter The starting quarter (1-4) in the given year
    * @param _toYear The year of the ending quarter
    * @param _toQuarter The ending quarter (1-4) in the given year
    */
    function getVATDeductions(uint256 _fromYear, uint8 _fromQuarter, uint256 _toYear, uint8 _toQuarter) view public returns(uint256[] memory) {
        uint8 start = _fromQuarter;
        uint8 end = 4;
        address[] memory allBusinessOwners = userManager.getAllBusinessOwners();
        uint256[] memory temporaryTransactions = new uint256[](nextTransaction);
        uint256 nextTemporaryTransaction = 0;
        for(uint256 y = _fromYear; y <= _toYear; y++) {
            if(y == _toYear)
                end = _toQuarter;
            for(uint8 q = start; q <= end; q++) {
                for(uint256 b = 0; b < allBusinessOwners.length; b++) {
                    if(VATDeductions[y][q][allBusinessOwners[b]] != 0x0) {
                        temporaryTransactions[nextTemporaryTransaction] = VATDeductions[y][q][allBusinessOwners[b]];
                        nextTemporaryTransaction ++;
                    }
                }
            }
            start = 1;
        }

        uint256[] memory returnTransactions = new uint256[](nextTemporaryTransaction);
        for(uint256 i = 0; i < nextTemporaryTransaction; i++) {
            returnTransactions[i] = temporaryTransactions[i];
        }
        return returnTransactions;
    }

    /**
    * @dev Returns all the vat compensations in a given period of time (for all users)
    * @param _fromYear The year of the starting quarter
    * @param _fromQuarter The starting quarter (1-4) in the given year
    * @param _toYear The year of the ending quarter
    * @param _toQuarter The ending quarter (1-4) in the given year
    */
    function getVATCompensations(uint256 _fromYear, uint8 _fromQuarter, uint256 _toYear, uint8 _toQuarter) view public returns(uint256[] memory) {
        uint8 start = _fromQuarter;
        uint8 end = 4;
        address[] memory allBusinessOwners = userManager.getAllBusinessOwners();
        uint256[] memory temporaryTransactions = new uint256[](nextTransaction);
        uint256 nextTemporaryTransaction = 0;
        for(uint256 y = _fromYear; y <= _toYear; y++) {
            if(y == _toYear)
                end = _toQuarter;
            for(uint8 q = start; q <= end; q++) {
                for(uint256 b = 0; b < allBusinessOwners.length; b++) {
                    if(VATCompensations[y][q][allBusinessOwners[b]] != 0x0) {
                        temporaryTransactions[nextTemporaryTransaction] = VATCompensations[y][q][allBusinessOwners[b]];
                        nextTemporaryTransaction++;
                    }
                }
            }
            start = 1;
        }

        uint256[] memory returnTransactions = new uint256[](nextTemporaryTransaction);
        for(uint256 i = 0; i < nextTemporaryTransaction; i++) {
            returnTransactions[i] = temporaryTransactions[i];
        }
        return returnTransactions;

    }

    /**
    * @dev Returns the id of the deduction in a given quarter for a given business address
    * @param _year The year of the quarter
    * @param _quarter The quarter (1-4) in the given year
    */
    function getDeduction(uint256 _year, uint8 _quarter, address _businessOwner)view public returns(uint256)
    {
        return VATDeductions[_year][_quarter][_businessOwner];
    }

    /**
    * @dev Returns the id of the compensation in a given quarter for a given business address
    * @param _year The year of the quarter
    * @param _quarter The quarter (1-4) in the given year
    */
    function getCompensation(uint256 _year, uint8 _quarter, address _businessOwner)view public returns(uint256)
    {
        return VATCompensations[_year][_quarter][_businessOwner];
    }


    /**
    * @dev Returns the data of a given transaction given the id
    * @param _transactionID The id of the transaction
    */
    function getVATTransactionData(uint256 _transactionID) view public returns(uint256, uint256, address, address, bool){
        return(transactionData[_transactionID].amount,
                transactionData[_transactionID].date,
                transactionData[_transactionID].addresser,
                transactionData[_transactionID].addressee,
                transactionData[_transactionID].refused);
    }
}
