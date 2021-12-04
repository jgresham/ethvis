import styled from 'styled-components/macro'
import { Button } from '@blueprintjs/core'
import Constants from './Constants.json'

const HeaderDiv = styled.div`
  height: 36px;
`

interface HeaderProps {
  onToggleTheme: () => void
}

export default function Header(props: HeaderProps) {
  return (
    <HeaderDiv>
      <span>{Constants.product_name}</span>
      <Button minimal={true} icon={'moon'} onClick={() => props.onToggleTheme()}></Button>
    </HeaderDiv>
  )
}
