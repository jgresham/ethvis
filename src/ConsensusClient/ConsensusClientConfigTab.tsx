import { useEffect, useState } from 'react'
import { consensusAPI } from '../App'
import EvJson from '../CommonComponents/EvJson'
import { useAppSelector } from '../state/hooks'
import { selectNumRefreshClientDataInterval } from '../state/settings'

export default function ConsensusClientConfigTab() {
  const [sConfigSpec, setConfigSpec] = useState<any>(undefined)
  const [sConfigForkSchedule, setConfigForkSchedule] = useState<any>(undefined)
  const [sConfigDepositContract, setConfigDepositContract] = useState<any>(undefined)
  const rsNumRefreshClientDataInterval = useAppSelector(selectNumRefreshClientDataInterval)

  useEffect(() => {
    const interval = setInterval(() => {
      getConfigSpec()
      getConfigForkSchedule()
      getConfigDepositContract()
    }, rsNumRefreshClientDataInterval)
    return () => clearInterval(interval)
  }, [])

  const getConfigSpec = async () => {
    try {
      setConfigSpec(await consensusAPI.getConfigSpec())
    } catch (e: any) {
      setConfigSpec({ error: e.toString() })
    }
  }

  const getConfigForkSchedule = async () => {
    try {
      setConfigForkSchedule(await consensusAPI.getConfigForkSchedule())
    } catch (e: any) {
      setConfigForkSchedule({ error: e.toString() })
    }
  }

  const getConfigDepositContract = async () => {
    try {
      setConfigDepositContract(await consensusAPI.getConfigDepositContract())
    } catch (e: any) {
      setConfigDepositContract({ error: e.toString() })
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
            <td>Config spec</td>
            <td>
              <EvJson src={sConfigSpec} />
            </td>
          </tr>
          <tr>
            <td>Config fork schedule</td>
            <td>
              <EvJson src={sConfigForkSchedule} />
            </td>
          </tr>
          <tr>
            <td>Config deposit contract</td>
            <td>
              <EvJson src={sConfigDepositContract} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
