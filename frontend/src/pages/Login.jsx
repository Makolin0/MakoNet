import { redirect } from "react-router";
import Login from "../components/authentication/Login";
import { postLoginUrl } from "../data/apiLinks";
import toast from "react-hot-toast";
import { saveToken } from "../data/tokens";

export default function LoginPage() {
	return <Login />;
}

export async function loginAction({ request }) {
	const data = await request.formData();
	const credentials = {
		email: data.get("email"),
		password: data.get("password"),
	};

	const response = await fetch(postLoginUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	if (response.status !== 200) {
		toast.error("Could not log in");
		return redirect("/login");
	}

	const responseData = await response.text();

	saveToken(responseData);

	return redirect("/");
}
