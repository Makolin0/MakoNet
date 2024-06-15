import { Link } from "react-router-dom";

import classes from "./FeaturedList.module.css";

export default function FeaturedProject({ name, description }) {
	return (
		<li>
			<Link to={name} className={classes.project}>
				<h3>{name}</h3>
				<img src={`/${name}.png`} alt={`${name}-img`} />
				<p>{description}</p>
			</Link>
		</li>
	);
}
