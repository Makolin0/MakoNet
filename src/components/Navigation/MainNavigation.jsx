import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { Form } from "react-router-dom";
// import { useEffect } from "react";

export default function MainNavigation() {
	const token = useRouteLoaderData("root");

	// useEffect(() => {
	// 	async function getNick(){

	// 	}
	// }, [token]);

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
				<NavLink
					to="/projects"
					className={({ isActive }) =>
						isActive ? classes.active : classes.link
					}
					end
				>
					Projects
				</NavLink>
				<NavLink
					to="/about"
					className={({ isActive }) =>
						isActive ? classes.active : classes.link
					}
					end
				>
					About Me
				</NavLink>
				<NavLink
					to="/tests"
					className={({ isActive }) =>
						isActive ? classes.active : classes.link
					}
					end
				>
					tests
				</NavLink>
			</nav>
			{token ? (
				<Form action={"logout"} method={"POST"} className={classes.logout}>
					<button type="submit">Log out</button>
				</Form>
			) : (
				<nav className={classes.authorisation}>
					<NavLink
						to="/login"
						className={({ isActive }) =>
							isActive ? classes.activeLogin : classes.linkLogin
						}
						end
					>
						Log in
					</NavLink>
					<NavLink
						to="/register"
						className={({ isActive }) =>
							isActive ? classes.activeRegister : classes.linkRegister
						}
						end
					>
						Sign in
					</NavLink>
				</nav>
			)}
		</div>
	);
}
