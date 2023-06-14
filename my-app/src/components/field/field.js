import { useState } from 'react'
import { validate } from './utils'
import styles from './field.module.css'

export const Field = ({
	value,
	setValue,
	validators,
	dependencies = [],
	...props
}) => {
	const [error, setError] = useState(null)

	const onChange = ({ target }) => {
		setValue(target.value)
	}

	const onBlur = () => {
		const error = validate(value, validators)
		setError(error)
	}
	return (
		<div>
			<input onChange={onChange} onBlur={onBlur} {...props} />
			{error && <span className={styles.errorLable}>{error}</span>}
		</div>
	)
}
