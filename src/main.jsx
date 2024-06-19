// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { getBackendUrl } from "./data/urls.js";

console.log("dev");
console.log(import.meta.env.DEV);
console.log(getBackendUrl());

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<Toaster />
		{/* <React.StrictMode> */}
		<App />
		{/* </React.StrictMode> */}
	</>
);
