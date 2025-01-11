import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

export const productAdapter = createEntityAdapter({
	selectId: (product) => product._id,
})

export const categoryAdapter = createEntityAdapter({
	selectId: (category) => category._id,
})

// The initial state uses two adapters to manage the products and categories data.
const initialState = {
	products: productAdapter.getInitialState(),
	categories: categoryAdapter.getInitialState(),
	currentCategory: null,
}

// catalogReducer using the createSlice function from Redux Toolkit
// to create a slice of the state object that manages the products data.
const catalogSlice = createSlice({
	name: "catalog",
	initialState,
	reducers: {
    // Replace all products
		updateProducts(state, action) {
			productAdapter.setAll(state.products, action.payload)
		},
		// Replace all categories
		updateCategories(state, action) {
			categoryAdapter.setAll(state.categories, action.payload)
		},
		// Update the current category
		updateCurrentCategory(state, action) {
			state.currentCategory = action.payload._id
		},
	},
})

// Export the reducer functions as actions to be called in the application.
export const { updateProducts, updateCategories, updateCurrentCategory } =
catalogSlice.actions

// Export the selectors to access the state data.

// Product Selectors
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
} = productAdapter.getSelectors((state) => state.catalog.products)

// Category Selectors
export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
} = categoryAdapter.getSelectors((state) => state.catalog.categories)

// Export the reducer as the default.
export default catalogSlice.reducer
