import { useState } from "react";

import classes from "./ChatSetName.module.css";

export default function ChatSetName({ setNick }) {
	const [typedNick, setTypedNick] = useState("");

	function submitHandler(event) {
		event.preventDefault();
		setNick(typedNick);
	}

	return (
		<form onSubmit={submitHandler} className={classes.container}>
			<h1>Chat</h1>
			<label htmlFor="">Enter your name</label>
			<div className={classes.buttonContainer}>
				<input
					id="nick"
					name="nick"
					value={typedNick}
					onChange={(event) => setTypedNick(event.target.value)}
				/>
				<button className={classes.button}>Enter</button>
			</div>
		</form>
	);
}
