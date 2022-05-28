import createDataContext from './createDataContext';

const actionUpdateRefresh = "action_update_refresh"

const ordersReducer = (state, action) => {
  switch (action.type) {
    case actionUpdateRefresh: 
      return {
        shouldRefresh: action.payload
      }
    default:
      return state
  }
}

const updateOrderRefresh = (dispatch) => async (shouldRefresh) => {
  dispatch({ type: actionUpdateRefresh, payload: shouldRefresh })
}

export const { Provider, Context } = createDataContext(
  ordersReducer, 
  { updateOrderRefresh },
  { shouldRefresh: true }
)

