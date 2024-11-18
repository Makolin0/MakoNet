import { useRouteError } from "react-router";
import MainNavigation from "../components/navigation/MainNavigation";

export default function ErrorPage() {
	const error = useRouteError();

	let title = "Error!";
	let message = "Something went wrong :<";
	let response = "";

	if (error.status === 500) {
		message = error.data.message;
		response = error.response;
	}
	if (error.status === 404) {
		title = "Not found!";
		message = "Could not find your page";
	}
	return (
		<>
			<MainNavigation />
			<h1>{title}</h1>
			<h3>{message}</h3>
			<p>{response}</p>
		</>
	);
}
