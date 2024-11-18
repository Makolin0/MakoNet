import toast from "react-hot-toast";
import { getBackendUrl } from "../data/urls";
import Roulette from "../components/lootbox/Roulette";
import { getToken } from "../data/tokens";

export default function LootboxPage() {
	console.log("lootboxPage");
	return <Roulette />;
}

export async function lootboxLoader() {
	const token = getToken();
	console.log("roulette loader");

	if (token === null) {
		return null;
	}

	const response = await fetch(getBackendUrl() + "/lootbox", {
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
