import { RouterProvider } from "react-router";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import AboutMePage from "./pages/About";
import LootboxPage from "./pages/Lootbox";
import ChatPage from "./pages/Chat";

import "./init";
import LoginPage, { loginAction } from "./pages/Login";
import RegisterPage from "./pages/Register";
import TestsPage from "./pages/Tests";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "projects", element: <ProjectsPage /> },
			{ path: "about", element: <AboutMePage /> },
			{ path: "login", element: <LoginPage />, action: loginAction },
			{ path: "register", element: <RegisterPage /> },
			{ path: "lootbox", element: <LootboxPage /> },
			{ path: "chat", element: <ChatPage /> },
			{ path: "tests", element: <TestsPage /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
