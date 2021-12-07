class ConsensusAPI {
  endpoint: string
  private _isConnected: boolean | undefined

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  changeEndpoint = (endpoint: string) => {
    this.endpoint = endpoint
  }

  isConnected = async () => {
    if (this._isConnected === undefined) {
      await this.getNodeInfo()
    }
    return this._isConnected
  }

  getNodeInfo = async () => {
    console.log('getting consensus node info')
    try {
      const response = await fetch(this.endpoint + '/eth/v1/node/version', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      this._isConnected = true
      const json = await response.json()
      return json.data.version
    } catch (e) {
      this._isConnected = false
    }
  }

  getNodeConfigSpec = async () => {
    console.log('getting consensus node config spec')
    const response = await fetch(this.endpoint + '/eth/v1/config/spec', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  }
}

export default ConsensusAPI
