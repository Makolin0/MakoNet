import { redirect } from "react-router";

export function saveToken(token) {
	localStorage.setItem("token", token);
}
export function getToken() {
	return localStorage.getItem("token");
}
export function checkToken() {
	return localStorage.getItem("token") !== null;
}
export function removeToken() {
	localStorage.removeItem("token");
}

export function logoutAction() {
	localStorage.removeItem("token");
	return redirect("/");
}
export function tokenLoader() {
	return getToken();
}
