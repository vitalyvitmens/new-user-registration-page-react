import { useState, useRef } from 'react'
import Select from 'react-select'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './app.module.css'
// import logo from './logo.svg'
// import PropTypes from 'prop-types'
// import { useState } from 'react'

const sendData = (formData) => {
	console.log(formData)
}

export const App = () => {
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState(null)
	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState(null)
	const [repeatPassword, setRepeatPassword] = useState('')
	const [repeatPasswordError, setRepeatPasswordError] = useState(null)

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
		if (!/^[\w_]*$/.test(target.value)) {
			error =
				'Неверный Password. Допустимые символы: буквы, цифры и нижнее подчеркивание.'
		} else if (target.value.length > 20) {
			error = 'Неверный Password. Допустимое количество символов не более 20.'
		} else if (target.value.length < 3) {
			error = 'Неверный Password. Допустимое количество символов не менее 3.'
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
		if (target.value !== password) {
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
		<div className={styles.app}>
			<div className={styles.authFormContainer}>
				<p>Registration</p>
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
						name="password"
						value={repeatPassword}
						placeholder="Repeat Password"
						onChange={onRepeatPasswordChange}
					/>

					<button
						className={styles.button}
						type="submit"
						disabled={!!emailError || !!passwordError || !!repeatPasswordError}
					>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</div>
	)
}

//! 2). Создание одного состояния с объектом для всех полей (оптимальный вариант)
// const initialState = {
// 	email: '',
// 	password: '',
// 	repeatPassword: '',
// 	emailError: null,
// }

// const useStore = () => {
// 	const [state, setState] = useState(initialState)

// 	return {
// 		getState: () => state,
// 		upDateState: (fieldName, newValue) => {
// 			setState({ ...state, [fieldName]: newValue })
// 		},
// 		resetState: () => {
// 			setState(initialState)
// 		},
// 	}
// }

// const sendData = (formData) => {
// 	console.log(formData)
// }

// export const App = () => {
// 	const { getState, upDateState, resetState } = useStore()

// 	const onSubmit = (e) => {
// 		e.preventDefault()
// 		sendData(getState())
// 	}

// 	const { email, password, repeatPassword, emailError } = getState()

// 	const onChange = ({ target }) => upDateState(target.name, target.value)

// 	return (
// 		<div className={styles.app}>
// 			<div className={styles.authFormContainer}>
// 				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
// 				<p>Registration</p>
// 				<form className={styles.loginForm} onSubmit={onSubmit}>
// 					<input
// 						type="email"
// 						name="email"
// 						value={email}
// 						placeholder="Email"
// 						onChange={onChange}
// 						// onChange={onEmailChange}
// 						// onBlur={onEmailBlur}
// 					/>
// 					<input
// 						type="password"
// 						name="password"
// 						value={password}
// 						placeholder="Password"
// 						onChange={onChange}
// 					/>
// 					<input
// 						type="password"
// 						name="repeatPassword"
// 						value={repeatPassword}
// 						placeholder="Repeat Password"
// 						onChange={onChange}
// 					/>
// 					<button className={styles.button} type="reset" onClick={resetState}>
// 						Сброс
// 					</button>
// 					<button
// 						className={styles.button}
// 						type="submit"
// 						disabled={!!emailError}
// 					>
// 						Зарегистрироваться
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	)
// }

//! Создание контроллируемого (с атрибутами value и onChange) одиночного селекта и мульти селекта

//  export const App = () => {
// 	const [selectedProduct, setSelectedProduct] = useState('tv')
// 	const [selectedColors, setSelectedColors] = useState(['black', 'silver'])

// 	const onSelectedProductChange = ({ target }) =>
// 		setSelectedProduct(target.value)

// 	const onSelectedColorsChange = ({ target }) => {
// 		const newSelectedColors = [...target.selectedOptions].map(
// 			(selectedTarget) => selectedTarget.value
// 		)
// 		setSelectedColors(newSelectedColors)
// 	}

