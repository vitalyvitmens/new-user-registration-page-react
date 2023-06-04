import { useForm } from 'react-hook-form'
import styles from './react-hook-form.module.css'

export const ReactHookForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
	})

	const emailProps = {
		required: 'Обязательное поле',
		minLength: {
			value: 6,
			message: 'Допустимое количество символов не менее 6',
		},
		maxLength: {
			value: 20,
			message: 'Допустимое количество символов не более 20',
		},
		pattern: {
			value:
				/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
			message: 'Email должен содержать латинские буквы и символы "@" "."',
		},
	}

	const passwordProps = {
		required: 'Обязательное поле',
		minLength: {
			value: 3,
			message: 'Допустимое количество символов не менее 3',
		},
		maxLength: {
			value: 20,
			message: 'Допустимое количество символов не более 20',
		},
		pattern: {
			value:
				/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}/,
			message:
				'Пароль должен содержать от 6 до 20 символов, иметь хотя бы одну цифру, один спецсимвол, одну латинскую букву в нижнем регистре и одну в верхнем регистре',
		},
	}

	const repeatPasswordProps = {
		required: 'Обязательное поле',
		validate: (value) => {
			if (watch('password') !== value) {
				return 'Пароли не совпадают'
			}
		},
	}

	const emailError = errors.email?.message
	const passwordError = errors.password?.message
	const repeatPasswordError = errors.repeatPassword?.message

	const onSubmit = ({ email, password }) => {
		console.log({ email, password })
	}

	return (
		<div className={styles.authFormContainer}>
			<p>React Hook Form</p>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<input
					type="text"
					name="email"
					placeholder="Email"
					{...register('email', emailProps)}
				/>
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<input
					type="password"
					name="password"
					placeholder="Password"
					{...register('password', passwordProps)}
				/>
				{repeatPasswordError && (
					<div className={styles.errorLabel}>{repeatPasswordError}</div>
				)}
				<input
					type="password"
					name="repeatPassword"
					placeholder="Repeat Password"
					{...register('repeatPassword', repeatPasswordProps)}
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
	)
}
