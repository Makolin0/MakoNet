import { FEATURED } from "../../data/FEATURED";
import FeaturedProject from "./FeaturedProject";

import classes from "./FeaturedList.module.css";

const FEATURED_DATA = FEATURED;

export default function FeaturedList() {
	console.log("FEATURED_DATA");
	console.log(FEATURED_DATA);

	return (
		<div className={classes.container}>
			<section className={classes.featured}>
				<h1>Featured Projects</h1>
				<ol className={classes.listContainer}>
					{FEATURED_DATA.map((projectData, index) => {
						console.log("index");
						console.log(index);
						console.log(projectData);
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
		</div>
	);
}
