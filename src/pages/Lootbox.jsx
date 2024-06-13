import toast from "react-hot-toast";
import Roulette from "../components/Lootbox/Roulette";
import { getToken } from "../data/tokens";
import { getBackendUrl } from "../data/urls";

export default function LootboxPage() {
	return <Roulette />;
}

export async function lootboxLoader() {
	const token = getToken();

	if (token === null) {
		return null;
	}

	const response = await fetch(getBackendUrl() + "/user/lootbox", {
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	if (response.status !== 200) {
		toast.error("Error while getting lootbox info");
		return null;
	} else {
		const responseData = await response.json();
		console.log(responseData);
		return responseData;
	}
}
