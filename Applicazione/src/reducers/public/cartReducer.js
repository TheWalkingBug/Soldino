const initialState = {
  addedItems: [],
  total: 0,
};

function removeItem(addedItems, total, itemIndex) {
  let newAddedItems = addedItems;
  let newTotal = total;
  newTotal
    -= newAddedItems[itemIndex].price * newAddedItems[itemIndex].quantity;
  newAddedItems = newAddedItems.filter(
    item => item.id !== newAddedItems[itemIndex].id,
  );
  return {
    newAddedItems,
    newTotal,
  };
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newAddedItems = state.addedItems;
      let newTotal = 0;
      let itemLocation = newAddedItems.findIndex(
        element => element.id === action.payload.id,
      );
      if (itemLocation !== -1) {
        if (newAddedItems[itemLocation].quantity + action.payload.quantity
            <= newAddedItems[itemLocation].availability) {
          newAddedItems[itemLocation].quantity += action.payload.quantity;
        } else {
          newAddedItems[itemLocation].quantity = newAddedItems[itemLocation].availability;
        }
      } else {
        newAddedItems.push(action.payload);
        itemLocation = newAddedItems.length - 1;
      }
      for (let i = 0; i < newAddedItems.length; i += 1) {
        newTotal += newAddedItems[i].quantity * newAddedItems[i].price;
      }

      return {
        ...state,
        addedItems: newAddedItems,
        total: newTotal,
      };
    }

    case 'REMOVE_ITEM': {
      const { newAddedItems, newTotal } = removeItem(
        state.addedItems,
        state.total,
        state.addedItems.findIndex(item => action.payload === item.id),
      );
      return {
        ...state,
        addedItems: newAddedItems,
        total: newTotal,
      };
    }
    case 'ADD_QUANTITY': {
      const newAddedItems = state.addedItems;
      let newTotal = state.total;
      const addedItemIndex = newAddedItems.findIndex(
        item => item.id === action.payload,
      );
      newAddedItems[addedItemIndex].quantity += 1;
      newTotal += newAddedItems[addedItemIndex].price;
      return {
        ...state,
        addedItems: newAddedItems,
        total: newTotal,
      };
    }
    case 'SUB_QUANTITY': {
      const newAddedItems = state.addedItems;
      let newTotal = state.total;
      const addedItemIndex = newAddedItems.findIndex(
        item => item.id === action.payload,
      );
      // if the qt == 0 then it should be removed
      if (newAddedItems[addedItemIndex].quantity === 1) {
        const removeResult = removeItem(
          newAddedItems,
          newTotal,
          addedItemIndex,
        );
        return {
          ...state,
          addedItems: removeResult.newAddedItems,
          total: removeResult.newTotal,
        };
      }
      newAddedItems[addedItemIndex].quantity -= 1;
      newTotal -= newAddedItems[addedItemIndex].price;
      return {
        ...state,
        addedItems: newAddedItems,
        total: newTotal,
      };
    }
    case 'BUY':
      return {
        ...state,
      };
    case 'CLEAR_CART':
      return {
        addedItems: [],
        total: 0,
      };
    default:
      return {
        ...state,
        addedItems: state ? state.addedItems : [],
        total: state ? state.total : 0,
      };
  }
};

export default cartReducer;
