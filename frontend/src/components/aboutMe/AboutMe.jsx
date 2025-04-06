import classes from "./AboutMe.module.css";

export default function AboutMe() {
	return (
		<main className={classes.container}>
			<header className={classes.header}>
				<h1>About me</h1>
				<section>
					<div className={classes.description}>
						<h3>Helo there!</h3>
						<h2>I'm Adam</h2>
						<p>
							Computer science a topic that’s always piqued my curiosity, and
							it's really exciting for me. I like to learn everything there is
							to know about computers, and make them do what I want. Currently,
							I’m a student at Nicolaus Copernicus University in Toruń, 1st year
							in Computer Science, master's degree.
						</p>
					</div>
					<img
						className={classes.picture}
						src="me-cool.jpg"
						alt="picture of me"
					/>
				</section>
			</header>
		</main>
	);
}
