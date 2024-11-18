import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { Form } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../data/UserContext";

export default function MainNavigation() {
	const { userInfo } = useContext(UserContext);
	const token = useRouteLoaderData("root");

	function checkIfActive({ isActive }) {
		return isActive ? classes.active : classes.link;
	}
	function checkIfActiveRegister({ isActive }) {
		// return `${classes.link} ${classes.linkRegister} ${
		// 	isActive ? classes.activeRegister : ""
		// }`;
		return `${classes.linkRegister} ${isActive ? classes.activeRegister : ""}`;
	}

	return (
		<div className={classes.container}>
			<nav className={classes.navigation}>
				<NavLink to="/" className={checkIfActive} end>
					Home
				</NavLink>
				<NavLink to="/projects" className={checkIfActive} end>
					Projects
				</NavLink>
				<NavLink to="/about" className={checkIfActive} end>
					About Me
				</NavLink>
			</nav>
			{token ? (
				<Form action={"logout"} method={"POST"} className={classes.logout}>
					<p>{userInfo?.nickname}</p>
					<button type="submit">Log out</button>
				</Form>
			) : (
				<nav className={classes.authorisation}>
					<NavLink
						to="/login"
						// className={({ isActive }) =>
						// 	isActive ? classes.activeLogin : classes.linkLogin
						// }
						className={checkIfActive}
						end
					>
						Log in
					</NavLink>
					<NavLink to="/register" className={checkIfActiveRegister} end>
						Sign in
					</NavLink>
				</nav>
			)}
		</div>
	);
}
