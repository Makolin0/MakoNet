import { useEffect, useRef } from "react";
import classes from "./Popup.module.css";

export default function Popup({ children, isHidden, onClose, className }) {
	const ref = useRef();

	useEffect(() => {
		if (isHidden) ref.current?.close();
		else ref.current?.showModal();
	}, [isHidden]);

	return (
		<dialog
			ref={ref}
			className={`${classes.dialog} ${className}`}
			onClose={onClose}
		>
			<section>{children}</section>
			<form method="dialog" onSubmit={onClose}>
				<button className={classes.closeButton}>Zamknij</button>
			</form>
		</dialog>
	);
}
