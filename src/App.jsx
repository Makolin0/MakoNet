import { RouterProvider } from "react-router";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import AboutMePage from "./pages/About";
import AuthorisationPage from "./pages/Authorisation";
import LootboxPage from "./pages/Lootbox";
import RootLayoutExperiments from "./pages/Experiments/Root";
import GetTextPage, { getTextLoader } from "./pages/Experiments/GetText";
import ChatPage from "./pages/Chat";

import "./init";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "projects", element: <ProjectsPage /> },
			{ path: "about", element: <AboutMePage /> },
			{ path: "auth", element: <AuthorisationPage /> },
			{ path: "lootbox", element: <LootboxPage /> },
			{ path: "chat", element: <ChatPage /> },
			{
				path: "exp",
				element: <RootLayoutExperiments />,
				children: [
					{ index: true, element: <HomePage /> },
					{ path: "gettext", element: <GetTextPage />, loader: getTextLoader },
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
