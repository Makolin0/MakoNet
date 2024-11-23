import toast from "react-hot-toast";
import LootboxList from "../../components/admin/LootboxList";
import { getToken } from "../../data/tokens";
import { getBackendUrl } from "../../data/apiLinks";
import { redirect } from "react-router";

export default function LootboxListAdminPage() {
	return <LootboxList />;
}

export async function lootboxListAdminLoader() {
	const token = getToken();
	const response = await fetch(getBackendUrl() + "/admin/lootbox", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	if (response.status !== 200) {
		toast.error("Error while lootbox admin info");
		return redirect("/");
	} else {
		const responseData = await response.json();
		console.log(responseData);
		return responseData;
	}
}
