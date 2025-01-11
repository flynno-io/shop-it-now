import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

// Create a cartAdapter
const cartAdapter = createEntityAdapter({
  // Tells the adapter how to select the id property of cart items.
  // The _id property is the unique identifier for each cart item
  selectId: (cartItem) => cartItem._id,
})

// The initial state of the application is an object with the following properties.
const initialState = cartAdapter.getInitialState({
	cartOpen: false,
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      cartAdapter.addOne(state, action.payload)
      state.cartOpen = true
    },
    addMutlipleToCart: cartAdapter.addMany,
    updateCartQuantity(state, action) {
      cartAdapter.updateOne(state, {
        id: action.payload._id,
        changes: { purchaseQuantity: action.payload.purchaseQuantity },
      })
      state.cartOpen = true
    },
    removeFromCart(state, action) {
      cartAdapter.removeOne(state, action.payload._id)
      state.cartOpen = state.ids.length > 0 // Keep the cart open if there are items in it
    },
    clearCart(state) {
      cartAdapter.removeAll(state)
      state.cartOpen = false // Close the cart when it's empty
    },
    toggleCart(state) {
      state.cartOpen = !state.cartOpen
    },
  },
})

// Export the reducer functions as actions
export const {
  addToCart,
  addMutlipleToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  toggleCart,
} = cartSlice.actions

// Export the selectors to access cart state data
export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds,
  selectTotal: selectCartTotalItems,
} = cartAdapter.getSelectors((state) => state.cart)

// Export the reducer as the default.
export default cartSlice.reducer