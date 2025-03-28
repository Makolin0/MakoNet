import classes from "./Register.module.css";
import { Form } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Required").email("Wrong email"),
		username: Yup.string()
			.required("Required")
			.min(4, "Minimum 8 characters")
			.max(16, "Maximum 16 characters"),
		password: Yup.string()
			.required("Required")
			.min(8, "Minimum 8 characters")
			.max(32, "Maximum 32 characters")
			.matches(/[a-z]/, "Must contain lowercase letter")
			.matches(/[A-Z]/, "Must contain uppercase letter")
			.matches(/[0-9]/, "Must contain a number"),
		confirmPassword: Yup.string()
			.required("Required")
			.oneOf([Yup.ref("password"), "Passwords must match"]),
	});
	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
		validateOnChange: true,
		validationSchema: validationSchema,
	});

	return (
		<main className={classes.container}>
			<div className={classes.register}>
				<h1>Register</h1>
				<p>Welcome to my family :3</p>
				<Form method="POST" className={classes.form}>
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
					{formik.errors.username && formik.touched.username && (
						<p className={classes.errorInput}>{formik.errors.username}</p>
					)}
					<input
						id="username"
						name="username"
						type="text"
						placeholder="Username"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
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
					{formik.errors.confirmPassword && formik.touched.confirmPassword && (
						<p className={classes.errorInput}>
							{formik.errors.confirmPassword}
						</p>
					)}
					<input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						placeholder="Confirm password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.confirmPassword}
					/>
					<label>
						<input type="checkbox" />
						Are you Sigma?
					</label>
					{/* </div> */}
					<button type="submit" disabled={!(formik.isValid && formik.dirty)}>
						Register
					</button>
				</Form>
			</div>
		</main>
	);
}
