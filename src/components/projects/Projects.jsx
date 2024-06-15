import Project from "./Project";
import classes from "./Projects.module.css";

export default function Projects() {
	return (
		<main className={classes.container}>
			<h1>My projects</h1>
			<ul className={classes.list}>
				<Project name="lootbox" description="Test test" />
				<Project name="chat" description="Test test" />
			</ul>
		</main>
	);
}
