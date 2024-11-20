import { getLootboxNamesUrl } from "../data/urls";
import LootboxList from "../components/lootbox/LootboxList";

export default function LootboxListPage() {
	return <LootboxList />;
}

export async function lootboxListLoader() {
	const response = await fetch(getLootboxNamesUrl);
	if (response.status !== 200) {
		return null;
	} else {
		const responseData = await response.json();
		console.log(responseData);
		return responseData;
	}
}
