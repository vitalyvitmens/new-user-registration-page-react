export const emailMinValidator = (value) =>
	value.length < 6 ? 'Допустимое количество символов не менее 6' : null
