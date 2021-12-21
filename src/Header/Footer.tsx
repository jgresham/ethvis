import styled from 'styled-components/macro'
import radicleLogo from '../images/radicle-logo-64x64.png'
import githubLogo from '../images/GitHub-Mark-64px.png'

const FooterDiv = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const HoverImg = styled.img`
  height: 20px;'

`

const Hovera = styled.a`
  &:hover ${HoverImg} {
    height: 26px;
    transform height 0.5s;
    filter: invert(0.5);
    -webkit-filter: invert(0.5);
  }
`

export default function Footer() {
  return (
    <FooterDiv>
      <div style={{ marginLeft: 'auto' }}>
        <Hovera
          href="https://app.radicle.network/projects/rad:git:hnrkk5ho8gjkq889u9dn7qoz8o3kuj6hkoj1o"
          target="_blank"
        >
          <HoverImg src={radicleLogo} alt="radicle logo" />
        </Hovera>
        &nbsp;
        <Hovera href="https://github.com/jgresham/ethvis" target="_blank">
          <HoverImg src={githubLogo} alt="github logo" />
        </Hovera>
      </div>
    </FooterDiv>
  )
}
