import classes from "./NumberCanvas.module.css";

export default function NumberCanvas({ data, setData }) {
	function swapField(field) {
		setData((prev) => {
			const newData = [...prev];
			newData[field] = !newData[field];
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
