import { sendData } from './send-data'

export const onSubmit = (event) => {
	event.preventDefault()
	sendData({event})
}
