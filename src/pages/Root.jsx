import { Outlet } from "react-router";
import MainNavigation from "../components/Navigation/MainNavigation";

export default function RootLayout() {
	return (
		<>
			<MainNavigation />
			<Outlet />
		</>
	);
}
