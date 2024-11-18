import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";

export default function LootboxList() {
	const lootboxList = useLoaderData();
	console.log("list");
	console.log(lootboxList);

	if (lootboxList === null) {
		return (
			<main className="">
				<h1>Sorry, service is currently unavailable</h1>
			</main>
		);
	}

	return (
		<main className="">
			<h1>choose a lootbox</h1>
			<ol>
				{lootboxList?.map((name, index) => {
					return (
						<li key={index}>
							<Link to={name}>{name}</Link>
						</li>
					);
				})}
			</ol>
		</main>
	);
}
