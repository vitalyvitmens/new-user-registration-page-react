import { useState, useRef } from 'react'
import styles from './app.module.css'
import { onBlur, onChange, onSubmit } from './handlers'

export const App = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passcheck, setPasscheck] = useState('')

	const [emailError, setEmailError] = useState(null)
	const [passwordError, setPasswordError] = useState(null)
	const [passcheckError, setPasscheckError] = useState(null)

	const isFormValid = !emailError && !passwordError && !passcheckError

	const submitButtonRef = useRef(null)

	return (
		<>
			<div className={styles.header}>
				<h1>
					Добро пожаловать!
					<p className={styles.p}>
						Выберите одну из ниже предложенных форм регистрации!
					</p>
					<p className={styles.p}>
						Ваш выбор очень важен для нас, пожалуйста сделайте выбор!
					</p>
				</h1>
			</div>
			<div className={styles.app}>
				<div className={styles.authFormContainer}>
					<p>Registration</p>
					<form className={styles.form} onSubmit={onSubmit}>
						{emailError && (
							<div className={styles.errorLabel}>{emailError}</div>
						)}
						<input
							type="email"
							name="email"
							value={email}
							placeholder="Email"
							onChange={onChange}
							onBlur={onBlur}
						/>
						{passwordError && (
							<div className={styles.errorLabel}>{passwordError}</div>
						)}
						<input
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={onChange}
							onBlur={onBlur}
						/>
						{passcheck && <div className={styles.errorLabel}>{passcheck}</div>}
						<input
							type="password"
							name="repeatPassword"
							value={passcheck}
							placeholder="Repeat Password"
							onChange={onChange}
						/>
						<button
							className={styles.button}
							ref={submitButtonRef}
							type="submit"
							disabled={!isFormValid}
						>
							Зарегистрироваться
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
