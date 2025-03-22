import toast from "react-hot-toast";
import LootboxList from "../../components/admin/LootboxList";
import { getToken } from "../../data/tokens";
import { redirect } from "react-router";
import { getAdminLootboxList } from "../../data/apiLinks";

export default function LootboxListAdminPage() {
	return <LootboxList />;
}

export async function lootboxListAdminLoader() {
	const token = getToken();
	const response = await fetch(getAdminLootboxList, {
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
