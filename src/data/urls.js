export function getBackendUrl() {
	if (import.meta.env.DEV) {
		console.log("http://localhost:8080");
		return "http://localhost:8080";
	} else {
		console.log("https://makonet-backend.onrender.com");
		return "https://makonet-backend.onrender.com";
	}
}
