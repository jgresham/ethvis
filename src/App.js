import logo from './logo.svg';
import './App.scss';
import Web3 from 'web3'
import {useEffect, useState} from 'react'
import { inspect } from 'util'
import wait from 'wait'
import { Button, Collapse, Pre, Classes } from "@blueprintjs/core";

const DARK_THEME = Classes.DARK
const LIGHT_THEME = ""
const THEME = DARK_THEME
const THEME_LOCAL_STORAGE_KEY = "blueprint-docs-theme"
const NODE_CLIENT_ENDPOINT = "ws://localhost:8546"

function App() {
  const [sWeb3, setWeb3] = useState(null)
  const [sGasPrice, setGasPrice] = useState(null)
  const [sGasPriceDateTime, setGasPriceDateTime] = useState(null)
  const [sLatestBlock, setLatestBlock] = useState(null)
  const [sLatestBlockDateTime, setLatestBlockDateTime] = useState(null)
  const [sLogs, setLogs] = useState([])
  const [sNetworkInfo, setNetworkInfo] = useState(null)
  const [sNetworkInfoDateTime, setNetworkInfoDateTime] = useState(null)
  const [sNodeInfo, setNodeInfo] = useState(null)
  const [sNodeInfoDateTime, setNodeInfoDateTime] = useState(null)

  useEffect(()=> {
    // const ws = new socket.client()
    const web3 = new Web3(NODE_CLIENT_ENDPOINT);
    // web3.eth.subscribe('logs', {}, (...log) => {
    //   console.log("new log: " , log)
    //   // setLogs(sLogs.concat([log]))
    // })
    web3.eth.subscribe('syncing', (error, syncObj) => {
      if(error) {
        console.error("error subscribing to syncing topic", error)
      } else {
        console.log("sync obj", syncObj)
      }
    }).on("data", (syncObj) => {
      console.log("on data: sync obj", syncObj)
    }).on("changed", (syncObj) => {
      console.log("on changed: sync obj", syncObj)
    }) 
    web3.eth.subscribe('pendingTransactions', (error, subscribeResult) => {
      if(error) {
        console.error("error subscribing to pendingTransactions topic", error)
      } else {
        console.log("pendingTransactions subscribeResult", subscribeResult)
      }
    }).on("data", (transaction) => {
      console.log("on data: pendingTransactions", transaction)
    })
    web3.eth.subscribe('newBlockHeaders', (error, subscribeResult) => {
      if(error) {
        console.error("error subscribing to newBlockHeaders topic", error)
      } else {
        console.log("newBlockHeaders subscribeResult", subscribeResult)
      }
    }).on("data", (blockHeader) => {
      console.log("on data: pendingTransactions", blockHeader)
    })
    setWeb3(web3)
  }, [])

  useEffect(() => {
    if(sWeb3) {
      getGasPrice()
      getLatestBlock()
      getNetworkInfo()
      getNodeInfo()
      sWeb3.eth.isSyncing().then(console.log)
    }
  }, [sWeb3])
  
  const getGasPrice = async () => {
    console.log('waiting for gas price')
    if(sWeb3?.eth) {
      const currGasPrice = await sWeb3.eth.getGasPrice() / 1000000000
      console.log('gas price received: ', currGasPrice)
      setGasPrice(currGasPrice)
      setGasPriceDateTime(new Date())
    }
    await wait(10000)
    getGasPrice()
  }
  const getLatestBlock = async () => {
    console.log('waiting for gas price')
    if(sWeb3?.eth) {
      const latestBlock = await sWeb3.eth.getBlock("latest")
      console.log('latest block received: ', latestBlock)
      setLatestBlock(latestBlock.number)
      setLatestBlockDateTime(new Date(latestBlock.timestamp * 1000))
    }
    await wait(10000)
    getLatestBlock()
  }
  const getNetworkInfo = async () => {
    if(sWeb3?.eth) {
      const peerCount = await sWeb3.eth.net.getPeerCount()
      const isListeningForPeers = await sWeb3.eth.net.isListening()
      const networkId = await sWeb3.eth.net.getId()
      const networkType = await sWeb3.eth.net.getNetworkType()
      setNetworkInfo({peerCount, isListeningForPeers, networkId, networkType})
      setNetworkInfoDateTime(new Date())
    }
    await wait(10000)
    getNetworkInfo()
  }
  const getNodeInfo = async () => {
    if(sWeb3?.eth) {
      const nodeInfo = await sWeb3.eth.getNodeInfo()
      setNodeInfo(nodeInfo)
      setNodeInfoDateTime(new Date())
    }
    await wait(10000)
    getNodeInfo()
  }
  return (
    <div className={"App "+ THEME}>
        
        <div className={THEME}>
          <p>
            <strong>node client:</strong> {sNodeInfo}
            <strong> RPC endpoint:</strong> {NODE_CLIENT_ENDPOINT}
          </p>
        <table class="bp3-html-table .modifier">
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
            <td>{sGasPriceDateTime ? sGasPriceDateTime.toString(): null}</td>
          </tr>
          <tr>
            <td>Latest block</td>
            <td>{sLatestBlock}</td>
            <td>{sLatestBlockDateTime ? sLatestBlockDateTime.toString(): null}</td>
          </tr>
          <tr>
            <td>Network Info</td>
            <td>{JSON.stringify(sNetworkInfo)}</td>
            <td>{sNetworkInfoDateTime ? sNetworkInfoDateTime.toString(): null}</td>
          </tr>
        </tbody>
      </table>
      {/* <div>
                <Button onClick={()=>{}}>
                    {"Show"} build logs
                </Button>
                <Collapse isOpen={true}>
                    <Pre>
                        Dummy text.
                    </Pre>
                </Collapse>
            </div> */}
    </div>
    </div>
  );
}

export default App;
