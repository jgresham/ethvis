import './App.scss'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { Classes } from '@blueprintjs/core'
import ExecutionWS from './ExecutionWS'
import ConsensusAPI from './ConsensusAPI'
import Merge from './Merge'
import Clients from './Clients'
import '@fontsource/open-sans'
import Header from './Header'
import MainContentTabs from './MainContentTabs'
import Constants from './Constants.json'

const DARK_THEME = Classes.DARK
const LIGHT_THEME = ' '

export const executionWS: ExecutionWS = new ExecutionWS(Constants.default_execution_client_http_endpoint)
export const consensusAPI: ConsensusAPI = new ConsensusAPI(Constants.default_consensus_client_http_endpoint)

/** Return the current theme className. */
export function getThemeLocalStorage(): string {
  return localStorage.getItem(Constants.localstorage_darklight_theme_key) || DARK_THEME
}
/** Persist the current theme className in local storage. */
export function setThemeLocalStorage(themeName: string) {
  localStorage.setItem(Constants.localstorage_darklight_theme_key, themeName)
}

export default function App() {
  const [sTheme, setTheme] = useState<string>(getThemeLocalStorage())

  const onToggleTheme = () => {
    const newTheme = sTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME
    setThemeLocalStorage(newTheme)
    setTheme(newTheme)
  }

  return (
    <div className={'App'}>
      <div className={sTheme} style={{ padding: 20, minHeight: '100vh' }}>
        <Header onToggleTheme={onToggleTheme} />
        <Clients consensusAPI={consensusAPI} executionWS={executionWS} />
        <MainContentTabs executionWS={executionWS} />
        {/* <Merge executionWS={executionWS} /> */}
        {/* <ExecutionClientTab executionWS={executionWS} /> */}
      </div>
    </div>
  )
}
