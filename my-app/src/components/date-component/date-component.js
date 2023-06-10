import { useState } from 'react'
import styles from './date-component.module.css'

const getTimeFromDate = (date) => String(date).substring(16, 24)
const getDayMouthYearFromDate = (date) => String(date).substring(0, 15)

export const DateComponent = () => {
	let [currentDate, setCurrentDate] = useState(new Date())

	setTimeout(() => {
		setCurrentDate(new Date())
	}, 1000)

	return (
		<>
			<div className={styles.red}>{getTimeFromDate(currentDate)}</div>
			<div className={styles.white}>{getDayMouthYearFromDate(currentDate)}</div>
		</>
	)
}
