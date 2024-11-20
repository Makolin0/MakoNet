import toast from "react-hot-toast";
import { getLootboxDataUrl } from "../data/urls";
import Roulette from "../components/lootbox/Roulette";

export default function LootboxPage() {
	console.log("lootboxPage");
	return <Roulette />;
}

export async function lootboxLoader({ params }) {
	console.log("lootboxLoader");
	console.log(params.name);
	console.log(getLootboxDataUrl(params.name));
	const response = await fetch(getLootboxDataUrl(params.name));
	if (response.status !== 200) {
		toast.error("Error while getting lootbox info");
		return null;
	} else {
		const responseData = await response.json();
		console.log(responseData);
		return responseData;
	}
}
