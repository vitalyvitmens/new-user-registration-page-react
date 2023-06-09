export const passwordMaxValidator = (value) =>
	value.length > 20 ? 'Допустимое количество символов не более 20' : null
