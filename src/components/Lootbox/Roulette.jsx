import { useState } from "react";
import LootList from "./LootList";
import classes from "./Roulette.module.css";
import generateLoot from "../../functions/generateLoot";
import Chances from "./Chances";
import Popup from "../popup/Popup";

export default function Roulette() {
	const [isAnimated, setIsAnimated] = useState(false);
	const [popupHidden, setPopupHidden] = useState(true);
	const [list, setList] = useState([]);
	const [reward, setReward] = useState("");

	function buttonHandler() {
		if (!isAnimated) {
			setList(() => {
				let newList = new Array(50);
				for (let i = 0; i < 200; i++) {
					newList[i] = generateLoot();
				}
				setReward(newList[5]);
				return newList;
			});
			setIsAnimated(true);
			setTimeout(() => {
				setList([]);
				setIsAnimated(false);
				setPopupHidden(false);
			}, 11 * 1000);
		}
	}

	return (
		<>
			<Popup isHidden={popupHidden} onClose={() => setPopupHidden(true)}>
				<h2>Wygrałeś</h2>
				<h4>{reward}</h4>
			</Popup>
			<Chances />
			<main className={classes.container}>
				<h1 className={classes.title}>Lootboxy</h1>
				<div className={classes.lootContainer}>
					<button className={classes.drawButton} onClick={buttonHandler}>
						{isAnimated ? "Losuję..." : "Losuj"}
					</button>
					<div className={classes.window}>
						<ol className={isAnimated ? classes.items : undefined}>
							<LootList list={list ? list : []} />
						</ol>
					</div>
					<div className={classes.count}>
						Pozostalo<p>x</p>
					</div>
				</div>
			</main>
		</>
	);
}
