import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { Form } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../data/UserContext";

export default function AdminNavigation() {
	const { userInfo } = useContext(UserContext);
	const token = useRouteLoaderData("root");

	return (
		<div className={classes.container}>
			<nav className={classes.navigation}>
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive ? classes.active : classes.link
					}
					end
				>
					Home
				</NavLink>
			</nav>
		</div>
	);
}
