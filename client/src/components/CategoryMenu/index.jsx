import { useEffect } from "react"
import { useQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { QUERY_CATEGORIES } from "@utils/queries"
import { idbPromise } from "@utils/helpers"
import {
	updateCategories,
	updateCurrentCategory,
	selectAllCategories,
} from "@store/reducers/catalogReducer"

function CategoryMenu() {
	const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories) || []; // Default to empty array

	const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES)

	useEffect(() => {
		if (categoryData) {
			dispatch(updateCategories({ ...categoryData.categories }))
			categoryData.categories.forEach((category) => {
				idbPromise("categories", "put", category)
			})
		} else if (!loading) {
			idbPromise("categories", "get").then((categories) => {
				dispatch(updateCategories({ ...categories }))
			})
		}
	}, [categoryData, loading, dispatch])

	const handleClick = (id) => {
		dispatch(updateCurrentCategory({ _id: id }))
	}

	return (
		<div>
			<h2>Choose a Category:</h2>
			{categories?.map((item) => (
				<button
					key={item._id}
					onClick={() => {
						handleClick(item._id)
					}}
				>
					{item.name}
				</button>
			))}
			<button
				onClick={() => {
					handleClick("")
				}}
			>
				All
			</button>
		</div>
	)
}

export default CategoryMenu
