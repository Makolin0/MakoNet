import { useEffect, useState } from "react";
import NumberCanvas from "./NumberCanvas";
import classes from "./NumberRecognition.module.css";
import { postDigitLearnUrl, postTrainNeuron } from "../../data/apiLinks";
import toast from "react-hot-toast";

export default function NumberRecognition() {
	const [drawing, setDrawing] = useState(new Array(40).fill(false));
	// const [actualNumber, setActualNumber] = useState(0);
	const [guessedNumber, setGuessedNumber] = useState(new Array(10).fill(false));
	const [learningData, setLearningData] = useState([]);
	const [showLearningData, setShowLearningData] = useState(false);
	const [trainingData, setTrainingData] = useState({
		epoch: 20,
		learningRate: 0.05,
		randomChance: 0.05,
		randomPixels: 1,
	});

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
	async function trainNeurons(event) {
		event.preventDefault();
		console.log("package", trainingData);

		const response = await fetch(postTrainNeuron, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(trainingData),
		});

		if (response.status !== 200) {
			toast.error("Training error.");
		} else {
			toast.success("Training done.");
		}
	}

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
			<button onClick={()=>setDrawing(new Array(40).fill(false))}>Clear</button>

			<h3>Train</h3>
			<form onSubmit={trainNeurons} className={classes.trainForm}>
				<div>
					<label>Epochs</label>
					<input
						value={trainingData.epoch}
						onChange={(event) =>
							setTrainingData((prev) => ({
								...prev,
								epoch: event.target.value,
							}))
						}
					/>
					<label>Learning rate</label>
					<input
						value={trainingData.learningRate}
						onChange={(event) =>
							setTrainingData((prev) => ({
								...prev,
								learningRate: event.target.value,
							}))
						}
					/>
					<label>Random chance</label>
					<input
						value={trainingData.randomChance}
						onChange={(event) =>
							setTrainingData((prev) => ({
								...prev,
								randomChance: event.target.value,
							}))
						}
					/>
					<label>Random pixels</label>
					<input
						value={trainingData.randomPixels}
						onChange={(event) =>
							setTrainingData((prev) => ({
								...prev,
								randomPixels: event.target.value,
							}))
						}
					/>
				</div>
				<button type="submit">submit</button>
			</form>

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
