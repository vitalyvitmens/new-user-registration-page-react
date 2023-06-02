import { useState, useRef } from 'react'
import Select from 'react-select'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './app.module.css'
// import logo from './logo.svg'
// import PropTypes from 'prop-types'
// import { useState } from 'react'

//! Котролируемое поле формы imput в react
// export const App = () => {
// 	const [value, setValue] = useState('')
// 	return (
// 		<div className={styles.app}>
// 			<input
// 				type="text"
// 				value={value}
// 				onChange={({ target }) => setValue(target.value)}
// 			/>
// 		</div>
// 	)
// }

//! Не котролируемое поле формы imput в react
// export const App = () => {
// 	return (
// 		<div className={styles.app}>
// 			<input type="text" />
// 		</div>
// 	)
// }

//! Котроль поля imput при помощи css см. app.module.css
// export const App = () => {
// 	return (
// 		<div className={styles.app}>
// 			<input type="checkbox" />
// 			<div className={styles.content}>Любой контент</div>
// 		</div>
// 	)
// }

//! Хранение состояния формы в котором больше 1 поля:
//! 1). Создание состояний для каждого поля
// const sendData = (formData) => {
// 	console.log(formData)
// }

// export const App = () => {
// 	const [email, setEmail] = useState('')
// 	const [login, setLogin] = useState('')
// 	const [password, setPassword] = useState('')

// 	const onSubmit = (e) => {
// 		e.preventDefault()
// 		sendData({ email, login, password })
// 	}

// 	return (
// 		<div className={styles.app}>
// 			<form onSubmit={onSubmit}>
// 				<input
// 					type="email"
// 					name="email"
// 					value={email}
// 					placeholder="Почта"
// 					onChange={({ target }) => setEmail(target.value)}
// 				/>
// 				<input
// 					type="text"
// 					name="login"
// 					value={login}
// 					placeholder="Логин"
// 					onChange={({ target }) => setLogin(target.value)}
// 				/>
// 				<input
// 					type="password"
// 					name="password"
// 					value={password}
// 					placeholder="Пароль"
// 					onChange={({ target }) => setPassword(target.value)}
// 				/>
// 				<button type="submit">Отправить</button>
// 			</form>
// 		</div>
// 	)
// }

//! 2). Создание одного состояния с объектом для всех полей (оптимальный вариант)
// const initialState = {
// 	email: '',
// 	login: '',
// 	password: '',
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

// 	const { email, login, password } = getState()

// 	const onChange = ({ target }) => upDateState(target.name, target.value)

// 	return (
// 		<div className={styles.app}>
// 			<form onSubmit={onSubmit}>
// 				<input
// 					type="email"
// 					name="email"
// 					value={email}
// 					placeholder="Почта"
// 					onChange={onChange}
// 				/>
// 				<input
// 					type="text"
// 					name="login"
// 					value={login}
// 					placeholder="Логин"
// 					onChange={onChange}
// 				/>
// 				<input
// 					type="password"
// 					name="password"
// 					value={password}
// 					placeholder="Пароль"
// 					onChange={onChange}
// 				/>
// 				<button type="reset" onClick={resetState}>Сброс</button>
// 				<button type="submit">Отправить</button>
// 			</form>
// 		</div>
// 	)
// }

//! Создание контроллируемого (с атрибутами value и onChange) одиночного селекта и мульти селекта
// export const App = () => {
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
const fieldScheme = yup.object().shape({
	login: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчеркивание.'
		)
		.max(20, 'Неверный логин. Допустимое количество символов не более 20.')
		.min(3, 'Неверный логин. Допустимое количество символов не менее 3.'),
})

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
		},
		resolver: yupResolver(fieldScheme),
	})

	const loginError = errors.login?.message

	const sendFormData = (formData) => {
		console.log(formData)
	}

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(sendFormData)}>
				{loginError && <div className={styles.errorLabel}>{loginError}</div>}
				<input name="login" type="text" {...register('login')} />
				<button type="submit" disabled={!!loginError}>
					Отправить
				</button>
			</form>
		</div>
	)
}
