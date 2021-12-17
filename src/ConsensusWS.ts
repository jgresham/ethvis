const eventsPath = '/eth/v1/events?topics=block'

export type BlockEvent = {
  slot: string
  block: string
}

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
      if (this.eventSource) {
        this.eventSource.close()
      }
      this.eventSource = new EventSource(this.endpoint)
      console.log(this.eventSource)
      console.log('readyState', this.eventSource.readyState)
      if (this.eventSource) {
        this.eventSource.onerror = (e) => {
          console.error(e)
        }
        // this.eventSource.onmessage = function (message) {
        //   console.log('consensus message: ', message)
        // }
        // this.eventSource.addEventListener('block', this.onEventMessage)
      }
    } catch (e) {
      console.error('failed to connect', e)
    }
  }

  subscribeToBlockEvents = (listener: any) => {
    console.log('subscribeToBlockEvents start', listener)
    if (this.eventSource) {
      this.eventSource.addEventListener('block', listener)
    } else {
      console.error('subscribeToBlockHeaders failed. no eventSource')
    }
  }
  unsubscribeToBlockEvents = (listener: any) => {
    console.log('unsubscribeToBlockEvents', listener)
    if (this.eventSource && listener) {
      this.eventSource.removeEventListener('block', listener)
    } else {
      console.error('unsubscribeToBlockEvents failed. no eventSource')
    }
  }

  private onEventMessage = (message: any) => {
    console.log('esr ', message.data)
  }

  isConnected = async () => {
    return this.eventSource?.readyState
  }
}

export default ConsensusWS
