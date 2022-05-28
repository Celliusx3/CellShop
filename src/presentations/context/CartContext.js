import CartItem from '../models/CartItem';
import createDataContext from './createDataContext';

const actionAddToCart = "action_add_to_cart"
const actionRemoveFromCart = "action_remove_from_cart"
const actionClearCart = "action_clear_cart"

const cartReducer = (state, action) => {
  switch (action.type) {
    case actionClearCart: 
      return {
        items: {},
        totalAmount: 0
      }
    case actionAddToCart:
      const {id, price, name, imageUrl } = action.payload
      const {items} = state

      let added;

      if (items[id]) {
        added = new CartItem(
          id,
          name,
          imageUrl,
          price,
          items[id].quantity + 1,
          items[id].totalPrice + price
        )
      } else {
        added = new CartItem(
          id,
          name,
          imageUrl,
          price,
          1,
          price
        )
      }

      return {
        ...state, 
        items: {...items, [id]: added}, 
        totalAmount: state.totalAmount + price
      }
    case actionRemoveFromCart:
      const productId = action.payload
      const updatedItems =  {...state.items}
      const total = updatedItems[productId].totalPrice
      delete updatedItems[productId]
      return {
        ...state, 
        items: updatedItems,
        totalAmount: state.totalAmount - total
      }
    default:
      return state
  }
}

const addToCart = (dispatch) => async (product) => {
  dispatch({ type: actionAddToCart, payload: product })
}

const removeFromCart = (dispatch) => async (productId) => {
  dispatch({ type: actionRemoveFromCart, payload: productId })
}

const clearCart = (dispatch) => async () => {
  dispatch({ type: actionClearCart, payload: null })
}

export const { Provider, Context } = createDataContext(
  cartReducer, 
  { addToCart, removeFromCart, clearCart },
  { items: {}, totalAmount: 0 }
)

