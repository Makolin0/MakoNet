import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { Form } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getBackendUrl } from "../../data/urls";
import toast from "react-hot-toast";
import { UserContext } from "../../data/UserContext";

export default function MainNavigation() {
	const { userInfo, setInfo } = useContext(UserContext);
	const token = useRouteLoaderData("root");

	useEffect(() => {
		async function getUserInfo() {
			if (token !== null) {
				console.log("jest uzytkownik");

				const response = await fetch(getBackendUrl() + "/user/info", {
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				if (response.status !== 200) {
					toast.error("Error while getting user info");
				} else {
					const responseData = await response.json();
					console.log(responseData);
					setInfo(
						responseData.username,
						responseData.nickname,
						responseData.role
					);
				}
			}
		}
		getUserInfo();
	}, [token]);

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
					<p>{userInfo?.nickname}</p>
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
