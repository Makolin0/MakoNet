import { RouterProvider } from "react-router";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import AboutMePage from "./pages/About";
import LootboxListPage, { lootboxListLoader } from "./pages/LootboxList";
import ChatPage from "./pages/Chat";

import "./init";
import LoginPage, { loginAction } from "./pages/Login";
import RegisterPage, { registerAction } from "./pages/Register";
import { logoutAction, tokenLoader } from "./data/tokens";
import UserContextProvider from "./data/UserContext";
import LootboxListAdminPage, {
	LootboxListAdminLoader,
} from "./pages/admin/LootboxList";
import UserListAdminPage, { UserListAdminLoader } from "./pages/admin/UserList";
import LootboxPage, { lootboxLoader } from "./pages/Lootbox";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
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
			{ path: "chat", element: <ChatPage /> },
			{
				path: "admin",
				children: [
					{
						path: "lootbox",
						element: <LootboxListAdminPage />,
						loader: LootboxListAdminLoader,
					},
					{
						path: "users",
						element: <UserListAdminPage />,
						loader: UserListAdminLoader,
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
