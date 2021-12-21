import './App.scss'
import { Classes } from '@blueprintjs/core'
import ExecutionWS from './ExecutionWS'
import ConsensusAPI from './ConsensusAPI'
import ConsensusWS from './ConsensusWS'
import '@fontsource/open-sans'
import Header from './Header/Header'
import MainContentTabs from './MainContentTabs'
import Constants from './Constants.json'
import { useAppSelector } from './state/hooks'
import { selectIsDarkMode } from './state/settings'
import Footer from './Header/Footer'

export const executionWS: ExecutionWS = new ExecutionWS(
  Constants.default_execution_client_websocket_endpoint
)
export const consensusAPI: ConsensusAPI = new ConsensusAPI(
  Constants.default_consensus_client_http_endpoint
)

export const consensusWS: ConsensusWS = new ConsensusWS(
  Constants.default_consensus_client_http_endpoint
)

export default function App() {
  const isDarkMode = useAppSelector(selectIsDarkMode)

  return (
    <div className={'App'}>
      <div
        className={isDarkMode ? Classes.DARK : ''}
        style={{
          padding: 20,
          paddingTop: 0,
          paddingBottom: 0,
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <div style={{ flexGrow: 1 }}>
          <MainContentTabs executionWS={executionWS} />
        </div>
        <Footer />
      </div>
    </div>
  )
}