// 	return (
// 		<div className={styles.app}>
// 			<select value={selectedProduct} onChange={onSelectedProductChange}>
// 				<option value="tv">Телевизор</option>
// 				<option value="smartphone">Смартфон</option>
// 				<option value="laptop">Ноутбук</option>
// 			</select>
// 			<select
// 				multiple={true}
// 				value={selectedColors}
// 				onChange={onSelectedColorsChange}
// 			>
// 				<option value="black">Чёрный</option>
// 				<option value="silver">Серебристый</option>
// 				<option value="white">Белый</option>
// 			</select>
// 		</div>
// 	)
// }

//! Библиотека React Select
//! установи: npm i --save react-select
//! импортируй: import Select from 'react-select'
//! https://react-select.com/props#api
// const productOptions = [
// 	{ value: 'tv', label: 'Телевизор' },
// 	{ value: 'smartphone', label: 'Смартфон' },
// 	{ value: 'laptop', label: 'Ноутбук' },
// ]

// const colorOptions = [
// 	{ value: 'black', label: 'Чёрный' },
// 	{ value: 'silver', label: 'Серебристый' },
// 	{ value: 'white', label: 'Белый' },
// ]

// export const App = () => {
// 	return (
// 		<div className={styles.app}>
// 			<Select options={productOptions} defaultValue={productOptions[0]} />
// 			<Select
// 				isMulti
// 				options={colorOptions}
// 				defaultValue={[colorOptions[0], colorOptions[1]]}
// 			/>
// 		</div>
// 	)
// }

//! Валидация для поля Логин
//! https://regex101.com/
// export const App = () => {
// 	const [login, setLogin] = useState('')
// 	const [loginError, setLoginError] = useState(null)

// 	const onLoginChange = ({ target }) => {
// 		setLogin(target.value)

// 		let error = null
//     // https://regex101.com/
// 		if (!/^[\w_]*$/.test(target.value)) {
// 			error =
// 				'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчеркивание.'
// 		} else if (target.value.length > 20) {
// 			error = 'Неверный логин. Допустимое количество символов не более 20.'
// 		}

// 		setLoginError(error)
// 	}

// 	const onLoginBlur = () => {
// 		if (login.length < 3) {
// 			setLoginError(
// 				'Неверный логин. Допустимое количество символов не менее 3.'
// 			)
// 		}
// 	}

// 	const onSubmit = (e) => {
// 		e.preventDefault()
// 		console.log(login)
// 	}

// 	return (
// 		<div className={styles.app}>
// 			<form onSubmit={onSubmit}>
// 				{loginError && <div className={styles.errorLabel}>{loginError}</div>}
// 				<input
// 					name="Login"
// 					type="text"
// 					value={login}
// 					placeholder="Логин"
// 					onChange={onLoginChange}
//           onBlur={onLoginBlur}
// 				></input>
// 				<button type="submit" disabled={!!loginError}>
// 					Отправить
// 				</button>
// 			</form>
// 		</div>
// 	)
// }

//! Валидация при помощи специального пакета yup
//! установи: npm i yup
//! импортируй: import * as yup from 'yup'
//! https://github.com/jquense/yup#yup
//! useRef 1й пример (перемещение фокуса с инпута на кнопку при длине символов === 20)
// const loginChangeScheme = yup
// 	.string()
// 	.matches(
// 		/^[\w_]*$/,
// 		'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчеркивание.'
// 	)
// 	.max(20, 'Неверный логин. Допустимое количество символов не более 20.')

// const loginBlurScheme = yup
// 	.string()
// 	.min(3, 'Неверный логин. Допустимое количество символов не менее 3.')

// const validateAndGetErrorMessage = (scheme, value) => {
// 	let errorMessage = null

// 	try {
// 		scheme.validateSync(value, { abortEarly: false })
// 	} catch ({ errors }) {
// 		// errorMessage = errors[0]
// 		errorMessage = errors.join('\n')
// 	}

// 	return errorMessage
// }

// export const App = () => {
// 	const [login, setLogin] = useState('')
// 	const [loginError, setLoginError] = useState(null)
// 	const submitButtonRef = useRef(null)

// 	const onLoginChange = ({ target }) => {
// 		setLogin(target.value)

// 		const error = validateAndGetErrorMessage(loginChangeScheme, target.value)

// 		setLoginError(error)

// 		if (target.value.length === 20) {
// 			submitButtonRef.current.focus()
// 		}
// 	}

// 	const onLoginBlur = () => {
// 		const error = validateAndGetErrorMessage(loginBlurScheme, login)

