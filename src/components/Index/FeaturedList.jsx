import { FEATURED } from "../../data/FEATURED";
import FeaturedProject from "./FeaturedProject";

import classes from "./FeaturedList.module.css";

const FEATURED_DATA = FEATURED;

export default function FeaturedList() {
	return (
		<>
			<main className={classes.container}>
				<section className={classes.featured}>
					<h1>Featured Projects</h1>
					<ol className={classes.listContainer}>
						{FEATURED_DATA.map((projectData, index) => {
							return (
								<FeaturedProject
									key={index}
									name={projectData.name}
									description={projectData.description}
								/>
							);
						})}
					</ol>
				</section>
			</main>
			<div className={classes.btn}>
				najedz na mnie
				<div className={classes.menu}>
					<button>click</button>
				</div>
			</div>
		</>
	);
}
