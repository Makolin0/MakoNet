import { useEffect, useState } from "react";
import classes from "./Chances.module.css";
import showLogo from "/arrow-forward.svg";
import { getBackendUrl } from "../../data/urls";

export default function Chances({ lootboxName }) {
	const [showList, setShowList] = useState(false);
	const [chancesList, setChancesList] = useState(null);
	const hidden = {
		display: "none",
	};
	const rotate = {
		transform: "rotate(180deg)",
	};

	useEffect(() => {
		console.log(getBackendUrl() + "/lootbox/chances/" + lootboxName);
		async function getChances() {
			const response = await fetch(
				getBackendUrl() + "/lootbox/chances/" + lootboxName
			);
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
					{chancesList?.map((elem) => {
						return (
							<>
								<div>
									<p>{elem.rarity}</p>
									<p>{elem.chance.toFixed(2)}%</p>
								</div>
								<ol className={classes.listRewards}>
									{elem.possibleRewards.map((reward, index) => {
										return <li key={index}>{reward}</li>;
									})}
								</ol>
							</>
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
