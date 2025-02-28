import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js"
import { useLazyQuery } from "@apollo/client"
import { QUERY_CHECKOUT } from "@utils/queries"
import { idbPromise } from "@utils/helpers"
import CartItem from "@components/CartItem"
import Auth from "@utils/auth"
import { addMutlipleToCart, selectAllCartItems, toggleCart } from "@store/reducers/cartReducer"
import "./style.css"

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")

const Cart = () => {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT)
  const dispatch = useDispatch()
  const cart = useSelector((selectAllCartItems))
  const cartOpen = useSelector((state) => state.cart.cartOpen)

  // Open the Stripe Checkout when the data is available
	useEffect(() => {
		if (data) {
			stripePromise.then((res) => {
				res.redirectToCheckout({ sessionId: data.checkout.session })
			})
		}
	}, [data])

  // Get the cart from IndexedDB as soon as the component loads
	useEffect(() => {
		async function getCart() {
			const cart = await idbPromise("cart", "get")
			dispatch(addMutlipleToCart([...cart]))
		}

		if (!cart.length) {
			getCart()
		}
	}, [cart.length, dispatch])

  // Open/Close the cart
	function toggleTheCart() {
		dispatch(toggleCart())
	}

  // Calculate the total cost of the items in the cart
	function calculateTotal() {
		let sum = 0
		cart.forEach((item) => {
			sum += item.price * item.purchaseQuantity
		})
		return sum.toFixed(2)
	}

	function submitCheckout() {
		const productIds = []

		cart.forEach((item) => {
			for (let i = 0; i < item.purchaseQuantity; i++) {
				productIds.push(item._id)
			}
		})

		getCheckout({
			variables: { products: productIds },
		})
	}

	if (!cartOpen) {
		return (
			<div className="cart-closed" onClick={toggleTheCart}>
				<span role="img" aria-label="trash">
					🛒
				</span>
			</div>
		)
	}

	return (
		<div className="cart">
			<div className="close" onClick={toggleTheCart}>
				[close]
			</div>
			<h2>Shopping Cart</h2>
			{cart.length ? (
				<div>
					{cart.map((item) => (
						<CartItem key={item._id} item={item} />
					))}

					<div className="flex-row space-between">
						<strong>Total: ${calculateTotal()}</strong>

						{Auth.loggedIn() ? (
							<button onClick={submitCheckout}>Checkout</button>
						) : (
							<span>(log in to check out)</span>
						)}
					</div>
				</div>
			) : (
				<h3>
					<span role="img" aria-label="shocked">
						😱
					</span>
					You haven't added anything to your cart yet!
				</h3>
			)}
		</div>
	)
}

export default Cart
