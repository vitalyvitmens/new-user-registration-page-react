import { useState, useRef } from 'react'
import styles from './react-hook-form.module.css'

const sendData = (formData) => {
	console.log(formData)
}

export const ReactHookForm = () => {
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
		if (
			!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
				target.value
			)
		) {
			error =
				'Неверный Email. Адрес электронной почты должен содержать латинские буквы и символы "@", "."'
		} else if (target.value.length > 20) {
			error = 'Неверный Email. Допустимое количество символов не более 20.'
		}

		setEmailError(error)
	}

	const onEmailBlur = () => {
		if (email.length < 6) {
			setEmailError(
				'Неверный Email. Допустимое количество символов не менее 6.'
			)
		}
	}

	const onPasswordChange = ({ target }) => {
		setPassword(target.value)

		let error = null
		if (
			!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}/.test(
				target.value
			)
		) {
			error =
				'Пароль должен содержать от 6 до 20 символов, должна быть хотя бы одна цифра, один спецсимвол, одна латинская буква в нижнем регистре и одна латинская буква в верхнем регистре.'
		} else if (target.value.length > 20) {
			error = 'Допустимое количество символов не более 20.'
		} else if (target.value === repeatPassword) {
			submitButtonRef.current.focus()
		}

		setPasswordError(error)
	}

	// const onPasswordBlur = () => {
	// 	if (password.length < 3) {
	// 		setEmailError(
	// 			'Неверный Password. Допустимое количество символов не менее 3.'
	// 		)
	// 	}
	// }

	const onRepeatPasswordChange = ({ target }) => {
		setRepeatPassword(target.value)

		let error = null
		if (target.value === password) {
			submitButtonRef.current.focus()
		} else {
			error = 'Пароли не совпадают'
		}

		setRepeatPasswordError(error)
	}

	// const onPasswordBlur = () => {
	// 	if (password.length < 3) {
	// 		setEmailError(
	// 			'Неверный Password. Допустимое количество символов не менее 3.'
	// 		)
	// 	}
	// }

	const onSubmit = (e) => {
		e.preventDefault()
		sendData({ email, password })
	}

	return (
		<div className={styles.authFormContainer}>
			<p>React Hook Form</p>
			{emailError && <div className={styles.errorLabel}>{emailError}</div>}
			{passwordError && (
				<div className={styles.errorLabel}>{passwordError}</div>
			)}
			{repeatPasswordError && (
				<div className={styles.errorLabel}>{repeatPasswordError}</div>
			)}
			<form className={styles.loginForm} onSubmit={onSubmit}>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Email"
					onChange={onEmailChange}
					onBlur={onEmailBlur}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Password"
					onChange={onPasswordChange}
				/>
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
					disabled={
						!email ||
						!password ||
						password === '' ||
						!repeatPassword ||
						!!emailError ||
						!!passwordError
						// password === '' || password !== repeatPassword
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	)
}
