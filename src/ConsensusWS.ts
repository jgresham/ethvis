const eventsPath = '/eth/v1/events?topics=block'

class ConsensusWS {
  endpoint: string
  eventSource: EventSource | undefined

  constructor(endpoint: string) {
    this.endpoint = endpoint + eventsPath
    this.connectToClientWS()
  }

  changeEndpoint = (endpoint: string) => {
    this.endpoint = endpoint + eventsPath
    this.connectToClientWS()
  }

  connectToClientWS = async () => {
    // check if already connected
    console.log('ConsensusWS.connectToClientWS() using endpoint: ', this.endpoint)
    try {
      this.eventSource = new EventSource(this.endpoint)
      console.log(this.eventSource)
      console.log('readyState', this.eventSource.readyState)
      if (this.eventSource) {
        this.eventSource.onerror = (e) => {
          console.error(e)
        }
        this.eventSource.addEventListener('block', this.onEventMessage)
      }
    } catch (e) {
      console.error('failed to connect', e)
    }
  }

  private onEventMessage = (message: any) => {
    console.log('esr ', message.data)
  }

  isConnected = async () => {
    return this.eventSource?.readyState
  }

  //   isSyncing = async () => {
  //     console.log('ExecutionWS isSyncing()')
  //     if (this.web3?.eth) {
  //       try {
  //         return await this.web3.eth.isSyncing()
  //       } catch (e) {
  //         console.error(e)
  //       }
  //     }
  //     return false
  //   }

  //   getLatestBlock = async () => {
  //     if (this.web3?.eth) {
  //       try {
  //         return await this.web3.eth.getBlock('latest')
  //       } catch (e) {
  //         console.error(e)
  //       }
  //     }
  //   }
}

export default ConsensusWS
