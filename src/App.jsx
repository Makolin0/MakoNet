import { RouterProvider } from "react-router";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import AboutMePage from "./pages/About";
import LootboxPage, { lootboxLoader } from "./pages/Lootbox";
import ChatPage from "./pages/Chat";

import "./init";
import LoginPage, { loginAction } from "./pages/Login";
import RegisterPage, { registerAction } from "./pages/Register";
import TestsPage from "./pages/Tests";
import { logoutAction, tokenLoader } from "./data/tokens";
import UserContextProvider from "./data/UserContext";
import LootboxListPage, { LootboxListLoader } from "./pages/admin/LootboxList";
import UserListPage, { UserListLoader } from "./pages/admin/UserList";

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
			{ path: "lootbox", element: <LootboxPage />, loader: lootboxLoader },
			{ path: "chat", element: <ChatPage /> },
			{ path: "tests", element: <TestsPage /> },
			{
				path: "admin",
				children: [
					{
						path: "lootbox",
						element: <LootboxListPage />,
						loader: LootboxListLoader,
					},
					{
						path: "users",
						element: <UserListPage />,
						loader: UserListLoader,
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
