export const userRole = "ROLE_USER";
export const adminRole = "ROLE_ADMIN";
export const sigmaRole = "ROLE_SIGMA";

export function getBackendUrl() {
	if (import.meta.env.DEV) {
		return "http://localhost:8080";
	} else {
		return "https://makonet-backend.onrender.com";
	}
}

export const postLoginUrl = getBackendUrl() + "/user/login";
export const postRegisterUrl = getBackendUrl() + "/user/register";
export const getUserInfoUrl = getBackendUrl() + "/user/info";

export const getUserLootboxCountUrl = getBackendUrl() + "/lootbox";
export const getLootboxNamesUrl = getBackendUrl() + "/lootbox/demo";
export function postLootboxDrawDemoUrl(name) {
	return getBackendUrl() + "/lootbox/" + name + "/demo";
}
export const postLootboxDrawUrl = (name) =>
	getBackendUrl() + "/lootbox/" + name;
export function getLootboxDataUrl(name) {
	return getBackendUrl() + "/lootbox/" + name;
}
export function getLootboxNameCountUrl(name) {
	return getBackendUrl() + "/lootbox/" + name + "/count";
}
export const getLootboxNameHistoryUrl = (name) =>
	getBackendUrl() + "/lootbox/" + name + "/history";

export const getAdminUsersUrl = getBackendUrl() + "/admin/users";
export const getAdminUserDetailsUrl = (name) =>
	getBackendUrl() + "/admin/" + name;
