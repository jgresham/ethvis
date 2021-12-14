import { useEffect, useState } from 'react'
import { consensusAPI } from '../App'
import EvJson from '../CommonComponents/EvJson'
import { useAppSelector } from '../state/hooks'
import { selectNumRefreshClientDataInterval } from '../state/settings'

export default function ConsensusClientBeaconTab() {
  const [sGenesis, setGenesis] = useState<any>(undefined)
  const [sHeadBlock, setHeadBlock] = useState<any>(undefined)
  const rsNumRefreshClientDataInterval = useAppSelector(selectNumRefreshClientDataInterval)

  useEffect(() => {
    const interval = setInterval(() => {
      getGenesis()
      getHeadBlock()
    }, rsNumRefreshClientDataInterval)
    return () => clearInterval(interval)
  }, [])

  const getGenesis = async () => {
    try {
      setGenesis(await consensusAPI.getGenesis())
    } catch (e: any) {
      setGenesis({ error: e.toString() })
    }
  }

  const getHeadBlock = async () => {
    try {
      setHeadBlock(await consensusAPI.getBlock('head'))
    } catch (e: any) {
      setHeadBlock({ error: e.toString() })
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
            <td>Genesis</td>
            <td>
              <EvJson src={sGenesis} />
            </td>
          </tr>
          <tr>
            <td>Head block (canonical head in node's view)</td>
            <td>
              <EvJson src={sHeadBlock} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
