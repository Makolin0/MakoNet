import { NavLink } from "react-router-dom";

import classes from "../Navigation/MainNavigation.module.css";

export default function ExperimentsNavigation() {
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
					to="gettext"
					className={({ isActive }) =>
						isActive ? classes.active : classes.link
					}
					end
				>
					Get Text
				</NavLink>
				<NavLink
					to="chat"
					className={({ isActive }) =>
						isActive ? classes.active : classes.link
					}
					end
				>
					Chat
				</NavLink>
			</nav>
		</div>
	);
}
