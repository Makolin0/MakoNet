import classes from "./LootList.module.css";

export default function LootList({ list }) {
	return (
		<>
			{list.map((loot, index) => {
				return (
					<li
						key={index}
						className={`${classes.item}`}
						style={{ backgroundColor: loot.color }}
					>
						<img src={loot.imageUrl} />
						{loot.name}
					</li>
				);
			})}
		</>
	);
}
