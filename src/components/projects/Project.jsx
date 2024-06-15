import { Link } from "react-router-dom";
import classes from "./Project.module.css";

export default function Project({ name, description }) {
	return (
		<li>
			<Link to={`/${name}`} className={classes.project}>
				<img src={`/${name}.png`} alt={`${name}-img`} />
				<h2>{name}</h2>
				<p>{description}</p>
			</Link>
		</li>
	);
}
