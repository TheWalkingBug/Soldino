const initialState = {
  citizen: null,
  businessOwner: null,
  cubit: null,
  government: null,
  userManager: null,
  vat: null,
  vatTransaction: null,
  productTransaction: null,
  product: null,
};

const contractsReducer = (state = initialState, action) => {
  if (action.type === 'CONTRACTS_INITIALIZED') {
    return Object.assign({}, state, {
      citizen: action.payload.citizen,
      businessOwner: action.payload.businessOwner,
      cubit: action.payload.cubit,
      government: action.payload.government,
      userManager: action.payload.userManager,
      vat: action.payload.vat,
      vatTransaction: action.payload.vatTransaction,
      productTransaction: action.payload.productTransaction,
      product: action.payload.product,
    });
  }

  return state;
};

export default contractsReducer;
