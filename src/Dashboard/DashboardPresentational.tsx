import { numLocale } from '../utils/stringsAndNums'

interface DashboardPresentationalProps {
  chainId: number
  currBlockNum: number
  currSlotNum: number
  currentTotalTerminalDifficulty: number | undefined
  mergeTotalTerminalDifficulty: number | undefined
}

export default function DashboardPresentational({
  chainId,
  currBlockNum,
  currSlotNum,
  currentTotalTerminalDifficulty,
  mergeTotalTerminalDifficulty,
}: DashboardPresentationalProps) {
  return (
    <div
      className="bp3-running-text bp3-text-large"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Stat label="Chain Id" value={chainId} />
      <Stat label="Block" value={numLocale(currBlockNum)} />
      <Stat label="Slot" value={numLocale(currSlotNum)} />
      <Stat label="TTD" value={numLocale(currentTotalTerminalDifficulty)} />
      <Stat label="Merge @ TTD" value={numLocale(mergeTotalTerminalDifficulty)} />
    </div>
  )
}

function Stat(props: { label: string; value: string | number | undefined }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginTop: 4, marginBottom: 4 }}>{props.label}</h3> <span>{props.value}</span>
    </div>
  )
}
