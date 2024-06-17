import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

export default function AdminNavigation() {
	return (
		<div className={classes.admin}>
			<nav className={classes.navigationAdmin}>
				<NavLink
					to="/admin/lootbox"
					className={({ isActive }) =>
						isActive ? classes.active : classes.link
					}
					end
				>
					Lootbox List
				</NavLink>
				<NavLink
					to="/admin/users"
					className={({ isActive }) =>
						isActive ? classes.active : classes.link
					}
					end
				>
					Users List
				</NavLink>
			</nav>
		</div>
	);
}
