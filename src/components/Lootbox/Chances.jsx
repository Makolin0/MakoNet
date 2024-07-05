import { useEffect, useState } from "react";
import classes from "./Chances.module.css";
import showLogo from "/arrow-forward.svg";
import { getBackendUrl } from "../../data/urls";

export default function Chances() {
	const [showList, setShowList] = useState(false);
	const [chancesList, setChancesList] = useState(null);
	const hidden = {
		display: "none",
	};
	const rotate = {
		transform: "rotate(180deg)",
	};

	useEffect(() => {
		async function getChances() {
			const response = await fetch(getBackendUrl() + "/lootbox/chances");
			const responseData = await response.json();
			console.log("chances");
			console.log(responseData);
			setChancesList(responseData);
		}
		getChances();
	}, []);

	function buttonHandler() {
		setShowList((prev) => !prev);
	}

	return (
		<section className={classes.sidebar}>
			<div className={classes.list} style={!showList ? hidden : undefined}>
				<ol>
					{chancesList?.map((elem, index) => {
						return (
							<li key={index}>
								<p>{elem.reward}</p>
								<p>{elem.chance.toFixed(2)}%</p>
							</li>
						);
					})}
				</ol>
			</div>
			<button onClick={buttonHandler}>
				<img src={showLogo} alt="show" style={showList ? rotate : undefined} />
			</button>
		</section>
	);
}
