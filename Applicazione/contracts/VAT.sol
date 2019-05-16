pragma solidity >= 0.5.0;

import "zos-lib/contracts/Initializable.sol";

import "./UserManager.sol";
import "./Cubit.sol";
import "./VATTransaction.sol";
import "./ProductTransaction.sol";
import "./BPBDateTimeLibrary.sol";

contract VAT is Initializable{
    using BPBDateTimeLibrary for uint;

    enum VATStatus {
        NotNecessary,
        ToReceive,
        ToPay,
        Received,
        Payed,
        Refused
    }

    Cubit internal cubit;
    UserManager internal userManager;
    VATTransaction internal vatTransaction;
    ProductTransaction internal productTransaction;

    /**
    * @dev Initializes the contract saving the instances of the proxies of the contracts used by this contract
    * @param _cubit The instance of the proxy of the Cubit contract of this project
    * @param _userManager The instance of the proxy of the UserManager contract of this project
    * @param _vatTransaction The instance of the proxy of the VATTransaction contract of this project
    * @param _productTransaction The instance of the proxy of the ProductTransaction contract of this project
    */
    function initialize(address _cubit, address _userManager, address _vatTransaction, address _productTransaction)
    public initializer {
        cubit = Cubit(_cubit);
        userManager = UserManager(_userManager);
        vatTransaction = VATTransaction(_vatTransaction);
        productTransaction = ProductTransaction(_productTransaction);
    }

    /**
    * @dev Checks if a given user is a confirmed business owner
    * @param _businessOwner The address of the user to check
    */
    modifier onlyValidBusinessOwner(address _businessOwner){
        require(uint256(userManager.isRegistered(_businessOwner)) == 2, "Business owner is not registered");
        require(userManager.isBusinessOwnerConfirmed(_businessOwner) != 0, "Business owner is not confirmed");
        _;
    }

    /**
    * @dev Checks if the calling user is the government
    */
    modifier onlyGovernment(){
        require(uint(userManager.isRegistered(msg.sender)) == 3, "User is not the government");
        _;
    }

    /**
    * @dev Returns the vat balance for a given user in a given quarter
    * @param _year The year of the quarter
    * @param _quarter The quarter (1-4) check in which to check the balance of the business owner
    * @param _businessOwner The address of the business owner whose balance to get
    */
    function getQuarterVATBalance(uint256 _year, uint8 _quarter, address _businessOwner) view public
    onlyValidBusinessOwner(_businessOwner) returns(int) {
        uint256 fromDate = BPBDateTimeLibrary.getQuarterBeginning(_year, _quarter);
        uint256 toDate = BPBDateTimeLibrary.getQuarterEnd(_year, _quarter);

        uint256 toPay = _getVATToPay(fromDate, toDate, _businessOwner);
        uint256 toCollect = _getVATToCollect(fromDate, toDate, _businessOwner);

        if(toCollect >= toPay) {
            return int(toCollect - toPay);
        }else {
            return -(int(toPay - toCollect));
        }
    }

    /**
    * @dev Returns the VAT to pay of a given business owner from a given date to another
    * @param _fromDate The date from which to get the VAT
    * @param _toDate The date up to which to get the VAT
    * @param _businessOwner The address of the business owner whose VAT to get
    */
    function _getVATToPay(uint256 _fromDate, uint256 _toDate, address _businessOwner) view internal returns(uint) {
        uint256[]  memory transactions = productTransaction.getSellerTransaction(_businessOwner, _fromDate, _toDate);

        uint256 amount = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            amount += productTransaction.getTransactionVATTotal(transactions[i]);
        }

        return amount;
    }

    /**
    * @dev Returns the VAT to collect of a given business owner from a given date to another
    * @param _fromDate The date from which to get the VAT
    * @param _toDate The date up to which to get the VAT
    * @param _businessOwner The address of the business owner whose VAT to get
    */
    function _getVATToCollect(uint256 _fromDate, uint256 _toDate, address _businessOwner) view internal returns(uint) {
        uint256[]  memory transactions = productTransaction.getBuyerTransaction(_businessOwner, _fromDate, _toDate);

        uint256 amount = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            amount += productTransaction.getTransactionVATTotal(transactions[i]);
        }

        return amount;
    }

    /**
    * @dev Allows a business owner to pay the VAT of a given quarter to the government
    * @param _year The year of the quarter to pay
    * @param _quarter The quarter (1-4) in the given year to pay
    */
    function payVATToGovernment(uint256 _year, uint8 _quarter) public onlyValidBusinessOwner(msg.sender) {
        int256 amount = getQuarterVATBalance(_year, _quarter, msg.sender);
        (VATStatus status,) = getBusinessVATStatus(_year, _quarter, msg.sender);
        require(status == VATStatus.ToPay, "Can't pay VAT if you don't have to pay it");
        cubit.transferFrom(msg.sender, userManager.getGovernmentAddress(), uint(-amount));
        vatTransaction.addTransaction(uint(-amount), msg.sender, userManager.getGovernmentAddress(), false, _year, _quarter);
    }

    /**
    * @dev Allows a business owner to refuse the payment of the VAT of a given quarter to the government
    * @param _year The year of the quarter to refuse
    * @param _quarter The quarter (1-4) in the given year to refuse
    */
    function refusePayment(uint256 _year, uint8 _quarter) public onlyValidBusinessOwner(msg.sender) {
        int256 amount = getQuarterVATBalance(_year, _quarter, msg.sender);
        (VATStatus status,) = getBusinessVATStatus(_year, _quarter, msg.sender);
        require(status == VATStatus.ToPay, "Can't refuse VAT if you don't have to pay it");
        vatTransaction.addTransaction(uint(-amount), msg.sender, userManager.getGovernmentAddress(), true, _year, _quarter);
    }

    /**
    * @dev Allows the government to pay the VAT of a given quarter to a given business owner
    * @param _year The year of the quarter to pay
    * @param _quarter The quarter (1-4) in the given year to pay
    */
    function payVATToBusinessOwner(uint256 _year, uint8 _quarter, address _businessOwner) public onlyGovernment onlyValidBusinessOwner(_businessOwner) {
        int256 amount = getQuarterVATBalance(_year, _quarter, _businessOwner);
        (VATStatus status,) = getBusinessVATStatus(_year, _quarter, _businessOwner);
        require(status == VATStatus.ToReceive, "Can't pay VAT if you don't have to pay it");
        cubit.transferFrom(msg.sender, _businessOwner, uint(amount));
        vatTransaction.addTransaction(uint(amount), msg.sender, _businessOwner, false, _year, _quarter);
    }

    /**
    * @dev Returns the status of the payment of the VAT for a given business owner in a given quarter and eventually the
     transaction associated with the payment
    * @param _year The year of the quarter
    * @param _quarter The quarter (1-4) in the given year
    * @param _businessOwner The address of the business owner
    */
    function getBusinessVATStatus(uint256 _year, uint8 _quarter, address _businessOwner) public view
    onlyValidBusinessOwner(_businessOwner) returns(VATStatus, uint256){
        uint256 deductionId = vatTransaction.getDeduction(_year, _quarter, _businessOwner);
        uint256 compensationId = vatTransaction.getCompensation(_year, _quarter, _businessOwner);
        if(deductionId == 0) {
            if(compensationId == 0){
                int256 balance = getQuarterVATBalance(_year, _quarter, _businessOwner);
                if(balance < 0)
                    return (VATStatus.ToPay, 0);
                if(balance > 0)
                    return (VATStatus.ToReceive, 0);
                return (VATStatus.NotNecessary, 0);
            }
            return (VATStatus.Received, compensationId);
        }
        (,,,,bool refused) = vatTransaction.getVATTransactionData(deductionId);
        if (refused)
            return (VATStatus.Refused, deductionId);
        return (VATStatus.Payed, deductionId);
    }
}
