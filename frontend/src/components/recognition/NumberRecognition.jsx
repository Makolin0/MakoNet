import { useEffect, useState } from "react";
import NumberCanvas from "./NumberCanvas";
import classes from "./NumberRecognition.module.css";
import { postDigitLearnUrl } from "../../data/apiLinks";
import toast from "react-hot-toast";

export default function NumberRecognition() {
	const [drawing, setDrawing] = useState(new Array(40).fill(false));
	// const [actualNumber, setActualNumber] = useState(0);
	const [guessedNumber, setGuessedNumber] = useState(new Array(10).fill(false));
	const [learningData, setLearningData] = useState([]);
	const [showLearningData, setShowLearningData] = useState(false);

	useEffect(() => {
		async function getLearningData() {
			const response = await fetch(postDigitLearnUrl, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status !== 200) {
				toast.error("Could not get learn data");
			} else {
				const data = await response.json();
				console.log(data);
				setLearningData(data);
			}
		}
		getLearningData();
	}, []);

	// async function saveToLearn(event) {
	// 	event.preventDefault();
	// 	const NumberPackage = {
	// 		drawing: drawing,
	// 		number: actualNumber,
	// 	};
	// 	console.log("package", NumberPackage);

	// 	const response = await fetch(postDigitLearnUrl, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(NumberPackage),
	// 	});

	// 	if (response.status !== 200) {
	// 		toast.error("Could not send data");
	// 	} else {
	// 		setLearningData((prev) => {
	// 			const newData = [...prev, NumberPackage];
	// 			return newData;
	// 		});
	// 	}
	// }

	async function guessDigit() {
		console.log(drawing);
		const response = await fetch("http://localhost:8080/neuron/guess", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(drawing),
		});

		if (response.status !== 200) {
			toast.error("Could not send data");
		} else {
			const data = await response.json();
			console.log("data", data);
			setGuessedNumber(data);
		}
	}

	return (
		<main className={classes.container}>
			<h1>Number Recognition</h1>
			<div className={classes.guessContainer}>
				<NumberCanvas data={drawing} setData={setDrawing} />

				{/* <form onSubmit={saveToLearn}>
				<label>Actual digit</label>
				<input
					value={actualNumber}
					onChange={(event) => setActualNumber(event.target.value)}
				/>
				<button type="submit">submit</button>
			</form> */}

				<button onClick={guessDigit}>guess</button>

				<ol className={classes.list}>
					{guessedNumber.map((isIndex, index) => (
						<li key={index}>
							{index}: {isIndex ? "yes" : "no"}
						</li>
					))}
				</ol>
			</div>

			<h3>Learning data</h3>
			<button onClick={() => setShowLearningData((prev) => !prev)}>
				{showLearningData ? "Hide" : "Show"}
			</button>
			{showLearningData && (
				<ol className={classes.dataContainer}>
					{learningData.map((digit, index) => {
						return (
							<li key={index}>
								<NumberCanvas data={digit.drawing} />
								<p>{digit.number}</p>
							</li>
						);
					})}
				</ol>
			)}
		</main>
	);
}
