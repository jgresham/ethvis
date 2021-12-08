import styled from 'styled-components/macro'
import { Button } from '@blueprintjs/core'
import Constants from './Constants.json'
import Clients from './Clients'
import UniButton from './CommonComponents/UniButton'

const HeaderDiv = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

interface HeaderProps {
  onToggleTheme: () => void
}

export default function Header(props: HeaderProps) {
  return (
    <HeaderDiv>
      <span>{Constants.product_name}</span>
      <Button minimal={true} icon={'moon'} onClick={() => props.onToggleTheme()}></Button>
      <div style={{ marginLeft: 'auto' }}>
        <Clients />
      </div>
      <span style={{ marginLeft: 'auto' }}>
        Refreshing data every {Constants.default_refresh_client_data_interval_ms / 1000}s
      </span>
      <UniButton />
    </HeaderDiv>
  )
}
