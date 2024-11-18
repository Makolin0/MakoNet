import classes from "./LootList.module.css";

export default function LootList({ list }) {
	return (
		<>
			{list.map((elem, index) => {
				return (
					<li
						key={index}
						className={`${classes.item} ${
							elem.rarity === "LEGENDARY"
								? classes.legend
								: elem.rarity === "RARE"
								? classes.rare
								: elem.rarity === "UNCOMMON"
								? classes.uncommon
								: classes.common
						}`}
					>
						{elem.name}
					</li>
				);
			})}
		</>
	);
}
