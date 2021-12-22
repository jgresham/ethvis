const execution_clients = ['Geth', 'Nethermind', 'Besu']
const consensus_clients = ['Prysm', 'Lighthouse', 'Teku', 'Lodestar', 'Nimbus']

export const detectExecutionClient = (clientName: string | undefined) => {
  if (clientName === undefined) {
    return 'Execution client'
  }
  const foundClient = execution_clients.find((currEc) => {
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
    return 'Consensus client'
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
