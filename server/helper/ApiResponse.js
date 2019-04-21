class ApiResponse {
	buildRes({ data = {}, error = '', code = 200 }) {
		return ({
			code,
			error,
			data
		})
	}
}

module.exports = new ApiResponse()