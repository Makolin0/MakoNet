import { useState } from "react";
import classes from "./Chances.module.css";
import showLogo from "/arrow-forward.svg";

export default function Chances() {
	const [showList, setShowList] = useState(false);
	const hidden = {
		display: "none",
	};
	const rotate = {
		transform: "rotate(180deg)",
	};

	function buttonHandler() {
		setShowList((prev) => !prev);
	}

	return (
		<section className={classes.sidebar}>
			<div className={classes.list} style={!showList ? hidden : undefined}>
				<ol>
					<li>
						<p>OP</p>
						<p>0,5%</p>
					</li>
					<li>
						<p>OP</p>
						<p>0,5%</p>
					</li>
					<li>
						<p>OP</p>
						<p>0,5%</p>
					</li>
					<li>
						<p>OP</p>
						<p>0,5%</p>
					</li>
					<li>
						<p>OP</p>
						<p>0,5%</p>
					</li>
					<li>
						<p>OP</p>
						<p>0,5%</p>
					</li>
					<li>
						<p>OP</p>
						<p>0,5%</p>
					</li>
					<li>
						<p>OP</p>
						<p>0,5%</p>
					</li>
					<li>
						<p>OP</p>
						<p>0,5%</p>
					</li>
				</ol>
			</div>
			<button onClick={buttonHandler}>
				<img src={showLogo} alt="show" style={showList ? rotate : undefined} />
			</button>
		</section>
	);
}
