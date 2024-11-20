import { useState } from "react";
import LootList from "./LootList";
import classes from "./Roulette.module.css";
import Chances from "./Chances";
import Popup from "../popup/Popup";
import { useLoaderData, useParams } from "react-router";
import toast from "react-hot-toast";
import { getBackendUrl } from "../../data/urls";
import { checkToken, getToken } from "../../data/tokens";

export default function Roulette() {
	const [isAnimated, setIsAnimated] = useState(false);
	const [popupHidden, setPopupHidden] = useState(true);
	const [list, setList] = useState([]);
	const [reward, setReward] = useState("");
	const [historyHidden, setHistoryHidden] = useState(true);
	const [lootboxData, setLootboxData] = useState(useLoaderData());
	const loggedIn = checkToken();

	const params = useParams();
	const lootboxName = params.name;

	console.log("loggedIn");
	console.log(loggedIn);
	console.log("lootboxName");
	console.log(lootboxName);

	function formatTime(time) {
		return `${time[0]}/${time[1]}/${time[2]} ${time[3]}:${time[4]}:${time[5]} `;
	}

	async function fetchDraw() {
		let response;
		if (loggedIn) {
			response = await fetch(getBackendUrl() + "/lootbox", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + getToken(),
				},
			});
		} else {
			response = await fetch(getBackendUrl() + "/lootbox/demo/" + lootboxName, {
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
		if (lootboxData?.available < 1) {
			toast.error("Brak skrzynek");
			return;
		}

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
							available: prev.available - 1,
							openedList: [...prev.openedList, drawResponse.reward],
						};
					});
				}
			}, 11 * 1000);
		}
	}
	console.log(lootboxData);

	return (
		<>
			<Popup
				isHidden={popupHidden}
				onClose={() => setPopupHidden(true)}
				className={classes.reward}
			>
				<h2>Wygrałeś</h2>
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
										<td>Reward</td>
										<td>Time</td>
										<td>Received</td>
									</tr>
								</thead>
								<tbody>
									{lootboxData.openedList.map((item, index) => {
										return (
											<tr key={index}>
												<td>{item.reward}</td>
												<td>{formatTime(item.drawTime)}</td>
												<td>{item.received ? "Yes" : "Not yet"}</td>
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
						{lootboxData ? lootboxData?.available : "X"} left
					</div>
				)}
			</div>
			<main className={classes.container}>
				<h1 className={classes.title}>Lootboxy {lootboxName}</h1>
				{!lootboxData && <p>Wersja demo (Należy się zalogować)</p>}
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
