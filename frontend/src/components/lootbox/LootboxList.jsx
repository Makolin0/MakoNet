import { Link } from "react-router-dom";
import { useLoaderData } from "react-router";
import classes from "./LootboxList.module.css";
import { checkToken } from "../../data/tokens";

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
		<div className={classes.container}>
			<main className={classes.main}>
				<h1>choose a lootbox</h1>
				<ol>
					{lootboxList?.map((lootbox, index) => {
						return (
							<li key={index}>
								{!checkToken() && (
									<Link to={lootbox} className={classes.link}>
										{lootbox}
									</Link>
								)}
								{checkToken() && (
									<Link to={lootbox.name} className={classes.link}>
										{lootbox.name} {lootbox.count}
									</Link>
								)}
							</li>
						);
					})}
				</ol>
			</main>
		</div>
	);
}
