import toast from "react-hot-toast";
import {
	getLootboxDataUrl,
	getLootboxNameCountUrl,
	getLootboxNameHistoryUrl,
} from "../data/apiLinks";
import Roulette from "../components/lootbox/Roulette";
import { checkToken, getToken } from "../data/tokens";

export default function LootboxPage() {
	return <Roulette />;
}

export async function lootboxLoader({ params }) {
	let lootboxData;
	console.log("getting data");
	const response = await fetch(getLootboxDataUrl(params.name));
	if (response.status !== 200) {
		toast.error("Error while getting lootbox data");
		return null;
	} else {
		lootboxData = await response.json();
	}

	if (checkToken()) {
		let countData;
		const responseCount = await fetch(getLootboxNameCountUrl(params.name), {
			headers: {
				Authorization: "Bearer " + getToken(),
			},
		});
		if (responseCount.status !== 200) {
			toast.error("Error while getting your lootbox count");
			return null;
		} else {
			countData = await responseCount.json();
		}

		const responseHistory = await fetch(getLootboxNameHistoryUrl(params.name), {
			headers: {
				Authorization: "Bearer " + getToken(),
			},
		});
		if (responseCount.status !== 200) {
			toast.error("Error while getting lootbox history");
			return null;
		} else {
			const history = await responseHistory.json();
			return { ...lootboxData, ...countData, history };
		}
	} else {
		return lootboxData;
	}
}
