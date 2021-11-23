import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import {useEffect, useState} from 'react'
import { inspect } from 'util'
import wait from 'wait'

function App() {
  const [sWeb3, setWeb3] = useState(null)
  const [sGasPrice, setGasPrice] = useState(null)
  const [sGasPriceDateTime, setGasPriceDateTime] = useState(null)
  const [sLogs, setLogs] = useState([])

  useEffect(()=> {
    // const ws = new socket.client()
    const web3 = new Web3('ws://localhost:8546');
    // web3.eth.subscribe('logs', {}, (...log) => {
    //   console.log("new log: " , log)
    //   // setLogs(sLogs.concat([log]))
    // })
    setWeb3(web3)
    // ws.connect('ws://localhost:8080/')
  }, [])

  useEffect(() => {
    getGasPrice()
  }, [sWeb3])
  
  const getGasPrice = async () => {
    console.log('waiting for gas price')
    const currGasPrice = await sWeb3.eth.getGasPrice()
    console.log('gas price received: ', currGasPrice)
    setGasPrice(currGasPrice)
    setGasPriceDateTime(new Date())
    await wait(5000)
    getGasPrice()
  }
  return (
    <div className="App">
      <header className="App-header">
        {sGasPrice}
        {sGasPriceDateTime ? sGasPriceDateTime.toString(): null}
      </header>
      <div>
ss */}
        </div>
    </div>
  );
}

export default App;
