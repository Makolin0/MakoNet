import { useState } from "react";
import NumberCanvas from "./NumberCanvas";
import classes from "./NumberRecognition.module.css";

export default function NumberRecognition() {
	const [data, setData] = useState(new Array(40).fill(false));
	const [actualNumber, setActualNumber] = useState(0);

	async function saveToLearn(event) {
		event.preventDefault();
		console.log("current", actualNumber);
		console.log("data", data);

		
	}

	return (
		<main className={classes.container}>
			<h1>Number Recognition</h1>
			<NumberCanvas data={data} setData={setData} />

			<form onSubmit={saveToLearn}>
				<label>Actual digit</label>
				<input
					value={actualNumber}
					onChange={(event) => setActualNumber(event.target.value)}
				/>
				<button type="submit">submit</button>
			</form>
		</main>
	);
}
