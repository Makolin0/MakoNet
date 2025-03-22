import { redirect } from "react-router";
import Register from "../components/authentication/Register";
import { postRegisterUrl } from "../data/apiLinks";
import toast from "react-hot-toast";
import { saveToken } from "../data/tokens";

export default function RegisterPage() {
	return <Register />;
}
export async function registerAction({ request }) {
	const data = await request.formData();
	const credentials = {
		email: data.get("email"),
		username: data.get("username"),
		password: data.get("password"),
		confirmPassword: data.get("confirmPassword"),
	};

	const response = await fetch(postRegisterUrl, {
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
	const responseData = await response.text();

	saveToken(responseData);

	return redirect("/");
}
