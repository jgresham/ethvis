class ConsensusAPI {
  endpoint: string
  private _isConnected: boolean | undefined

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  changeEndpoint = (endpoint: string) => {
    this.endpoint = endpoint
  }

  callFetch = async (apiRoute: string) => {
    const response = await fetch(this.endpoint + apiRoute, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  }

  isConnected = async () => {
    if (this._isConnected === undefined) {
      await this.getNodeInfo()
    }
    return this._isConnected
  }

  /*
   * Config APIs
   */
  getConfigSpec = async () => {
    return await this.callFetch('/eth/v1/config/spec')
  }

  getConfigForkSchedule = async () => {
    return await this.callFetch('/eth/v1/config/fork_schedule')
  }

  getConfigDepositContract = async () => {
    return await this.callFetch('/eth/v1/config/eth/v1/config/deposit_contract')
  }

  /*
   * Node APIs
   */
  getNodeInfo = async () => {
    try {
      const responseJson = await this.callFetch('/eth/v1/node/version')
      this._isConnected = true
      const json = responseJson
      return json.data.version
    } catch (e) {
      this._isConnected = false
    }
  }
  getNodeIdentity = async () => {
    return await this.callFetch('/eth/v1/node/identity')
  }
  getNodePeers = async () => {
    return await this.callFetch('/eth/v1/node/peers')
  }
  getNodeSyncing = async () => {
    return await this.callFetch('/eth/v1/node/syncing')
  }
  getNodeHealth = async () => {
    return await this.callFetch('/eth/v1/node/health')
  }

  /*
   * Beacon APIs
   */
  getGenesis = async () => {
    return await this.callFetch('/eth/v1/beacon/genesis')
  }

  getBlock = async (blockId: string) => {
    return await this.callFetch('/eth/v1/beacon/blocks/' + blockId)
  }
}

export default ConsensusAPI
