import Init from './init';
import Users from './users';
import Products from './products';
import Vat from './vat';
import Cubit from './cubit';
import Orders from './orders';

/**
 * SoldinoAPI module.
 * SoldinoAPI is the starting point to call specific APIs of Soldino App.
 *
 * It can be exported as a whole object containing all the APIs or via
 * destructuring operator selecting just the needed APIs.
 *
 * All the APIs are grouped according to the type of objects and features they affect.
 * @module SoldinoAPI
 * @property {Function}  init Core APIs with getters and setters of Solidity contracts
 * @property {Function}  users Users APIs
 * @property {Function}  products Products APIs
 * @property {Function}  vat Vat APIs
 * @property {Function}  cubit Cubit APIs
 * @property {Function}  orders Orders APIs
 */
const SoldinoAPI = {
  /**
   * Init module.
   * @see module:Init.js
   */
  init: Init,
  /**
   * Users module.
   * @see module:Users
   */
  users: Users,
  /**
   * Users Products.
   * @see module:Products
   */
  products: Products,
  /**
   * Vat module.
   * @see module:Vat
   */
  vat: Vat,
  /**
   * Cubit module.
   * @see module:Cubit
   */
  cubit: Cubit,
  /**
   * Orders module.
   * @see module:Orders
   */
  orders: Orders,
};

export default SoldinoAPI;
