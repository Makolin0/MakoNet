import { Outlet, useRouteLoaderData } from "react-router";
import MainNavigation from "../components/navigation/MainNavigation";
import { UserContext } from "../data/UserContext";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import AdminNavigation from "../components/navigation/AdminNavigation";
import { adminRole, getUserInfoUrl } from "../data/apiLinks";

export default function RootLayout() {
	const { userInfo, setInfo } = useContext(UserContext);
	const token = useRouteLoaderData("root");

	useEffect(() => {
		async function getUserInfo() {
			if (token !== null) {
				const response = await fetch(getUserInfoUrl, {
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				if (response.status !== 200) {
					toast.error("Error while getting user info");
				} else {
					const responseData = await response.json();
					console.log("User Info", responseData);
					setInfo(
						responseData.username,
						responseData.email,
						responseData.roles
					);
				}
			} else {
				setInfo(null);
			}
		}
		getUserInfo();
	}, [token]);

	console.log("nav", userInfo);
	return (
		<>
			<MainNavigation />
			{userInfo?.roles?.includes(adminRole) && <AdminNavigation />}
			<Outlet />
		</>
	);
}
