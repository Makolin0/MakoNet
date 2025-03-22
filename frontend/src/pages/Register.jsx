import { redirect } from "react-router";
import Register from "../components/authentication/Register";
import { postRegisterUrl } from "../data/apiLinks";
import toast from "react-hot-toast";
import { saveToken } from "../data/tokens";

export default function RegisterPage() {
	return <Register />;
}
export async function registerAction({ request }) {
	console.log("awaiting credentials");
	const data = await request.formData();
	const credentials = {
		email: data.get("email"),
		nickname: data.get("nickname"),
		password: data.get("password"),
	};

	console.log("credentials", credentials);

	const response = await fetch(postRegisterUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	console.log("got response", response);

	if (response.status === 400) {
		toast.error("Account with that email already exists");
		return redirect("/register");
	}
	if (response.status !== 200) {
		toast.error("Could not log in");
		return redirect("/register");
	}

	console.log("getting response data");
	const responseData = await response.text();
	console.log("got data", responseData);

	saveToken(responseData.token);

	return redirect("/");
}
