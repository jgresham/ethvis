import Constants from '../Constants.json'

const execution_clients = ['Geth', 'Nethermind']
const consensus_clients = ['Prysm', 'Lighthouse']

export const detectExecutionClient = (clientName: string | undefined) => {
  if (clientName === undefined) {
    return clientName
  }
  const foundClient = execution_clients.find((currEc, i) => {
    if (clientName.toLowerCase().includes(currEc.toLowerCase())) {
      return currEc
    }
    return false
  })
  if (foundClient) {
    return foundClient
  }
  return clientName
}

export const detectConsensusClient = (clientName: string | undefined) => {
  if (clientName === undefined) {
    return clientName
  }
  const foundClient = consensus_clients.find((currEc, i) => {
    if (clientName.toLowerCase().includes(currEc.toLowerCase())) {
      return currEc
    }
    return false
  })
  if (foundClient) {
    return foundClient
  }
  return clientName
}
