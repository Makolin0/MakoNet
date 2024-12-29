import { getLootboxNamesUrl, getUserLootboxCountUrl } from "../data/apiLinks";
import LootboxList from "../components/lootbox/LootboxList";
import { checkToken, getToken } from "../data/tokens";

export default function LootboxListPage() {
	return <LootboxList />;
}

export async function lootboxListLoader() {
	if (checkToken()) {
		const token = getToken();
		const response = await fetch(getUserLootboxCountUrl, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		if (response.status !== 200) {
			return null;
		} else {
			const responseData = await response.json();
			return responseData;
		}
	} else {
		const response = await fetch(getLootboxNamesUrl);
		if (response.status !== 200) {
			return null;
		} else {
			const responseData = await response.json();
			return responseData;
		}
	}
}
