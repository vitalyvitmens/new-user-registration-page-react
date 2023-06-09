export const validate = (value, validators) => {
	const validationResult = validators.forEach((i) => validators[i](value))
	return validationResult
}
