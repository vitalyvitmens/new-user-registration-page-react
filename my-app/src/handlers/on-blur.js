import { validate } from '../utils/validate'
import {
	emailValidator,
	emailMinValidator,
	passwordSymbolsValidator,
	passwordMinValidator,
} from '../validators'

export const onBlur = ({ target }) => {
	if (target.value === 'email') {
		validate('email', [emailValidator, emailMinValidator])
	} else if (target.value === 'password') {
		validate('password', [passwordSymbolsValidator, passwordMinValidator])
	} else {
		return
	}
}
