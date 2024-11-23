import { useState } from "react";
import classes from "./Chances.module.css";
import showLogo from "/arrow-forward.svg";

export default function Chances({ rarities }) {
	const [showList, setShowList] = useState(false);
	const hidden = {
		display: "none",
	};
	const rotate = {
		transform: "rotate(180deg)",
	};

	function buttonHandler() {
		setShowList((prev) => !prev);
	}

	return (
		<section className={classes.sidebar}>
			<div className={classes.list} style={!showList ? hidden : undefined}>
				<ol>
					{rarities?.map((rarity, index) => {
						return (
							<li key={index} style={{ backgroundColor: rarity.color }}>
								<div>
									<p>{rarity.name}</p>
									<p>{rarity.chance / 10}%</p>
								</div>
								<ol className={classes.listRewards}>
									{rarity.loot.map((loot, index) => {
										return (
											<li key={index}>
												<img src={loot.imageUrl} alt="img" />
												<p>{loot.name}</p>
											</li>
										);
									})}
								</ol>
							</li>
						);
					})}
				</ol>
			</div>
			<button onClick={buttonHandler}>
				<img src={showLogo} alt="show" style={showList ? rotate : undefined} />
			</button>
		</section>
	);
}
