import { useEffect, useRef, useState } from 'react'
import { Field } from './components'
import {
	emailValidator,
	passwordMinValidator,
	passwordSymbolsValidator,
} from './validators'
import styles from './app.module.css'

export const App = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passcheck, setPasscheck] = useState('')

	const [isEmailValid, setIsEmailValid] = useState(false)
	const [isPasswordValid, setIsPasswordValid] = useState(false)
	const [isPasscheckValid, setIsPasscheckValid] = useState(false)

	const submitButtonRef = useRef(null)

	const onSubmit = (event) => {
		event.preventDefault()
		console.log({ email, password })
	}

	const isFormValid = isEmailValid && isPasswordValid && isPasscheckValid

	useEffect(() => {
		if (isFormValid) {
			submitButtonRef.current.focus()
		}
	}, [isFormValid])

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
					<form className={styles.form} onSubmit={onSubmit}>
						<Field
							type="email"
							name={email}
							placeholder="Почта..."
							value={email}
							setValue={setEmail}
							setIsValid={setIsEmailValid}
							validators={[emailValidator]}
						/>
						<Field
							type="password"
							name={password}
							placeholder="Пароль..."
							value={password}
							setValue={setPassword}
							setIsValid={setIsPasswordValid}
							validators={[passwordMinValidator, passwordSymbolsValidator]}
						/>
						<Field
							type="password"
							name={passcheck}
							placeholder="Повтор пароля..."
							value={passcheck}
							setValue={setPasscheck}
							setIsValid={setIsPasscheckValid}
							validators={[
								(value) => (value === password ? null : 'Пароли не совпадают'),
							]}
							dependencies={{ password }}
							forceValidation={(value) => value.length > 0}
						/>
						<button
							className={styles.button}
							type="submit"
							disabled={!isFormValid}
							ref={submitButtonRef}
						>
							Зарегистрироваться
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
