import { Link } from "react-router-dom";

import classes from "./FeaturedList.module.css";

export default function FeaturedProject({ name, description }) {
	console.log("FeaturedProject");
	console.log(name);
	return (
		<li className={classes.project}>
			<h3>{name}</h3>
			<img src={`/${name}.png`} alt={`${name}-img`} />
			<p>{description}</p>
			<Link to={name}>Check out</Link>
		</li>
	);
}
