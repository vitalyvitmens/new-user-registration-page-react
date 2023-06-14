import { useState } from 'react'
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

	const [isEmailValide, setIsEmailValide] = useState(false)
	const [isPasswordValide, setIsPasswordValide] = useState(false)
	const [isPasscheckValide, setIsPasscheckValide] = useState(false)

	const isFormValide = isEmailValide && isPasswordValide && isPasscheckValide

	return (
		<div className={styles.app}>
			<div className={styles.authFormContainer}>
				<form className={styles.form}>
					<Field
						type="email"
						name={email}
						placeholder="Почта..."
						value={email}
						setValue={setEmail}
						validators={[emailValidator]}
					/>
					<Field
						type="password"
						name={password}
						placeholder="Пароль..."
						value={password}
						setValue={setPassword}
						validators={[passwordMinValidator, passwordSymbolsValidator]}
					/>
					<Field
						type="password"
						name={passcheck}
						placeholder="Повтор пароля..."
						value={password}
						setValue={setPasscheck}
						validators={[
							(value) => (value === password ? null : 'Пароли не совпадают'),
						]}
						dependencies={['password']}
					/>
					<button
						className={styles.button}
						type="submit"
						disabled={!isFormValide}
					>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</div>
	)
}
