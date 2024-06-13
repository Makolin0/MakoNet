import { Outlet } from "react-router";
import MainNavigation from "../components/Navigation/MainNavigation";
import UserContextProvider from "../data/UserContext";

export default function RootLayout() {
	return (
		<UserContextProvider>
			<MainNavigation />
			<Outlet />
		</UserContextProvider>
	);
}
