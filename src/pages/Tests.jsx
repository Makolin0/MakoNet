import { useEffect, useState } from "react";

export default function TestsPage() {
	const [text, setText] = useState("pobieram");

	useEffect(() => {
		async function getData() {
			const response = await fetch("http://localhost:8080/test");

			const responseData = await response.text();

			console.log("reponse");
			console.log(responseData);
			setText(responseData);
		}
		getData();
	});

	return <div>{text}</div>;
}
