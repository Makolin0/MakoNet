import { Navigate, useLoaderData } from "react-router";
import { getToken } from "../../data/tokens";
import { getAdminUserDetailsUrl } from "../../data/apiLinks";
import toast from "react-hot-toast";
import { useState } from "react";
import classes from "./List.module.css";
import Popup from "../popup/Popup";

export default function UserList() {
	const [popupHidden, setPopupHidden] = useState(true);
	const [userList, setUserList] = useState(useLoaderData());
	const [userDetails, setUserDetails] = useState({});

	// async function addLootboxes(event) {
	// 	event.preventDefault();
	// 	const amount = Number(event.target.amount.value);
	// 	const id = Number(event.target.id.value);
	// 	const token = getToken();
	// 	const response = await fetch(
	// 		getBackendUrl() + "/admin/lootbox/add?amount=" + amount,
	// 		{
	// 			method: "POST",
	// 			headers: {
	// 				Authorization: "Bearer " + token,
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: id,
	// 		}
	// 	);
	// 	if (response.status !== 200) {
	// 		toast.error("Error while sending mark info");
	// 	} else {
	// 		setUserList((prev) => {
	// 			let swapped = [...prev];
	// 			swapped.find((x) => x.id === id).lootboxes += amount;
	// 			return swapped;
	// 		});
	// 	}
	// }

	async function checkDetails(name) {
		const token = getToken();
		const response = await fetch(getAdminUserDetailsUrl(name), {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		if (response.status === 200) {
			const responseData = await response.json();
			setUserDetails(responseData);
			setPopupHidden(false);
		} else {
			toast.error("Error while getting user info");
		}
	}

	return (
		<>
			<Popup
				isHidden={popupHidden}
				onClose={() => setPopupHidden(true)}
				className={classes.reward}
			>
				<table>
					<thead>
						<tr>
							<td>nazwa</td>
							<td>ilość</td>
						</tr>
					</thead>
					<tbody>
						{userDetails?.count?.map((lootbox, index) => (
							<tr key={index}>
								<td>{lootbox.name}</td>
								<td>{lootbox.count}</td>
							</tr>
						))}
					</tbody>
				</table>
				<table>
					<thead>
						<tr>
							<td>lootbox</td>
							<td>ikona</td>
							<td>nazwa</td>
							<td>rzadkość</td>
							<td>wylosowano</td>
							<td>otrzymano</td>-
						</tr>
					</thead>
					<tbody>
						{userDetails?.history?.map((reward, index) => (
							<tr key={index}>
								<td>{reward.lootboxName}</td>
								<td>
									<img src={reward.imageUrl} />
								</td>
								<td>{reward.name}</td>
								<td>{reward.rarity}</td>
								<td>{reward.dropTime}</td>
								<td>{reward.receivedTime || "Jeszcze nie"}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Popup>
			<main>
				<table className={classes.table}>
					<thead className={classes.head}>
						<tr>
							<td>username</td>
							<td>email</td>
							<td>roles</td>
						</tr>
					</thead>
					<tbody className={classes.body}>
						{userList.map((user, index) => {
							return (
								<tr key={index} onClick={() => checkDetails(user.email)}>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.roles}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</main>
		</>
	);
}
