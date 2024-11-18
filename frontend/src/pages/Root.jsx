import { Outlet, useRouteLoaderData } from "react-router";
import MainNavigation from "../components/navigation/MainNavigation";
import { UserContext } from "../data/UserContext";
import { useContext, useEffect } from "react";
import { getBackendUrl } from "../data/urls";
import toast from "react-hot-toast";
import AdminNavigation from "../components/navigation/AdminNavigation";

export default function RootLayout() {
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
			} else {
				setInfo(null);
			}
		}
		getUserInfo();
	}, [token]);
	return (
		<>
			<MainNavigation />
			{(userInfo?.role === "ADMIN" || userInfo?.role === "GOD") && (
				<AdminNavigation />
			)}
			<Outlet />
		</>
	);
}
