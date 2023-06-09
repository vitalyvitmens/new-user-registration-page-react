import { useState, useRef } from 'react'
import styles from './registration.module.css'

const initialState = {
	email: '',
	emailError: null,
	password: '',
	passwordError: null,
	repeatPassword: '',
	repeatPasswordError: null,
}

const useStore = () => {
	const [state, setState] = useState(initialState)

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue })
		},
	}
}

const sendData = (formData) => {
	console.log(formData)
}

export const Registration = () => {
	const { getState, updateState } = useStore()

	const {
		email,
		emailError,
		password,
		passwordError,
		repeatPassword,
		repeatPasswordError,
	} = getState()

	const submitButtonRef = useRef(null)

	const onEmailChange = ({ target }) => {
		updateState('email', target.value)

		let error = null
		if (target.value.length > 20) {
			error = 'Допустимое количество символов не более 20'
		}

		updateState('emailError', error)
	}

	const onEmailBlur = () => {
		if (email.length < 6) {
			updateState('emailError', 'Допустимое количество символов не менее 6')
		} else if (
			!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
				email
			)
		) {
			updateState(
				'emailError',
				'Email должен содержать латинские буквы и символы "@" "."'
			)
		}
	}

	const onPasswordChange = ({ target }) => {
		updateState('password', target.value)

		let error = null
		if (password) {
			if (target.value.length > 20) {
				error = 'Допустимое количество символов не более 20'
			} else if (target.value === repeatPassword) {
				submitButtonRef.current.focus()
			}

			updateState('passwordError', error)
		}
	}

	const onPasswordBlur = () => {
		if (password) {
			if (password.length < 3) {
				updateState(
					'passwordError',
					'Допустимое количество символов не менее 3'
				)
			} else if (
				!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}$/.test(
					password
				)
			) {
				updateState(
					'passwordError',
					'Пароль должен содержать от 6 до 20 символов, иметь хотя бы одну цифру, один спецсимвол, одну латинскую букву в нижнем регистре и одну в верхнем регистре'
				)
			}
		}
	}

	const onRepeatPasswordChange = ({ target }) => {
		updateState('repeatPassword', target.value)

		let error = null
		if (target.value) {
			if (target.value !== password) {
				error = 'Пароли не совпадают'
			} else {
				submitButtonRef.current.focus()
			}

			updateState('repeatPasswordError', error)
		}
	}

	const onSubmit = (e) => {
		e.preventDefault()
		sendData(getState())
	}

	return (
		<div className={styles.authFormContainer}>
			<p>Registration</p>
			<form className={styles.form} onSubmit={onSubmit}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<input
					type="email"
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
