pragma solidity >=0.5.0;

import "zos-lib/contracts/Initializable.sol";

import "./Product.sol";
import "./VAT.sol";

contract ProductTransaction is Initializable {

    struct productTransaction {
        uint256[] products;
        uint256[] productQuantity;
        uint256 date;
        address buyer;
    }

    uint256 private nextTransaction;
    mapping(uint256 => productTransaction) private transactionData;
    mapping(address => uint256[]) private buyerTransactions;
    mapping(address => uint256[]) private sellerTransactions;
    VAT internal vat;
    Product internal product;

    /**
    * @dev Initializes the contract saving the instances of the proxies of the contracts used by this contract
    */
    function initialize(address _product, address _vat) initializer public {
        product = Product(_product);
        vat = VAT(_vat);
        nextTransaction = 0;
    }

    /**
    * @dev Checks that only the product contract can call a function
    */
    modifier onlyProductContract() {
        require(msg.sender == address(product), "not Product");
        _;
    }

    /**
    * @dev Checks that only the VAT contract can call a function
    */
    modifier onlyVATContract() {
        require(msg.sender == address(vat), "not VAT");
        _;
    }

    /**
    * @dev Stores the data of a new transaction associated with the selling of products of a single manufacturer
    * @param _productIDs The IDs of the bought products
    * @param _quantities The quantities of the bought products
    * @param _buyer The address of the buyer
    * @param _seller The address of the seller
    */
    function addTransaction(uint256[] memory _productIDs, uint256[] memory _quantities,
        address _buyer, address _seller) public onlyProductContract {
        require(_productIDs.length == _quantities.length, "wrong parameters");
        transactionData[nextTransaction].products = _productIDs;
        transactionData[nextTransaction].productQuantity = _quantities;
        transactionData[nextTransaction].date = now;
        transactionData[nextTransaction].buyer = _buyer;

        buyerTransactions[_buyer].push(nextTransaction);
        sellerTransactions[_seller].push(nextTransaction);

        nextTransaction = nextTransaction + 1;

    }

    /**
    * @dev Returns all the transactions in which products were sold by a given user
    * @param _seller The address of the seller
    */
    function getSellerTransaction(address _seller) view public returns(uint256[] memory) {
        return sellerTransactions[_seller];
    }

    /**
    * @dev Returns all the transactions in which products were sold by a given user in a certain interval of time
    * @param _seller The address of the seller
    * @param _fromDate The date from which the interval starts
    * @param _fromDate The date from which the interval ends
    */
    function getSellerTransaction(address _seller, uint256 _fromDate, uint256 _toDate) view public
    returns(uint256[] memory) {
        uint256[] memory allTransactions = getSellerTransaction(_seller);
        uint256[] memory temporaryTransactions = new uint256[](allTransactions.length);
        uint256 elements = 0;
        for(uint256 i = 0; i < allTransactions.length; i++ )
            if(transactionData[allTransactions[i]].date >= _fromDate && transactionData[allTransactions[i]].date <= _toDate) {
                temporaryTransactions[elements] = allTransactions[i];
                elements ++;
            }
        uint256[] memory returnTransactions = new uint256[](elements);
        for(uint256 i = 0; i < elements; i++) {
            returnTransactions[i] = temporaryTransactions[i];
        }
        return temporaryTransactions;
    }

    /**
    * @dev Returns all the transactions in which products were bought by a given user
    * @param _buyer The address of the buyer
    */
    function getBuyerTransaction(address _buyer) view public returns(uint256[] memory) {

        return buyerTransactions[_buyer];
    }

    /**
    * @dev Returns all the transactions in which products were bought by a given user in a certain interval of time
    * @param _buyer The address of the buyer
    * @param _fromDate The date from which the interval starts
    * @param _fromDate The date from which the interval ends
    */
    function getBuyerTransaction(address _buyer, uint256 _fromDate, uint256 _toDate) view public
    returns(uint256[] memory) {
        uint256[] memory allTransactions = getBuyerTransaction(_buyer);
        uint256[] memory temporaryTransactions = new uint256[](allTransactions.length);
        uint256 elements = 0;
        for(uint256 i = 0; i < allTransactions.length; i++ )
            if(transactionData[allTransactions[i]].date >= _fromDate && transactionData[allTransactions[i]].date <= _toDate) {
                temporaryTransactions[elements] = allTransactions[i];
                elements ++;
            }
        uint256[] memory returnTransactions = new uint256[](elements);
        for(uint256 i = 0; i < elements; i++) {
            returnTransactions[i] = temporaryTransactions[i];
        }
        return temporaryTransactions;
    }

    /**
    * @dev Returns the data of a specific transaction
    * @param _transactionID The id of the transaction whose data to return
    */
    function getTransactionData(uint256 _transactionID) view public returns(uint256[] memory, uint256[] memory, uint, address) {
        return (transactionData[_transactionID].products,
                transactionData[_transactionID].productQuantity,
                transactionData[_transactionID].date,
                transactionData[_transactionID].buyer);
    }

    /**
    * @dev Returns the amount of cubit spent as VAT in a given transaction
    * @param _transactionID The id of the transaction whose data to return
    */
    function getTransactionVATTotal(uint256 _transactionID) view public returns(uint) {
        uint256[] memory products = transactionData[_transactionID].products;
        uint256[] memory quantities = transactionData[_transactionID].productQuantity;
        uint256 vatAmount = 0;
        uint256 currentProductPrice;
        uint8 currentProductVAT;
        for (uint256 i = 0; i < products.length; i++) {
            (currentProductPrice, currentProductVAT, , , ,) = product.getProductData(products[i]);
            vatAmount += currentProductPrice * currentProductVAT * quantities[i];
        }
        vatAmount = vatAmount / 100;

        return vatAmount;
    }
}
