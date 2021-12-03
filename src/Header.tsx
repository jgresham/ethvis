import styled from 'styled-components/macro'
import { Button } from '@blueprintjs/core'

const HeaderDiv = styled.div`
  height: 36px;
`

interface HeaderProps {
  onToggleTheme: () => void
}

export default function Header(props: HeaderProps) {
  return (
    <HeaderDiv>
      <span>Ethvis</span>
      <Button minimal={true} icon={'moon'} onClick={() => props.onToggleTheme()}></Button>
    </HeaderDiv>
  )
}
