import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import { logoutAction, tokenLoader } from "./data/tokens";
import ProjectsPage from "./pages/Projects";
import AboutMePage from "./pages/About";
import LoginPage, { loginAction } from "./pages/Login";
import RegisterPage, { registerAction } from "./pages/Register";
import LootboxListPage, { lootboxListLoader } from "./pages/LootboxList";
import LootboxPage, { lootboxLoader } from "./pages/Lootbox";
import LootboxListAdminPage, {
	lootboxListAdminLoader,
} from "./pages/admin/LootboxList";
import UserListAdminPage, { userListAdminLoader } from "./pages/admin/UserList";
import UserContextProvider from "./data/UserContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootPage />,
		errorElement: <ErrorPage />,
		id: "root",
		loader: tokenLoader,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "projects", element: <ProjectsPage /> },
			{ path: "about", element: <AboutMePage /> },
			{ path: "login", element: <LoginPage />, action: loginAction },
			{ path: "register", element: <RegisterPage />, action: registerAction },
			{ path: "logout", action: logoutAction },
			{
				path: "lootbox",
				element: <LootboxListPage />,
				loader: lootboxListLoader,
			},
			{
				path: "lootbox/:name",
				element: <LootboxPage />,
				loader: lootboxLoader,
			},
			{
				path: "admin",
				children: [
					{
						path: "lootbox",
						element: <LootboxListAdminPage />,
						loader: lootboxListAdminLoader,
					},
					{
						path: "users",
						element: <UserListAdminPage />,
						loader: userListAdminLoader,
					},
				],
			},
		],
	},
]);

function App() {
	return (
		<UserContextProvider>
			<RouterProvider router={router} />
		</UserContextProvider>
	);
}

export default App;
