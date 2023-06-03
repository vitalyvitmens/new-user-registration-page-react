import { Registration, ReactHookForm, Yup } from './components'
import styles from './app.module.css'

export const App = () => {
	return (
		<>
			<div className={styles.app}>
				<Registration />
				<ReactHookForm />
				<Yup />
			</div>
		</>
	)
}
