import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "@apollo/client"
import Cart from "@components/Cart"
import { QUERY_PRODUCTS } from "@utils/queries"
import { idbPromise } from "@utils/helpers"
import spinner from "@assets/spinner.gif"
import {
	removeFromCart,
	updateCartQuantity,
	addToCart,
	selectAllCartItems,
} from "@store/reducers/cartReducer"
import {
	updateProducts,
	selectAllProducts,
} from "@store/reducers/catalogReducer"

function Detail() {
	const dispatch = useDispatch()
	const products = useSelector(selectAllProducts)
	const cart = useSelector(selectAllCartItems)

	const { id } = useParams()
	const { loading, data } = useQuery(QUERY_PRODUCTS)
	const [currentProduct, setCurrentProduct] = useState({})

	useEffect(() => {
		// already in global store
		if (products.length) {
			const product = products.find((product) => product._id === id)

			const item = {
				image: product.image,
				name: product.name,
				_id: product._id,
				price: product.price,
				quantity: product.quantity,
			}

			setCurrentProduct(item)
		}
		// retrieved from server
		else if (data) {
			dispatch(updateProducts({ ...data.products }))

			data.products.forEach((product) => {
				idbPromise("products", "put", product)
			})
		}
		// get cache from idb
		else if (!loading) {
			idbPromise("products", "get").then((indexedProducts) => {
				dispatch(updateProducts({ ...indexedProducts }))
			})
		}
	}, [products, data, loading, dispatch, id])

	const addItemToCart = () => {
		const itemInCart = cart.find((cartItem) => cartItem._id === id)
		if (itemInCart) {
			dispatch(
				updateCartQuantity({
					_id: id,
					purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
				})
			)
			idbPromise("cart", "put", {
				...itemInCart,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			})
		} else {
			dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }))
			idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 })
		}
	}

	const removeItemFromCart = () => {
		dispatch(removeFromCart( { _id: currentProduct._id }))
		idbPromise("cart", "delete", { ...currentProduct })
	}

	return (
		<>
			{currentProduct && cart ? (
				<div className="container my-1">
					<Link to="/">← Back to Products</Link>

					<h2>{currentProduct.name}</h2>

					<p>{currentProduct.description}</p>

					<p>
						<strong>Price:</strong>${currentProduct.price}{" "}
						<button onClick={addItemToCart}>Add to Cart</button>
						<button
							disabled={!cart.find((p) => p._id === currentProduct._id)}
							onClick={removeItemFromCart}
						>
							Remove from Cart
						</button>
					</p>

					<img
						src={`/images/${currentProduct.image}`}
						alt={currentProduct.name}
					/>
				</div>
			) : null}
			{loading ? <img src={spinner} alt="loading" /> : null}
			<Cart />
		</>
	)
}

export default Detail
