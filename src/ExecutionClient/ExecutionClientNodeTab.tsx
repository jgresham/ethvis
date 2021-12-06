import { useEffect, useState } from 'react'
import ChainId from '../InfoDialogs/ChainId'

const REFRESH_CLIENT_DATA_INTERVAL = 5000
interface ClientsProps {
  executionWS: any
}

export default function ExecutionClientNodeTab(props: ClientsProps) {
  const [sGasPrice, setGasPrice] = useState<number>()
  const [sLatestBlock, setLatestBlock] = useState<number>()
  const [sNetworkInfo, setNetworkInfo] = useState<any>()
  const [sProtocolVersion, setProtocolVersion] = useState<string>()
  const [sChainId, setChainId] = useState<string>()

  useEffect(() => {
    getProtocolVersion()
    getChainId()
      const interval = setInterval(()=> {
        getGasPrice()
        getLatestBlock()
        getNetworkInfo()
      }, REFRESH_CLIENT_DATA_INTERVAL)
      return () => clearInterval(interval)
  }, [])

  const getChainId = async () => {
    try {
        setChainId(await props.executionWS.getChainId())
    } catch(e){
      setProtocolVersion("unavailable")
    }
}

  const getProtocolVersion = async () => {
      try {
        setProtocolVersion(await props.executionWS.getProtocolVersion())
      } catch(e){
        setProtocolVersion("unavailable")
      }
  }
  const getGasPrice = async () => {
    setGasPrice(await props.executionWS.getGasPrice())
  }
  const getLatestBlock = async () => {
    const latestBlock = await props.executionWS.getLatestBlock()
    if (latestBlock?.number) {
      setLatestBlock(latestBlock.number)
    }
  }

  const getNetworkInfo = async () => {
    setNetworkInfo(await props.executionWS.getNetworkInfo())
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
            <td>Ethereum protocol version</td>
            <td>{sProtocolVersion}</td>
          </tr>
          <tr>
            <td>Chain id <ChainId/></td>
            <td>{sChainId}</td>
          </tr>
          <tr>
            <td>Gas price</td>
            <td>{sGasPrice}</td>
          </tr>
          <tr>
            <td>Latest block</td>
            <td>{sLatestBlock}</td>
          </tr>
          <tr>
            <td>Network Info</td>
            <td>{JSON.stringify(sNetworkInfo)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
