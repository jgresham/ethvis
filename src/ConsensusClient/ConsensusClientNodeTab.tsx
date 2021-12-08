import { useEffect, useState } from 'react'
import Constants from '../Constants.json'
import { consensusAPI } from '../App'
import EvJson from '../CommonComponents/EvJson'

export default function ConsensusClientNodeTab() {
  const [sNodeVersion, setNodeVersion] = useState<string>()
  const [sNodeIdentity, setNodeIdentity] = useState<any>(undefined)
  const [sNodePeers, setNodePeers] = useState<any>(undefined)
  const [sNodeSyncing, setNodeSyncing] = useState<any>(undefined)
  const [sNodeHealth, setNodeHealth] = useState<any>(undefined)

  useEffect(() => {
    const interval = setInterval(() => {
      getNodeVersion()
      getNodeIdentity()
      getNodePeers()
      getNodeSyncing()
      getNodeHealth()
    }, Constants.default_refresh_client_data_interval_ms)
    return () => clearInterval(interval)
  }, [])

  const getNodeVersion = async () => {
    try {
      setNodeVersion(await consensusAPI.getNodeInfo())
    } catch (e: any) {
      setNodeVersion('error: ' + e.toString())
    }
  }

  const getNodeIdentity = async () => {
    try {
      setNodeIdentity(await consensusAPI.getNodeIdentity())
    } catch (e: any) {
      setNodeIdentity({ error: e.toString() })
    }
  }

  const getNodePeers = async () => {
    try {
      setNodePeers(await consensusAPI.getNodePeers())
    } catch (e: any) {
      setNodePeers({ error: e.toString() })
    }
  }

  const getNodeSyncing = async () => {
    try {
      setNodeSyncing(await consensusAPI.getNodeSyncing())
    } catch (e: any) {
      setNodeSyncing({ error: e.toString() })
    }
  }

  const getNodeHealth = async () => {
    try {
      setNodeHealth(await consensusAPI.getNodeHealth())
    } catch (e: any) {
      setNodeHealth({ error: e.toString() })
    }
  }

  return (
    <div>
      <table className="bp3-html-table .modifier">
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Node version</td>
            <td>{sNodeVersion}</td>
          </tr>
          <tr>
            <td>Head block (canonical head in node's view)</td>
            <td>
              <EvJson src={sNodeIdentity} />
            </td>
          </tr>
          <tr>
            <td>Node peers</td>
            <td>
              <EvJson src={sNodePeers} />
            </td>
          </tr>
          <tr>
            <td>Node syncing</td>
            <td>
              <EvJson src={sNodeSyncing} />
            </td>
          </tr>
          <tr>
            <td>Node health</td>
            <td>
              <EvJson src={sNodeHealth} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
