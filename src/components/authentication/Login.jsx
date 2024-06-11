import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Pole wymagane").email("Niepoprawny email"),
		password: Yup.string()
			.required("Pole wymagane")
			.min(8, "Hasło za krótkie")
			.max(64, "Hasło za długie"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validateOnChange: true,
		validationSchema: validationSchema,
	});

	return (
		<main className={classes.container}>
			<div className={classes.login}>
				<h1>Login</h1>
				<Form method="POST" className={classes.form}>
					<div className={classes.inputContainer}>
						{formik.errors.email && formik.touched.email && (
							<p className={classes.errorInput}>{formik.errors.email}</p>
						)}
						<input
							id="email"
							name="email"
							type="text"
							placeholder="Email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
						/>
						{formik.errors.password && formik.touched.password && (
							<p className={classes.errorInput}>{formik.errors.password}</p>
						)}
						<input
							id="password"
							name="password"
							type="password"
							placeholder="Password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
						/>
					</div>
					<button type="submit" disabled={!(formik.isValid && formik.dirty)}>
						login
					</button>
				</Form>
			</div>
			<section className={classes.register}>
				<p>No account?</p>
				<Link to="/register" className={classes.registerLink}>
					Register
				</Link>
			</section>
		</main>
	);
}
