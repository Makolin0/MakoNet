import { useEffect, useRef } from "react";
import classes from "./Popup.module.css";

export default function Popup({ children, isHidden, onClose }) {
	const ref = useRef();

	useEffect(() => {
		if (isHidden) ref.current?.close();
		else ref.current?.showModal();
	}, [isHidden]);

	return (
		<dialog ref={ref} className={classes.dialog} onClose={onClose}>
			{children}
			<form method="dialog" onSubmit={onClose}>
				<button className={classes.closeButton}>Zamknij</button>
			</form>
		</dialog>
	);
}
