
export const responseProcessor = (onOk, onFail) => response => {
	if (response.ok) {
		onOk(response.data)
	} else {
		onFail(getFailure(response))
	}
}

export const getFailure = (response) => {
	if (response.problem) return response.problem
	if (response.originalError) return response.originalError
	if (response.status !== 200) return `Error ${response.status}`
	return 'A problem occurred'
}
