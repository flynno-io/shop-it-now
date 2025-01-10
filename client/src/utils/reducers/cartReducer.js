import { createSlice } from '@reduxjs/toolkit';

// The initial state of the application is an object with the following properties.
const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCard(state, action) {
      state.cart.push(action.payload);
      state.cart.cartOpen = true;
    },
    addMutlipleToCart(state, action) {
      state.cart.push(...action.payload)
    },
    updateCartQuantity(state, action) {
      state.cart.cartOpen = true;
      state.cart = state.cart.map((product) => {
        if (action.payload._id === product._id) {
          product.purchaseQuantity = action.payload.purchaseQuantity;
        }
        return product;
      });
    },
    removeFromCart(state, action) {
      let newState = state.cart.filter((product) => {
        return product._id !== action.payload;
      });
      state.cart = newState;
      state.cartOpen = newState.length > 0;
    },
    clearCard(state, action) {
      state.cart = [];
      state.cartOpen = false;
    },
    toggleCart(state, action) {
      state.cartOpen = !state.cartOpen;
    },
  }
})

// Export the reducer functions as actions to be called in the application.
export const { addToCard, addMutlipleToCart, updateCartQuantity, removeFromCart, clearCard, toggleCart } = cartReducer.actions;

// Export the reducer as the default.
export default cartReducer.reducer;