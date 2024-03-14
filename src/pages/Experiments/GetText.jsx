import CommunicationGet from "../../components/Experiments/CommunicationGet";
import { useLoaderData, json } from "react-router-dom";

export default function GetTextPage() {
	const data = useLoaderData();
	return <CommunicationGet data={data} />;
}

export async function getTextLoader() {
	const response = await fetch("http://localhost:8080/test");

	if (!response.ok) {
		throw json({ message: "Could not get data" }, { status: 500 });
	}

	return response;
}
