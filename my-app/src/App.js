import {
	Registration,
	ReactHookForm,
	Yup,
	ReactHookFormWithYup,
} from './components'
import styles from './app.module.css'

export const App = () => {
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
				<Registration />
				<Yup />
				<ReactHookForm />
				<ReactHookFormWithYup />
			</div>
		</>
	)
}
