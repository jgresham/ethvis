import './App.scss'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { Classes } from '@blueprintjs/core'
import ExecutionWS from './ExecutionWS'
import ConsensusAPI from './ConsensusAPI'
import Merge from './Merge'
import Clients from './Clients'
import '@fontsource/open-sans'
import ExecutionClientTab from './ExecutionClientTab'
import Header from './Header'
import MainContentTabs from './MainContentTabs'

const DARK_THEME = Classes.DARK
const LIGHT_THEME = ''
const THEME_LOCAL_STORAGE_KEY = 'blueprint-docs-theme'
const NODE_CLIENT_EL_ENDPOINT = 'ws://localhost:8546'
// const NODE_CLIENT_EL_ENDPOINT = "http://localhost:8545"
const NODE_CLIENT_CL_ENDPOINT = 'http://localhost:4000'

const executionWS: ExecutionWS = new ExecutionWS(NODE_CLIENT_EL_ENDPOINT)
const consensusAPI: ConsensusAPI = new ConsensusAPI(NODE_CLIENT_CL_ENDPOINT)

export default function App() {
  const [sTheme, setTheme] = useState<string>(DARK_THEME)

  return (
    <div className={'App'}>
      <div className={sTheme} style={{ padding: 10, height: '100vh', width: '100vw' }}>
        <Header onToggleTheme={() => (sTheme === DARK_THEME ? setTheme(LIGHT_THEME) : setTheme(DARK_THEME))} />
        <Clients consensusAPI={consensusAPI} executionWS={executionWS} />
        <MainContentTabs />
        {/* <Merge executionWS={executionWS} /> */}
        {/* <ExecutionClientTab executionWS={executionWS} /> */}
      </div>
    </div>
  )
}
