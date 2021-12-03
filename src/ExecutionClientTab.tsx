import { useEffect, useState } from 'react'
import wait from 'wait'

interface ClientsProps {
  executionWS: any
}

export default function ExecutionClientTab(props: ClientsProps) {
  const [sGasPrice, setGasPrice] = useState<number>()
  const [sGasPriceDateTime, setGasPriceDateTime] = useState<Date>()
  const [sLatestBlock, setLatestBlock] = useState<number>()
  const [sLatestBlockDateTime, setLatestBlockDateTime] = useState<Date>()
  const [sNetworkInfo, setNetworkInfo] = useState<any>()
  const [sNetworkInfoDateTime, setNetworkInfoDateTime] = useState<Date>()

  useEffect(() => {
    getGasPrice()
    getLatestBlock()
    getNetworkInfo()
  }, [])

  const getGasPrice = async () => {
    console.log('waiting for gas price')
    setGasPrice(await props.executionWS.getGasPrice())
    setGasPriceDateTime(new Date())
    await wait(10000)
    getGasPrice()
  }
  const getLatestBlock = async () => {
    console.log('waiting for latest block')
    const latestBlock = await props.executionWS.getLatestBlock()
    if (latestBlock?.number) {
      setLatestBlock(latestBlock.number)
      const latestBlockTimestamp: number =
        typeof latestBlock.timestamp === 'string' ? parseInt(latestBlock.timestamp) : latestBlock.timestamp
      setLatestBlockDateTime(new Date(latestBlockTimestamp * 1000))
    }

    await wait(10000)
    getLatestBlock()
  }

  const getNetworkInfo = async () => {
    console.log('waiting for netowrk info')
    setNetworkInfo(await props.executionWS.getNetworkInfo())
    setNetworkInfoDateTime(new Date())
    await wait(10000)
    getNetworkInfo()
  }

  return (
    <div>
      <table className="bp3-html-table .modifier">
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gas price</td>
            <td>{sGasPrice}</td>
            <td>{sGasPriceDateTime ? sGasPriceDateTime.toString() : null}</td>
          </tr>
          <tr>
            <td>Latest block</td>
            <td>{sLatestBlock}</td>
            <td>{sLatestBlockDateTime ? sLatestBlockDateTime.toString() : null}</td>
          </tr>
          <tr>
            <td>Network Info</td>
            <td>{JSON.stringify(sNetworkInfo)}</td>
            <td>{sNetworkInfoDateTime ? sNetworkInfoDateTime.toString() : null}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
