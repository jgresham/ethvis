import { Tooltip2 } from '@blueprintjs/popover2'

interface ConnectableTextProps {
  text?: string
  hoverText?: string
  isConnected?: boolean
}

const GREEN = '#15B371'
const RED = '#F55656'
export default function ConnectableText(props: ConnectableTextProps) {
  const color = props.isConnected ? GREEN : RED
  return (
    <div style={{ fontSize: 16, padding: '1rem' }}>
      <Tooltip2 content={props.hoverText} placement="bottom">
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span style={{ color: color }}>{props.text}</span>
          &ensp;
          <div style={{ height: 8, width: 8, borderRadius: '50%', backgroundColor: color }}></div>
        </div>
      </Tooltip2>
    </div>
  )
}
