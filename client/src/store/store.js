import { configureStore } from "@reduxjs/toolkit"
import productReducer from "@store/reducers/productReducer"
import cartReducer from "@store/reducers/cartReducer"

const store = configureStore({
	reducer: {
		products: productReducer,
		cart: cartReducer,
	},
})

export default store
