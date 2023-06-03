import * as yup from 'yup'
import { useState, useRef } from 'react'
import styles from './react-hook-form.module.css'

const sendData = (formData) => {
	console.log(formData)
}

const emailChangeScheme = yup
	.string()
	.max(20, 'Допустимое количество символов не более 20')

const emailBlurScheme = yup
	.string()
	.min(6, 'Допустимое количество символов не менее 6')
	.matches(
		/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
		'Email должен содержать латинские буквы и символы "@" "."'
	)

const passwordChangeScheme = yup
	.string()
	.max(20, 'Допустимое количество символов не более 20')

const passwordBlurScheme = yup
	.string()
	.min(3, 'Допустимое количество символов не менее 3')
	.matches(
		/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}/,
		'Пароль должен содержать от 6 до 20 символов, иметь хотя бы одну цифру, один спецсимвол, одну латинскую букву в нижнем регистре и одну в верхнем регистре'
	)

const validateAndGetErrorMessage = (scheme, value) => {
	let errorMessage = null

	try {
		scheme.validateSync(value, { abortEarly: false })
	} catch ({ errors }) {
		errorMessage = errors.join('\n')
	}

	return errorMessage
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

		const error = validateAndGetErrorMessage(emailChangeScheme, target.value)

		setEmailError(error)
	}

	const onEmailBlur = () => {
		const error = validateAndGetErrorMessage(emailBlurScheme, email)

		setEmailError(error)
	}

	const onPasswordChange = ({ target }) => {
		setPassword(target.value)

		const error = validateAndGetErrorMessage(passwordChangeScheme, target.value)

		setPasswordError(error)
	}

	const onPasswordBlur = () => {
		const error = validateAndGetErrorMessage(passwordBlurScheme, password)

		setEmailError(error)
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
			<p>React Hook Form</p>
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
