import { createSlice } from '@reduxjs/toolkit';

// The initial state of the application is an object with the following properties.
const initialState = {
  products: [],
  categories: [],
  currentCategory: '',
};

// productReducer using the createSlice function from Redux Toolkit
// to create a slice of the state object that manages the products data.
const productReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts(state, action) {
      state.products = [...action.payload];
    },
    updateCategories(state, action) {
      state.categories = [...action.payload];
    },
    updateCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },
  }
})

// Export the reducer functions as actions to be called in the application.
export const { updateProducts, updateCategories, updateCurrentCategory } = productReducer.actions;

// Export the reducer as the default.
export default productReducer.reducer;
