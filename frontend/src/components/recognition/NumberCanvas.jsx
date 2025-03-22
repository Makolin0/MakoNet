import { useState } from "react";
import classes from "./NumberCanvas.module.css";

export default function NumberCanvas() {
	const [data, setData] = useState(new Array(40).fill(false));

	function swapField(field) {
		setData((prev) => {
			const newData = [...prev];
			newData[field] = !newData[field];
			console.log("current", newData);
			return newData;
		});
	}

	return (
		<ol className={classes.canvas}>
			{data.map((value, index) => {
				return (
					<li
						onClick={() => swapField(index)}
						className={value ? classes.dark : classes.light}
						key={index}
					/>
				);
			})}
		</ol>
	);
}
