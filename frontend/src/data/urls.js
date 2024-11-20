export function getBackendUrl() {
	if (import.meta.env.DEV) {
		console.log("http://localhost:8080");
		return "http://localhost:8080";
	} else {
		console.log("https://makonet-backend.onrender.com");
		return "https://makonet-backend.onrender.com";
	}
}

export const getLootboxNamesUrl = getBackendUrl() + "/lootbox";

export function getLootboxDataUrl(name) {
	return getBackendUrl() + "/lootbox/" + name;
}

export function postLootboxDrawDemoUrl(name) {
	return getBackendUrl() + "/lootbox/" + name + "/demo";
}
