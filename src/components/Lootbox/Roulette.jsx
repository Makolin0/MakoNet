import { useState } from "react";
import LootList from "./LootList";
import classes from "./Roulette.module.css";
import Chances from "./Chances";
import Popup from "../popup/Popup";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import { getBackendUrl } from "../../data/urls";
import { getToken } from "../../data/tokens";

export default function Roulette() {
	const [isAnimated, setIsAnimated] = useState(false);
	const [popupHidden, setPopupHidden] = useState(true);
	const [list, setList] = useState([]);
	const [reward, setReward] = useState("");
	const [historyHidden, setHistoryHidden] = useState(true);
	const [lootboxData, setLootboxData] = useState(useLoaderData());

	console.log("lootbox data");
	console.log(lootboxData);

	async function fetchDraw() {
		console.log("skibidi");
		const token = getToken();
		const response = await fetch(getBackendUrl() + "/user/lootbox", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		if (response.status !== 200) {
			console.log(response);
			console.log("nie udalo");
			toast.error("Nie udało się pobrać rezultatu");
		} else {
			console.log("udalo sie");
			const responseData = await response.json();
			console.log("Draw");
			console.log(responseData);
			return responseData;
		}
	}

	async function buttonHandler() {
		if (lootboxData?.available < 1) {
			toast.error("Brak skrzynek");
			return;
		}

		if (!isAnimated) {
			const drawResponse = await fetchDraw();
			const drawList = drawResponse.fillerList;
			drawList[5] = drawResponse.reward;
			console.log("modified");
			console.log(drawList);

			setList(drawList);
			setReward(drawResponse.reward);
			setIsAnimated(true);
			setTimeout(() => {
				setList([]);
				setIsAnimated(false);
				setPopupHidden(false);
				setLootboxData((prev) => {
					console.log("prev");
					console.log(prev);
					return {
						available: prev.available - 1,
						openedList: [...prev.openedList, drawResponse.reward],
					};
				});
			}, 11 * 1000);
		}
	}

	return (
		<>
			<Popup isHidden={popupHidden} onClose={() => setPopupHidden(true)}>
				<h2>Wygrałeś</h2>
				<h4>{reward.reward}</h4>
			</Popup>
			<Popup isHidden={historyHidden} onClose={() => setHistoryHidden(true)}>
				<h2>Historia</h2>
				{lootboxData.openedList.length < 1 ? (
					<p>Pusto</p>
				) : (
					<ol>
						{lootboxData.openedList.map((item, index) => (
							<li key={index}>
								{item.reward} {item.rarity}
							</li>
						))}
					</ol>
				)}
			</Popup>
			<Chances />
			<main className={classes.container}>
				<h1 className={classes.title}>Lootboxy</h1>
				{!lootboxData && <p>Wersja demo</p>}
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
						Pozostalo<p>{lootboxData ? lootboxData?.available : "X"}</p>
					</div>
				</div>
				<button
					onClick={() => {
						setHistoryHidden(false);
					}}
				>
					Historia
				</button>
			</main>
		</>
	);
}
