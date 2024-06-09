import { useEffect, useRef } from "react";
import classes from "./Popup.module.css";

export default function Popup({ children, isHidden }) {
	const ref = useRef();

	useEffect(() => {
		console.log("effect");
		if (isHidden) ref.current?.close();
		else ref.current?.showModal();
	}, [isHidden]);

	return (
		<dialog ref={ref} className={classes.dialog}>
			{children}
		</dialog>
	);
}
