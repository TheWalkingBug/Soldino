pragma solidity >=0.5.0;

import "zos-lib/contracts/Initializable.sol";

import "./UserManager.sol";
import "./Cubit.sol";
import "./ProductTransaction.sol";

///@title Product
contract Product is Initializable {

    struct product {
        bytes32 hash;
        uint256 price;
        address owner;
        uint256 availability;
        uint8 VAT;
        bool deleted;
    }

    uint256 private nextProduct;
    uint256[] private products;
    mapping(uint256 => product) private productData;
    UserManager internal userManager;
    Cubit internal cubit;
    ProductTransaction internal productTransaction;

    /**
    * @dev Initializes the contract saving the instances of the proxies of the contracts used by this contract
    * @param _userManager The instance of the proxy of the UserManager contract of this project
    * @param _cubit The instance of the proxy of the Cubit contract of this project
    * @param _productTransaction The instance of the proxy of the ProductTransaction contract of this project
    */
    function initialize(address _userManager, address _cubit, address _productTransaction) initializer public {
        userManager = UserManager(_userManager);
        cubit = Cubit(_cubit);
        productTransaction = ProductTransaction(_productTransaction);
        nextProduct = 0;
    }

    /**
    * @dev Checks if the given ids identify registered products that were not deleted
    * @param _products The id of the products to check
    */
    modifier onlyValidProductIDs(uint256[] memory _products) {
        for(uint256 i = 0; i < _products.length; i++)
            require(isValidProductID(_products[i]), "Invalid product ID");
        _;
    }

    /**
    * @dev Checks if the given id identifies a registered product that wasn't deleted
    * @param _productID The id of the product to check
    */
    modifier onlyValidProductID(uint256 _productID) {
        require(isValidProductID(_productID), "Invalid product ID");
        _;
    }

    /**
    * @dev Checks if a given user is the owner of the given product
    * @param _user The address of the business owner who's supposed to own the product
    * @param _productId The id associated with the product whose owner is to be checked
    */
    modifier onlyProductOwner(address _user, uint256 _productId) {
        product memory tmp = productData[_productId];
        require(tmp.owner == _user);
        _;
    }

    /**
    * @dev Checks if a given user is a confirmed business owner
    * @param _user The address of the user to check
    */
    modifier onlyValidBusinessOwner(address _user) {
        require(uint(userManager.isRegistered(_user)) == 2
        && userManager.isBusinessOwnerConfirmed(_user) != 0, "Not a business owner!");
        _;
    }

    /**
    * @dev Checks if a given user is registered
    * @param _user The address of the user to check
    */
    modifier onlyRegisteredUser(address _user) {
        require(uint(userManager.isRegistered(_user)) != 0, "Not a registered user!");
        _;
    }

    /**
    * @dev Checks if a given ID is associated with a valid, not deleted product
    * @param _productID The ID of the product to check
    */
    function isValidProductID(uint256 _productID) view public returns(bool) {
        return (productData[_productID].hash != 0x00 && productData[_productID].deleted == false);
    }

    /**
    * @dev Adds a new product to the system, owned by the business owner who calls the function
    * @param _price The price of the product to add
    * @param _availability The availability of the product to add
    * @param _VAT The VAT of the product to add
    * @param _hash The hash of the data of the product to add
    */
    function addProduct(uint256 _price, uint256 _availability, uint8 _VAT, bytes32 _hash) public
        onlyValidBusinessOwner(msg.sender) {

        productData[nextProduct].hash = _hash;
        productData[nextProduct].price = _price;
        productData[nextProduct].owner = msg.sender;
        productData[nextProduct].availability = _availability;
        productData[nextProduct].VAT = _VAT;

        products.push(nextProduct);
        nextProduct = nextProduct + 1;

    }

    /**
    * @dev Allows the the registered user who calls the function to buy products from a given seller
    * @param _products The ids of the products to buy
    * @param _amount The amount of each product to buy
    * @param _owner The address of the owner of ALL the products bought
    */
    function buyProductsFromOwner(uint256[] memory _products, uint256[] memory _amount, address _owner) public
    onlyRegisteredUser(msg.sender) onlyValidProductIDs(_products) {

        require(_products.length == _amount.length, "Wrong parameters");
        uint256 currentPrice = 0;
        for (uint256 i = 0; i < _products.length; i++) {
            require(productData[_products[i]].availability >= _amount[i], "Trying to buy more product than it's possible");
            require(productData[_products[i]].owner == _owner, "Trying to buy products from more than one owner");

            currentPrice = currentPrice + productData[_products[i]].price * _amount[i];
            productData[_products[i]].availability -= _amount[i];
        }

        cubit.transferFrom(msg.sender, _owner, currentPrice);
        productTransaction.addTransaction(_products, _amount, msg.sender, _owner);
    }

    function getOwnersOfProducts(uint256[] memory _products) internal view returns (address[] memory){
        address[] memory owners = new address[](products.length);
        uint256 totalOwners = 0;
        bool found;
        for(uint256 i = 0; i < _products.length; i++) {
            found = false;
            for(uint256 j = 0; j < totalOwners && !found; j++) {
                found = (owners[j] == productData[_products[i]].owner);
            }
            if(!found) {
                //inserisco l'owner nella lista di owners
                owners[totalOwners] = productData[_products[i]].owner;
                totalOwners++;
            }
        }
        address[] memory toReturn = new address[](totalOwners);
        for(uint256 i = 0; i < totalOwners; i++) {
            toReturn[i] = owners[i];
        }
        return toReturn;
    }


    /**
    * @dev Allows the the registered user who calls the function to buy products
    * @param _products The ids of the products to buy
    * @param _amount The amount of each product to buy
    */
    function buyProducts(uint256[] memory _products, uint256[] memory _amount) public
    onlyRegisteredUser(msg.sender) onlyValidProductIDs(_products) {
        require(_products.length == _amount.length, "Wrong parameters");

        //salvo tutti gli owners coinvolti
        address[] memory owners = getOwnersOfProducts(_products);
        bool[] memory checked = new bool[](_products.length);
        uint256 currentPrice;
        uint256 productsOfOwnerLength;
        uint256 k;
        uint256[] memory productsOfCurrentOwner;
        uint256[] memory amountsOfCurrentOwner;
        //ciclo per ogni owner
        for(uint256 i = 0; i < owners.length; i++) {
            currentPrice = 0;
            productsOfOwnerLength = 0;
            for(uint256 j = 0; j < _products.length; j++) {
                if(!checked[j]) {
                    require(productData[_products[i]].availability >= _amount[i], "Trying to buy more product than it's possible");
                    checked[j] = true;
                }

                if(productData[_products[j]].owner == owners[i]) {
                    productsOfOwnerLength++;
                }
            }

            productsOfCurrentOwner = new uint256[](productsOfOwnerLength);
            amountsOfCurrentOwner = new uint256[](productsOfOwnerLength);
            k = 0;

            //ciclo per ogni prodotto dell'owner
            for(uint256 j = 0; j < _products.length && k < productsOfOwnerLength; j++) {
                if(productData[_products[j]].owner == owners[i]) {
                    //assegno il prodotto all'owner
                    productsOfCurrentOwner[k] = _products[j];
                    amountsOfCurrentOwner[k] = _amount[j];
                    k++;

                    //aumento prezzo da pagare all'owner e riduco disponibilità del prodotto
                    currentPrice += productData[_products[j]].price * _amount[j];
                    productData[_products[j]].availability -= _amount[j];
                }
            }

            //trasferisco i cubit e memorizzo la transazione
            cubit.transferFrom(msg.sender, owners[i], currentPrice);
            productTransaction.addTransaction(productsOfCurrentOwner, amountsOfCurrentOwner, msg.sender, owners[i]);
        }
    }

    /**
    * @dev Function used by the owner of a product in order to change the availability of a product
    * @param _productId The id of the product whose name to change
    * @param _availability The new availability
    */
    function changeProductAvailability(uint256 _productId, uint256 _availability) public onlyValidProductID(_productId)
    onlyProductOwner(msg.sender, _productId) {
        productData[_productId].availability = _availability;
    }

    /**
    * @dev Function used by the owner of a product in order to increase the availability of a product
    * @param _productId The id of the product whose name to change
    * @param _availabilityChange The change of the product's availability
    */
    function increaseProductAvailability(uint256 _productId, uint256 _availabilityChange) public onlyValidProductID(_productId)
    onlyProductOwner(msg.sender, _productId) {
        productData[_productId].availability += _availabilityChange;
    }

    /**
    * @dev Function used by the owner of a product in order to make sure a product is unavailable
    * @param _productID The ID of the product to remove from circulation
    */
    function deleteProduct(uint256 _productID) public onlyValidProductID(_productID)
        onlyProductOwner(msg.sender, _productID) {
        productData[_productID].deleted = true;
    }

    /**
    * @dev Function used to get the data of a specific product
    * @param _productID The ID of the product to get the data
    */
    function getProductData(uint256 _productID) view public returns(uint, uint8, uint, address, bool, bytes32) {
        return (productData[_productID].price,
                productData[_productID].VAT,
                productData[_productID].availability,
                productData[_productID].owner,
                productData[_productID].deleted,
                productData[_productID].hash);
    }

    /**
    * @dev Function used to get the list of valid products
    */
    function getAllProducts() view public returns(uint256[] memory) {
        uint256 numberOfValidProducts = 0;
        for (uint256 i = 0; i < products.length; i++) {
            if(isValidProductID(products[i]) == true){
                numberOfValidProducts ++;
            }
        }
        uint256[] memory toReturnProduct = new uint256[](numberOfValidProducts);
        uint256 j = 0;
        for (uint256 i = 0; i < products.length; i++) {
            if(isValidProductID(products[i]) == true){
                toReturnProduct[j] = products[i];
                j++;
            }
        }

        return toReturnProduct;
    }
}
