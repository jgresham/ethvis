import Web3 from 'web3'
import { BlockHeader } from 'web3-eth'
import { Subscription } from 'web3-core-subscriptions'

class ExecutionWS {
  endpoint: string
  web3WebsocketProvider: any | undefined
  web3: Web3 | undefined

  constructor(endpoint: string) {
    this.endpoint = endpoint
    this.connectToClientWS()
  }

  changeEndpoint = (endpoint: string) => {
    this.endpoint = endpoint
    this.connectToClientWS()
  }

  connectToClientWS = async () => {
    // check if already connected
    console.log('ExecutionWS.connectToClientWS() using endpoint: ', this.endpoint)
    try {
      this.web3WebsocketProvider = new Web3.providers.WebsocketProvider(this.endpoint)
      console.log(this.web3WebsocketProvider)
      this.web3 = new Web3(this.web3WebsocketProvider)
      // this.web3.eth.subscribe('logs', { fromBlock: 'latest' }, function (error, result) {
      //   if (!error) {
      //     console.log('subr logs', result)
      //     return
      //   }
      //   console.error('subr logs', error)
      // })
      // this.web3.eth.subscribe('newBlockHeaders', function (error, result) {
      //   if (!error) {
      //     console.log('subr newBlockHeaders', result)
      //     return
      //   }
      //   console.error('subr newBlockHeaders', error)
      // })
      // this.web3.eth.subscribe('syncing', function (error, result) {
      //   if (!error) {
      //     console.log('subr syncing', result)
      //     return
      //   }
      //   console.error('subr syncing', error)
      // })
      console.log('latestblock', await this.web3.eth.getBlock('latest'))
      console.log('connected', this.isConnected())
    } catch (e) {
      console.error('failed to connect', e)
    }
  }

  subscribeToBlockHeaders = (
    listener: (error: any, result: any) => void
  ): Subscription<BlockHeader> | undefined => {
    console.log('subscribeToBlockHeaders start', listener)
    if (this.web3?.eth) {
      return this.web3.eth.subscribe('newBlockHeaders', listener)
    } else {
      console.error('subscribeToBlockHeaders failed. no web3.eth')
    }
  }

  isConnected = async () => {
    return this.web3WebsocketProvider?.connected
  }

  isSyncing = async () => {
    console.log('ExecutionWS isSyncing()')
    if (this.web3?.eth) {
      try {
        const sync = await this.web3.eth.isSyncing()
        console.log('ExecutionWS isSyncing() result', sync)
        return sync
      } catch (e) {
        console.error(e)
      }
    }
    return false
  }

  getLatestBlock = async () => this.getBlock('latest')

  getBlock = async (blockId: string) => {
    if (this.web3?.eth) {
      try {
        return await this.web3.eth.getBlock(blockId)
      } catch (e) {
        console.error(e)
      }
    }
  }

  getNodeInfo = async () => {
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

  getNumOfPendingTransactions = async () => {
    if (this.web3?.eth) {
      try {
        const nodeInfo = await this.web3.eth.getPendingTransactions()
        console.log('getNumOfPendingTransactions: ', nodeInfo.length)
        return nodeInfo.length
      } catch (e) {
        console.error(e)
      }
    }
  }

  getProtocolVersion = async () => {
    console.log('ExecutionWS getProtocolVersion()')
    if (this.web3?.eth) {
      try {
        return await this.web3.eth.getProtocolVersion()
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }

  getDefaultChain = async () => {
    if (this.web3?.eth) {
      try {
        const nodeInfo = await this.web3.eth.defaultChain
        console.log('nodeInfo: ', nodeInfo)
        return nodeInfo
      } catch (e) {
        console.error(e)
      }
    }
  }

  getChainId = async () => {
    if (this.web3?.eth) {
      try {
        const nodeInfo = await this.web3.eth.getChainId()
        console.log('nodeInfo: ', nodeInfo)
        return nodeInfo
      } catch (e) {
        console.error(e)
      }
    }
  }

  getDefaultHardfork = async () => {
    if (this.web3?.eth) {
      try {
        const nodeInfo = await this.web3.eth.defaultHardfork
        console.log('getDefaultHardfork: ', nodeInfo)
        return nodeInfo
      } catch (e) {
        console.error(e)
      }
    }
  }

  isMining = async () => {
    if (this.web3?.eth) {
      try {
        const nodeInfo = await this.web3.eth.isMining()
        return nodeInfo
      } catch (e) {
        console.error(e)
      }
    }
  }

  getHashrate = async () => {
    if (this.web3?.eth) {
      try {
        const nodeInfo = await this.web3.eth.getHashrate()
        return nodeInfo
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export default ExecutionWS
