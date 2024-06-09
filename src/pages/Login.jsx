import { redirect } from "react-router";
import Login from "../components/authentication/Login";
import { getBackendUrl } from "../data/urls";
import toast from "react-hot-toast";

export default function LoginPage() {
	return <Login />;
}

export async function loginAction({ request }) {
	const data = await request.formData();
	const credentials = {
		email: data.get("email"),
		password: data.get("password"),
	};
	console.log("action data");
	console.log(credentials);

	const response = await fetch(getBackendUrl() + "/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	if (response.status !== 200) {
		toast.error("Could not log in");
	}

	const responseData = await response.json();
	console.log(responseData.token);

	localStorage.setItem("token", responseData.token);

	return redirect("/");
}
