import toast from "react-hot-toast";
import { getToken } from "../../data/tokens";
import { getBackendUrl } from "../../data/urls";
import { redirect } from "react-router";
import UserList from "../../components/admin/UserList";

export default function UserListAdminPage() {
	return <UserList />;
}

export async function userListAdminLoader() {
	const token = getToken();
	const response = await fetch(getBackendUrl() + "/admin/users", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	if (response.status !== 200) {
		toast.error("Error while getting user admin info");
		return redirect("/");
	} else {
		const responseData = await response.json();
		console.log(responseData);
		return responseData;
	}
}
