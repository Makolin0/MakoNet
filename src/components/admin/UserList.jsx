import { useLoaderData } from "react-router";
import { getToken } from "../../data/tokens";
import { getBackendUrl } from "../../data/urls";
import toast from "react-hot-toast";
import { useState } from "react";

export default function UserList() {
	const [userList, setUserList] = useState(useLoaderData());

	async function addLootboxes(event) {
		event.preventDefault();
		const amount = Number(event.target.amount.value);
		const id = Number(event.target.id.value);
		const token = getToken();
		const response = await fetch(
			getBackendUrl() + "/admin/lootbox/add?amount=" + amount,
			{
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: id,
			}
		);
		if (response.status !== 200) {
			toast.error("Error while sending mark info");
		} else {
			setUserList((prev) => {
				let swapped = [...prev];
				swapped.find((x) => x.id === id).lootboxes += amount;
				return swapped;
			});
		}
	}

	return (
		<main>
			<table>
				<thead>
					<tr>
						<td>id</td>
						<td>email</td>
						<td>nickname</td>
						<td>role</td>
						<td>lootboxes</td>
						<td>+</td>
					</tr>
				</thead>
				<tbody>
					{userList.map((user, index) => {
						return (
							<tr key={index}>
								<td>{user.id}</td>
								<td>{user.username}</td>
								<td>{user.nickname}</td>
								<td>{user.role}</td>
								<td>{user.lootboxes}</td>
								<td>
									<form onSubmit={addLootboxes}>
										<input name="amount" type="number" placeholder="Amount" />
										<input name="id" defaultValue={user.id} hidden />
										<button type="submit">add</button>
									</form>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</main>
	);
}
