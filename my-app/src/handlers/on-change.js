import { validate } from '../utils/validate'
import { emailMaxValidator, passwordMaxValidator } from '../validators'

export const onChange = ({ target }) => {
	if (target.value === 'email') {
		validate('email', [emailMaxValidator])
	} else if (target.value === 'password') {
		validate('password', [passwordMaxValidator])
	} else {
		return
	}
}
