import './App.scss'
import { Classes } from '@blueprintjs/core'
import ExecutionWS from './ExecutionWS'
import ConsensusAPI from './ConsensusAPI'
import ConsensusWS from './ConsensusWS'
import '@fontsource/open-sans'
import Header from './Header'
import MainContentTabs from './MainContentTabs'
import Constants from './Constants.json'
import { useAppSelector } from './state/hooks'
import { selectIsDarkMode } from './state/settings'

export const executionWS: ExecutionWS = new ExecutionWS(
  Constants.default_execution_client_websocket_endpoint
)
export const consensusAPI: ConsensusAPI = new ConsensusAPI(
  Constants.default_beacon_client_http_endpoint
)

export const consensusWS: ConsensusWS = new ConsensusWS(
  Constants.default_beacon_client_http_endpoint
)

export default function App() {
  const isDarkMode = useAppSelector(selectIsDarkMode)

  return (
    <div className={'App'}>
      <div
        className={isDarkMode ? Classes.DARK : ''}
        style={{ padding: 20, paddingTop: 0, minHeight: '100vh', width: '100%' }}
      >
        <Header />
        <MainContentTabs executionWS={executionWS} />
      </div>
    </div>
  )
}
