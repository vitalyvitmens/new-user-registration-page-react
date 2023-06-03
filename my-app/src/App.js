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
			<div className={styles.app}>
				<Registration />
				<Yup />
				<ReactHookForm />
				<ReactHookFormWithYup />
			</div>
		</>
	)
}
