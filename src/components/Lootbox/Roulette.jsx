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


	async function fetchDraw() {
		const token = getToken();
		const response = await fetch(getBackendUrl() + "/user/lootbox", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		if (response.status !== 200) {
			toast.error("Nie udało się pobrać rezultatu");
		} else {
			const responseData = await response.json();
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

			setList(drawList);
			setReward(drawResponse.reward);
			setIsAnimated(true);
			setTimeout(() => {
				setList([]);
				setIsAnimated(false);
				setPopupHidden(false);
				setLootboxData((prev) => {
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
			{lootboxData && (
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
			)}
			<Chances />
			<main className={classes.container}>
				<h1 className={classes.title}>Lootboxy</h1>
				{!lootboxData && <p>Wersja demo(nie działa, trzeba sie zalogować)</p>}
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
				{lootboxData && (
					<button
						onClick={() => {
							setHistoryHidden(false);
						}}
					>
						Historia
					</button>
				)}
			</main>
		</>
	);
}
