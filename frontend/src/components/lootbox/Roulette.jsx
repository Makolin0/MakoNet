import { useState } from "react";
import LootList from "./LootList";
import classes from "./Roulette.module.css";
import Chances from "./Chances";
import Popup from "../popup/Popup";
import { useLoaderData } from "react-router";
import toast from "react-hot-toast";
import {
	postLootboxDrawDemoUrl,
	postLootboxDrawUrl,
} from "../../data/apiLinks";
import { checkToken, getToken } from "../../data/tokens";

export default function Roulette() {
	const [isAnimated, setIsAnimated] = useState(false);
	const [popupHidden, setPopupHidden] = useState(true);
	const [list, setList] = useState([]);
	const [reward, setReward] = useState("");
	const [historyHidden, setHistoryHidden] = useState(true);
	const [lootboxData, setLootboxData] = useState(useLoaderData());
	const loggedIn = checkToken();

	console.log("roulette");

	const name = lootboxData.name;

	console.log("Lootbox Data", lootboxData);

	async function fetchDraw() {
		if (lootboxData.count <= 0) {
			toast.error("Brak skrzynek!");
			return;
		}
		let response;
		if (loggedIn) {
			response = await fetch(postLootboxDrawUrl(name), {
				method: "POST",
				headers: {
					Authorization: "Bearer " + getToken(),
				},
			});
		} else {
			response = await fetch(postLootboxDrawDemoUrl(name), {
				method: "POST",
			});
		}
		if (response.status !== 200) {
			toast.error("Nie udało się pobrać rezultatu");
		} else {
			const responseData = await response.json();
			return responseData;
		}
	}

	async function buttonHandler() {
		if (!isAnimated) {
			const drawResponse = await fetchDraw();
			const drawList = drawResponse.fillerList;
			drawList[2] = drawResponse.reward;

			setList(drawList);
			setReward(drawResponse.reward);
			setIsAnimated(true);
			setTimeout(() => {
				setList([]);
				setIsAnimated(false);
				setPopupHidden(false);
				if (loggedIn) {
					setLootboxData((prev) => {
						return {
							...prev,
							count: prev.count - 1,
							history: [...prev.history, drawResponse.reward],
						};
					});
				}
			}, 11 * 1000);
		}
	}

	return (
		<>
			<Popup
				isHidden={popupHidden}
				onClose={() => setPopupHidden(true)}
				className={classes.reward}
			>
				<h2>Wygrałeś</h2>
				<img src={reward.imageUrl} />
				<h4>{reward.name}</h4>
			</Popup>
			{loggedIn && (
				<Popup isHidden={historyHidden} onClose={() => setHistoryHidden(true)}>
					<div className={classes.history}>
						<h2>Historia</h2>
						{!lootboxData || lootboxData.openedList < 1 ? (
							<p>Pusto</p>
						) : (
							<table>
								<thead>
									<tr>
										<td></td>
										<td>Nagroda</td>
										<td>Rzadkość</td>
										<td>Czas</td>
										<td>Otrzymano</td>
									</tr>
								</thead>
								<tbody>
									{lootboxData.history.map((item, index) => {
										return (
											<tr key={index} style={{ backgroundColor: item.color }}>
												<td>
													<img src={item.imageUrl} />
												</td>
												<td>{item.name}</td>
												<td>{item.rarity}</td>
												<td>{item.dropTime}</td>
												<td>{item.receivedTime || "Jeszcze nie"}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</div>
				</Popup>
			)}

			<Chances rarities={lootboxData.rarities} />
			{loggedIn && (
				<button
					onClick={() => {
						setHistoryHidden(false);
					}}
					className={classes.historyButton}
				>
					Historia
				</button>
			)}

			<div className={classes.draw}>
				<button className={classes.drawButton} onClick={buttonHandler}>
					{isAnimated ? "Losuję..." : "Losuj"}
				</button>

				{loggedIn && (
					<div className={classes.count}>
						zostało {lootboxData ? lootboxData?.count : "X"}
					</div>
				)}
			</div>
			<main className={classes.container}>
				<h1 className={classes.title}>Lootboxy {name}</h1>
				{!loggedIn && <p>Wersja demo (nie zalogowany)</p>}
				<div className={classes.lootContainer}>
					<div className={classes.window}>
						<ol className={isAnimated ? classes.items : undefined}>
							<LootList list={list ? list : []} />
						</ol>
					</div>
				</div>
			</main>
		</>
	);
}