// 		setLoginError(error)
// 	}

// 	const onSubmit = (e) => {
// 		e.preventDefault()
// 		console.log(login)
// 	}

// 	return (
// 		<div className={styles.app}>
// 			<form onSubmit={onSubmit}>
// 				{loginError && <div className={styles.errorLabel}>{loginError}</div>}
// 				<input
// 					name="Login"
// 					type="text"
// 					value={login}
// 					placeholder="Логин"
// 					onChange={onLoginChange}
// 					onBlur={onLoginBlur}
// 				></input>
// 				<button ref={submitButtonRef} type="submit" disabled={!!loginError}>
// 					Отправить
// 				</button>
// 			</form>
// 		</div>
// 	)
// }

//! useRef  2й пример (изменение значения хука useRef не вызывает рендер компонента, в отличии от изменения значения хука useState)
// export const App = () => {
// 	const [stateCounter, setStateCounter] = useState(0)

// 	const incrementStateCounter = () => {
// 		setStateCounter(stateCounter + 1)
// 		console.log('stateCounter:', stateCounter + 1)
// 	}

// 	const refCounter = useRef(0)

// 	const incrementRefCounter = () => {
// 		refCounter.current += 1
// 		console.log('refCounter:', refCounter.current)
// 	}

// 	return (
// 		<div className={styles.app}>
// 			<p>refCounter: {refCounter.current}</p>
// 			<button onClick={incrementRefCounter}>Прибавить: refCounter</button>
// 			<p>stateCounter: {stateCounter}</p>
// 			<button onClick={incrementStateCounter}>Прибавить: stateCounter</button>
// 		</div>
// 	)
// }

//! React Hook Form
//! установи: npm i react-hook-form
//! импортируй: import { useForm } from 'react-hook-form'
//! https://react-hook-form.com/get-started
// export const App = () => {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm({
// 		defaultValues: {
// 			login: '',
// 		},
// 	})

// 	const loginProps = {
// 		minLength: {
// 			value: 3,
// 			message: 'Неверный логин. Допустимое количество символов не менее 3.',
// 		},
// 		maxLength: {
// 			value: 20,
// 			message: 'Неверный логин. Допустимое количество символов не более 20.',
// 		},
// 		pattern: {
// 			value: /^[\w_]*$/,
// 			message:
// 				'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчеркивание.',
// 		},
// 	}

// 	const loginError = errors.login?.message

// 	const sendFormData = (formData) => {
// 		console.log(formData)
// 	}

// 	return (
// 		<div className={styles.app}>
// 			<form onSubmit={handleSubmit(sendFormData)}>
// 				{loginError && <div className={styles.errorLabel}>{loginError}</div>}
// 				<input name="login" type="text" {...register('login', loginProps)} />
// 				<button type="submit" disabled={!!loginError}>
// 					Отправить
// 				</button>
// 			</form>
// 		</div>
// 	)
// }

//! React Hook Form вместе с Yup
//! установи: npm i react-hook-form
//! установи дополнительно: npm install @hookform/resolvers yup
//! import * as yup from 'yup'
//! import { useForm } from 'react-hook-form'
//! import { yupResolver } from '@hookform/resolvers/yup'
//! https://react-hook-form.com/get-started
// const fieldScheme = yup.object().shape({
// 	login: yup
// 		.string()
// 		.matches(
// 			/^[\w_]*$/,
// 			'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчеркивание.'
// 		)
// 		.max(20, 'Неверный логин. Допустимое количество символов не более 20.')
// 		.min(3, 'Неверный логин. Допустимое количество символов не менее 3.'),
// })

// export const App = () => {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm({
// 		defaultValues: {
// 			login: '',
// 		},
// 		resolver: yupResolver(fieldScheme),
// 	})

// 	const loginError = errors.login?.message

// 	const sendFormData = (formData) => {
// 		console.log(formData)
// 	}

// 	return (
// 		<div className={styles.app}>
// 			<form onSubmit={handleSubmit(sendFormData)}>
// 				{loginError && <div className={styles.errorLabel}>{loginError}</div>}
// 				<input name="login" type="text" {...register('login')} />
// 				<button type="submit" disabled={!!loginError}>
// 					Отправить
// 				</button>
// 			</form>
// 		</div>
// 	)
// }
