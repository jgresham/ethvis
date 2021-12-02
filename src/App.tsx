import logo from './logo.svg';
import './App.scss';
import Web3 from 'web3'
import {useEffect, useState} from 'react'
import { inspect } from 'util'
import wait from 'wait'
import { Button, Collapse, Pre, Classes } from "@blueprintjs/core";
import * as ConsensusAPI from "./ConsensusAPI"
import { isMergeCompleted } from './isMergeCompleted';
import "@fontsource/open-sans"

const DARK_THEME = Classes.DARK
const LIGHT_THEME = ""
const THEME = DARK_THEME
const THEME_LOCAL_STORAGE_KEY = "blueprint-docs-theme"
const NODE_CLIENT_EL_ENDPOINT = "ws://localhost:8546"
// const NODE_CLIENT_EL_ENDPOINT = "http://localhost:8545"
const NODE_CLIENT_CL_ENDPOINT = "http://localhost:4000"
const NODE_CLIENT_CL_EVENTS_ENDPOINT = NODE_CLIENT_CL_ENDPOINT + "/eth/v1/events"
let eventSource_CL

function App() {
  const [sWeb3, setWeb3] = useState<Web3>()
  const [sGasPrice, setGasPrice] = useState<number>()
  const [sGasPriceDateTime, setGasPriceDateTime] = useState<Date>()
  const [sLatestBlock, setLatestBlock] = useState<number>()
  const [sLatestBlockDateTime, setLatestBlockDateTime] = useState<Date>()
  const [sLogs, setLogs] = useState([])
  const [sNetworkInfo, setNetworkInfo] = useState<any>()
  const [sNetworkInfoDateTime, setNetworkInfoDateTime] = useState<Date>()
  const [sNodeInfo, setNodeInfo] = useState<string>()
  const [sConsensusNodeInfo, setConsensusNodeInfo] = useState<string>()
  const [sConsensusNodeConfigSpec, setConsensusNodeConfigSpec] = useState<any>()
  const [sNodeInfoDateTime, setNodeInfoDateTime] = useState<Date>()
  const [sIsMergeComplete, setIsMergeComplete] = useState<boolean>()

  useEffect(()=> {
    eventSource_CL = new EventSource(NODE_CLIENT_CL_EVENTS_ENDPOINT)
    eventSource_CL.onmessage = (event) => {
      console.log("CL event: ", event)
    }
    getConsensusNodeInfo()
    getConsensusNodeConfigSpec()
    // const ws = new socket.client()
    const web3: Web3 = new Web3(NODE_CLIENT_EL_ENDPOINT);
    // web3.eth.subscribe('logs', {}, (...log) => {
    //   console.log("new log: " , log)
    //   // setLogs(sLogs.concat([log]))
    // })
    web3.eth.subscribe('newBlockHeaders', async (error, blockHeader) => {
      console.log("new block header: " , blockHeader)
      const blockNumber = blockHeader.number
      if(sWeb3 && sWeb3.eth) {
        const latestBlock = await sWeb3.eth.getBlock(blockNumber)
        console.log('latest block from subscribe: ', latestBlock)
      }
      // setLogs(sLogs.concat([log]))
    })
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
      checkLatestBlockToSeeIfMergeIsCompleted()
      sWeb3.eth.isSyncing().then(console.log)
    }
  }, [sWeb3])
  
  const checkLatestBlockToSeeIfMergeIsCompleted = async () => {
    if(sWeb3?.eth) {
      const latestBlock = await sWeb3.eth.getBlock("latest")
      console.log('latest block received: ', latestBlock)
      setIsMergeComplete(isMergeCompleted(latestBlock))
    }
  }

  const getConsensusNodeConfigSpec = async () => {
    console.log("appjs getConsensusNodeInfo")
    const nodeInfo = await ConsensusAPI.getNodeConfigSpec()
    setConsensusNodeConfigSpec(nodeInfo)
  }

  const getConsensusNodeInfo = async () => {
    console.log("appjs getConsensusNodeInfo")
    const nodeInfo = await ConsensusAPI.getNodeInfo()
    setConsensusNodeInfo(nodeInfo.data.version)
  }
  const getGasPrice = async () => {
    console.log('waiting for gas price')
    if(sWeb3?.eth) {
      const currGasPrice = parseInt(await sWeb3.eth.getGasPrice()) / 1000000000
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
      const latestBlockTimestamp: number = typeof latestBlock.timestamp === "string" ? parseInt(latestBlock.timestamp) : latestBlock.timestamp
      setLatestBlockDateTime(new Date(latestBlockTimestamp * 1000))
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
    console.log("trying to get nodeInfo")
    if(sWeb3?.eth) {
      const nodeInfo = await sWeb3.eth.getNodeInfo()
      console.log("nodeInfo: ", nodeInfo)
      setNodeInfo(nodeInfo)
      setNodeInfoDateTime(new Date())
    }
    await wait(10000)
    getNodeInfo()
  }
  return (
    <div className={"App"}>
        
        <div className={THEME}>
          <p>
            <strong>Execution client:</strong> {sNodeInfo}
            <strong>Consensus client:</strong> {sConsensusNodeInfo}
            {/* <strong> RPC endpoint:</strong> {NODE_CLIENT_EL_ENDPOINT} */}
          </p>
          <div>
            <h1>The MERGE</h1>
            {sIsMergeComplete !== null && (<>
            {sIsMergeComplete ? 
            <>
            <h2>IS COMPLETED</h2>
            </>
            : 
            <>
              <h2>COUNTDOWN</h2>
            </>
            }</>)}
          </div>
          <p>
            Merged at Terminal Total Difficulty: {sConsensusNodeConfigSpec?.data?.TERMINAL_TOTAL_DIFFICULTY}
          </p>
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
