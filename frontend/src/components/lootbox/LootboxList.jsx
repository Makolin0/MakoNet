import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";

export default function LootboxList() {
	const lootboxList = useLoaderData();
	console.log("list");
	console.log(lootboxList);

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
