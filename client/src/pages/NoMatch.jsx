import Jumbotron from "../components/Jumbotron"
import { Link } from "react-router-dom"

const NoMatch = () => {
	return (
		<div>
			<Jumbotron>
				<h1>404 Page Not Found</h1>
				<h1>
					<span role="img" aria-label="Face With Rolling Eyes Emoji">
						🙄
					</span>
				</h1>
        <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
						Go back to Home
					</Link>
			</Jumbotron>
		</div>
	)
}

export default NoMatch
