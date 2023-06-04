import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './react-hook-form-with-yup.module.css'

const fieldScheme = yup.object().shape({
	email: yup
		.string()
		.required('Обязательное поле')
		.min(6, 'Допустимое количество символов не менее 6')
		.max(20, 'Допустимое количество символов не более 20')
		.matches(
			/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
			'Email должен содержать латинские буквы и символы "@" "."'
		),
	password: yup
		.string()
		.required('Обязательное поле')
		.min(3, 'Допустимое количество символов не менее 3')
		.max(20, 'Допустимое количество символов не более 20')
		.matches(
			/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,20}/,
			'Пароль должен содержать от 6 до 20 символов, иметь хотя бы одну цифру, один спецсимвол, одну латинскую букву в нижнем регистре и одну в верхнем регистре'
		),
	repeatPassword: yup
		.string()
		.required('Обязательное поле')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
})

export const ReactHookFormWithYup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(fieldScheme),
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
	})

	const emailError = errors.email?.message
	const passwordError = errors.password?.message
	const repeatPasswordError = errors.repeatPassword?.message

	const onSubmit = ({ email, password }) => {
		console.log({ email, password })
	}

	return (
		<div className={styles.authFormContainer}>
			<p>React Hook Form With Yup</p>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<input
					type="email"
					name="email"
					placeholder="Email"
					{...register('email')}
				/>
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<input
					type="password"
					name="password"
					placeholder="Password"
					{...register('password')}
				/>
				{repeatPasswordError && (
					<div className={styles.errorLabel}>{repeatPasswordError}</div>
				)}
				<input
					type="password"
					name="repeatPassword"
					placeholder="Repeat Password"
					{...register('repeatPassword')}
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
