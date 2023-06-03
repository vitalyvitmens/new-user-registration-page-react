import { useState, useRef } from 'react'
import styles from './registration.module.css'

const sendData = (formData) => {
	console.log(formData)
}

export const Registration = () => {
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState(null)
	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState(null)
	const [repeatPassword, setRepeatPassword] = useState('')
	const [repeatPasswordError, setRepeatPasswordError] = useState(null)

	const submitButtonRef = useRef(null)

	const onEmailChange = ({ target }) => {
		setEmail(target.value)

		let error = null
		if (target.value.length > 20) {
			error = 'Допустимое количество символов не более 20'
		}

		setEmailError(error)
	}

	const onEmailBlur = () => {
		if (email.length < 6) {
			setEmailError('Допустимое количество символов не менее 6')
		} else if (
			!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
				email
			)
		) {
			setEmailError('Email должен содержать латинские буквы и символы "@" "."')
		}
	}

	const onPasswordChange = ({ target }) => {
		setPassword(target.value)

		let error = null
		if (password) {
			if (target.value.length > 20) {
				error = 'Допустимое количество символов не более 20'
			} else if (target.value === repeatPassword) {
				submitButtonRef.current.focus()
			}

			setPasswordError(error)
		}
	}

	const onPasswordBlur = () => {
		if (password) {
			if (password.length < 3) {
				setPasswordError('Допустимое количество символов не менее 3')
			} else if (
				!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}/.test(
					password
				)
			) {
				setPasswordError(
					'Пароль должен содержать от 6 до 20 символов, иметь хотя бы одну цифру, один спецсимвол, одну латинскую букву в нижнем регистре и одну в верхнем регистре'
				)
			}
		}
	}

	const onRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value)

		let error = null
		if (target.value) {
			if (target.value !== password) {
				error = 'Пароли не совпадают'
			} else {
				submitButtonRef.current.focus()
			}

			setRepeatPasswordError(error)
		}
	}

	const onSubmit = (e) => {
		e.preventDefault()
		sendData({ email, password })
	}

	return (
		<div className={styles.authFormContainer}>
			<p>Registration</p>
			<form className={styles.loginForm} onSubmit={onSubmit}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<input
					type="text"
					name="email"
					value={email}
					placeholder="Email"
					onChange={onEmailChange}
					onBlur={onEmailBlur}
				/>
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Password"
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				{repeatPasswordError && (
					<div className={styles.errorLabel}>{repeatPasswordError}</div>
				)}
				<input
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					placeholder="Repeat Password"
					onChange={onRepeatPasswordChange}
				/>
				<button
					className={styles.button}
					ref={submitButtonRef}
					type="submit"
					// disabled={
					// 	!password ||
					// 	password !== repeatPassword ||
					// 	emailError ||
					// 	passwordError
					// }
					disabled={
						!email ||
						!password ||
						password === '' ||
						!repeatPassword ||
						!!emailError ||
						!!passwordError
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	)
}
