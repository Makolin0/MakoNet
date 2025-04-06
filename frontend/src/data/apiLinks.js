export const userRole = "ROLE_USER";
export const adminRole = "ROLE_ADMIN";
export const sigmaRole = "ROLE_SIGMA";

export const backendUrl = import.meta.env.VITE_API_BACKEND_URL;
export const frontendUrl = import.meta.env.VITE_API_FRONTEND_URL;

export const postLoginUrl = backendUrl + "/user/login";
export const postRegisterUrl = backendUrl + "/user/register";
export const getUserInfoUrl = backendUrl + "/user/info";

export const getUserLootboxCountUrl = backendUrl + "/lootbox";
export const getLootboxNamesUrl = backendUrl + "/lootbox/demo";
export function postLootboxDrawDemoUrl(name) {
	return backendUrl + "/lootbox/" + name + "/demo";
}
export const postLootboxDrawUrl = (name) => backendUrl + "/lootbox/" + name;
export function getLootboxDataUrl(name) {
	return backendUrl + "/lootbox/" + name;
}
export function getLootboxNameCountUrl(name) {
	return backendUrl + "/lootbox/" + name + "/count";
}
export const getLootboxNameHistoryUrl = (name) =>
	backendUrl + "/lootbox/" + name + "/history";

export const postDigitLearnUrl = backendUrl + "/neuron/save";
export const postTrainNeuron = backendUrl + "/neuron/train";
export const postGuessDigit = backendUrl + "/neuron/guess";

export const getAdminUsersUrl = backendUrl + "/admin/users";
export const getAdminUserDetailsUrl = (name) => backendUrl + "/admin/" + name;
export const getAdminLootboxList = backendUrl + "/admin/lootbox";
export const getAdminLootboxMarkReceived =
	backendUrl + "/admin/lootbox/receive";
