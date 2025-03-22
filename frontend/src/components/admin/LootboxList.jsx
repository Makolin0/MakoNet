import { useLoaderData } from "react-router";
import { getToken } from "../../data/tokens";
import { getAdminLootboxMarkReceived } from "../../data/apiLinks";
import toast from "react-hot-toast";
import { useState } from "react";
import classes from "./List.module.css";

export default function LootboxList() {
	const [lootboxList, setLootboxList] = useState(useLoaderData());

	function formatTime(time) {
		return `${time[0]}/${time[1]}/${time[2]} ${time[3]}:${time[4]}:${time[5]} `;
	}

	async function markReceived(id) {
		const token = getToken();
		const response = await fetch(getAdminLootboxMarkReceived, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			body: id,
		});
		if (response.status !== 200) {
			toast.error("Error while sending mark info");
		} else {
			setLootboxList((prev) => {
				let swapped = [...prev];
				swapped.find((x) => x.id === id).received = true;
				return swapped;
			});
		}
	}

	return (
		<main>
			<table className={classes.table}>
				<thead className={classes.head}>
					<tr>
						<td>id</td>
						<td>user</td>
						<td>time</td>
						<td>reward</td>
						<td>rarity</td>
						<td>received</td>
					</tr>
				</thead>
				<tbody className={classes.body}>
					{lootboxList.map((lootbox, index) => {
						return (
							<tr key={index}>
								<td>{lootbox.id}</td>
								<td>{lootbox.user}</td>
								<td>{formatTime(lootbox.drawTime)}</td>
								<td>{lootbox.reward}</td>
								<td>{lootbox.rarity}</td>
								<td>
									{lootbox.received ? (
										"Otrzymane"
									) : (
										<button onClick={() => markReceived(lootbox.id)}>
											received
										</button>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</main>
	);
}
