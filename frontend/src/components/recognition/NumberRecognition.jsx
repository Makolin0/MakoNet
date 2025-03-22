import NumberCanvas from "./NumberCanvas";
import classes from "./NumberRecognition.module.css";

export default function NumberRecognition() {
	return (
		<main className={classes.container}>
			<h1>Number Recognition</h1>
			<NumberCanvas />
		</main>
	);
}
