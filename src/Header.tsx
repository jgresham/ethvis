import styled from 'styled-components/macro'
import Constants from './Constants.json'
import Clients from './Clients'
import UniButton from './CommonComponents/UniButton'
import mainLogo from './images/ethvislogo.png'
import DarkModeButton from './CommonComponents/DarkModeButton'

const HeaderDiv = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #5c7080;
`

export default function Header() {
  return (
    <HeaderDiv>
      <img src={mainLogo} style={{ height: '100%' }} alt="ethvis logo" />
      <span>{Constants.product_name}</span>
      <div style={{ marginLeft: 'auto' }}>
        <Clients />
      </div>
      <span style={{ marginLeft: 'auto' }}>
        Refreshing data every {Constants.default_refresh_client_data_interval_ms / 1000}s
      </span>
      <div style={{ marginLeft: 'auto', display: 'flex' }}>
        <DarkModeButton />
        <UniButton>Connect Clients</UniButton>
      </div>
    </HeaderDiv>
  )
}
