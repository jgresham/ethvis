import Web3 from 'web3'

class ExecutionWS {
  endpoint: string
  web3WebsocketProvider: any | undefined
  web3: Web3 | undefined

  constructor(endpoint: string) {
    this.endpoint = endpoint
    this.connectToClientWS()
  }

  connectToClientWS = async () => {
    // check if already connected
    try {
      this.web3WebsocketProvider = new Web3.providers.WebsocketProvider(this.endpoint)
      console.log(this.web3WebsocketProvider)
      this.web3 = new Web3(this.web3WebsocketProvider)
      console.log('latestblock', await this.web3.eth.getBlock('latest'))
      console.log('connected', this.isConnected())
    } catch (e) {
      console.error('failed to connect')
    }
  }

  isConnected = () => {
    return this.web3WebsocketProvider?.connected
  }

  isSyncing = async () => {
    console.log('ExecutionWS isSyncing()')
    if (this.web3?.eth) {
      try {
        return await this.web3.eth.isSyncing()
      } catch (e) {
        console.error(e)
      }
    }
    return false
  }

  getLatestBlock = async () => {
    console.log('ExecutionWS getLatestBlock()')
    if (this.web3?.eth) {
      try {
        return await this.web3.eth.getBlock('latest')
      } catch (e) {
        console.error(e)
      }
    }
  }

  getNodeInfo = async () => {
    console.log('trying to get nodeInfo')
    if (this.web3?.eth) {
      try {
        const nodeInfo = await this.web3.eth.getNodeInfo()
        console.log('nodeInfo: ', nodeInfo)
        return nodeInfo
      } catch (e) {
        console.error(e)
      }
    }
  }

  getGasPrice = async () => {
    console.log('waiting for gas price')
    if (this.web3?.eth) {
      try {
        const currGasPrice = parseInt(await this.web3.eth.getGasPrice()) / 1000000000
        console.log('gas price received: ', currGasPrice)
        return currGasPrice
      } catch (e) {
        console.error(e)
      }
    }
    return undefined
  }

  getNetworkInfo = async () => {
    if (this.web3?.eth) {
      try {
        const peerCount = await this.web3.eth.net.getPeerCount()
        const isListeningForPeers = await this.web3.eth.net.isListening()
        const networkId = await this.web3.eth.net.getId()
        const networkType = await this.web3.eth.net.getNetworkType()
        return { peerCount, isListeningForPeers, networkId, networkType }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default ExecutionWS
