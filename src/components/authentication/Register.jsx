import classes from "./Register.module.css";

export default function Register() {
	return (
		<main className={classes.container}>
			<div className={classes.register}>
				<h1>Register</h1>
				<p>Welcome to my family :3</p>
				<form className={classes.form}>
					{/* <div className={classes.inputContainer}> */}
					<input placeholder="Email" />
					<input placeholder="Password" />
					<input placeholder="Confirm password" />
					<label>
						<input type="checkbox" />
						Are you Sigma?
					</label>
					{/* </div> */}
					<button>Register</button>
				</form>
			</div>
		</main>
	);
}
