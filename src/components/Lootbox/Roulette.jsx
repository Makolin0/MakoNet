import { useState } from "react";
import LootList from "./LootList";
import classes from "./Roulette.module.css";
import generateLoot from "../../functions/generateLoot";
import Chances from "./Chances";

export default function Roulette() {
	const [isAnimated, setIsAnimated] = useState(false);
	const [list, setList] = useState([]);

	function buttonHandler() {
		if (!isAnimated) {
			setList(() => {
				let newList = new Array(200);
				for (let i = 0; i < 200; i++) {
					newList[i] = generateLoot();
				}
				console.log("newList");
				console.log(newList);
				return newList;
			});
			setIsAnimated(true);
		} else {
			setList([]);
			setIsAnimated(false);
		}
	}

	return (
		<main className={classes.container}>
			<Chances />
			<h1 className={classes.title}>Lootboxy</h1>
			<div className={classes.window}>
				<ol className={classes.mark}>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ol>
				<ol className={isAnimated ? classes.items : undefined}>
					<LootList list={list ? list : []} />
				</ol>
			</div>
			<div className={classes.buttoncontainer}>
				<button className={classes.button} onClick={buttonHandler}>
					{isAnimated ? "Reset" : "Losuj"}
				</button>
			</div>
		</main>
	);
}
