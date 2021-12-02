const NODE_CLIENT_CL_ENDPOINT = "http://localhost:4000"

export const getNodeInfo = async () => {
	console.log("getting consensus node info")
	const response = await fetch(NODE_CLIENT_CL_ENDPOINT + "/eth/v1/node/version", {
		headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
	})
	return response.json()
}