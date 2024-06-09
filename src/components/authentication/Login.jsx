import classes from "./Login.module.css";

export default function Login() {
	return (
		<main className={classes.container}>
			<form className={classes.form}>
				<h1>Login</h1>
				<div className={classes.inputContainer}>
					<input placeholder="Email" />
					<input placeholder="Password" />
				</div>
				<button>login</button>
			</form>
			<section className={classes.register}>
				<p>No account?</p>
				<button>Register</button>
			</section>
		</main>
	);
}
