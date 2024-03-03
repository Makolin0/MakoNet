import classes from "./LootList.module.css";

export default function LootList({ list }) {
	return (
		<>
			{list.map((elem, index) => {
				return (
					<li key={index} className={classes.item}>
						{elem}
					</li>
				);
			})}
		</>
	);
}
