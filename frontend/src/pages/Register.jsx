import { redirect } from "react-router";
import Register from "../components/authentication/Register";
import { getBackendUrl } from "../data/urls";
import toast from "react-hot-toast";
import { saveToken } from "../data/tokens";

export default function RegisterPage() {
	return <Register />;
}
export async function registerAction({ request }) {
	const data = await request.formData();
	const credentials = {
		email: data.get("email"),
		nickname: data.get("nickname"),
		password: data.get("password"),
	};

	const response = await fetch(getBackendUrl() + "/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	if (response.status === 400) {
		toast.error("Account with that email already exists");
		return redirect("/register");
	}
	if (response.status !== 200) {
		toast.error("Could not log in");
		return redirect("/register");
	}

	const responseData = await response.json();

	saveToken(responseData.token);

	return redirect("/");
}
