import classes from "./Popup.module.css";

export default function Popup({ children, isHidden }) {
	return (
		<div className={isHidden ? classes.hidden : classes.background}>
			<div className={classes.popup}>{children}</div>
		</div>
	);
}
