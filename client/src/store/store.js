import { configureStore } from "@reduxjs/toolkit"
import catalogReducer from "@store/reducers/catalogReducer"
import cartReducer from "@store/reducers/cartReducer"

const store = configureStore({
	reducer: {
		catalog: catalogReducer,
		cart: cartReducer,
	},
})

export default store
