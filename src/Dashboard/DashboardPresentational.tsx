import { numLocale } from '../utils/stringsAndNums'
import {
  Cell,
  Column,
  CopyCellsMenuItem,
  IMenuContext,
  SelectionModes,
  Table2,
} from '@blueprintjs/table'
import { HotkeysProvider, Menu } from '@blueprintjs/core'
import { BlockHeader } from 'web3-eth'
import { BlockEvent } from '../ConsensusWS'
import { useEffect } from 'react'
import EvJson from '../CommonComponents/EvJson'
import { Popover2, Popover2InteractionKind } from '@blueprintjs/popover2'
import ETable from '../CommonComponents/ETable'
import { PROPERTIES } from '@blueprintjs/icons/lib/esm/generated/iconNames'

interface DashboardPresentationalProps {
  chainId: number
  currBlockNum: number
  currSlotNum: number
  currentTotalTerminalDifficulty: number | undefined
  mergeTotalTerminalDifficulty: number | undefined
  blockHeaders: BlockHeader[]
  blockEvents: BlockEvent[]
}

const blockEventSlotCellRenderer = (blockEvent: BlockEvent) => <Cell>{blockEvent?.slot}</Cell>
const blockEventBlockHashCellRenderer = (blockEvent: BlockEvent) => <Cell>{blockEvent?.block}</Cell>

const blockNumberCellRenderer = (blockHeader: BlockHeader) => <Cell>{blockHeader?.number}</Cell>
const blockTimeCellRenderer = (blockHeader: BlockHeader) => <Cell>{blockHeader?.timestamp}</Cell>
const jsonCellRenderer = (jsonObj: any) => (
  <Cell>
    <Popover2
      content={<EvJson src={jsonObj} />}
      placement="bottom"
      interactionKind={Popover2InteractionKind.HOVER}
    >
      <>Hover for JSON</>
    </Popover2>
  </Cell>
)

export default function DashboardPresentational({
  chainId,
  currBlockNum,
  currSlotNum,
  currentTotalTerminalDifficulty,
  mergeTotalTerminalDifficulty,
  blockHeaders,
  blockEvents,
}: DashboardPresentationalProps) {
  const isMergeComplete =
    mergeTotalTerminalDifficulty !== undefined &&
    mergeTotalTerminalDifficulty > 0 &&
    currentTotalTerminalDifficulty !== undefined &&
    currentTotalTerminalDifficulty > 0 &&
    currentTotalTerminalDifficulty > mergeTotalTerminalDifficulty
  let mergeLabel = 'Merging @ TTD'
  if (isMergeComplete) {
    mergeLabel = 'Merged @ TTD'
  }

  useEffect(() => {
    console.log('debug getBlockHeaders useEffect blockHeaders', blockHeaders)
  }, [blockHeaders])

  let chainIdLabel
  if (chainId === 1337702) {
    chainIdLabel = 'Kintsugi (Id ' + chainId + ')'
  } else {
    chainIdLabel = chainId
  }

  const getCellClipboardDataBlockHeaders = (rowIndex: number, columnIndex: number) => {
    const blockHeader = blockHeaders[rowIndex]
    if (columnIndex === 0) {
      return blockHeader.number
    } else if (columnIndex === 1) {
      return blockHeader.timestamp
    } else {
      return JSON.stringify(blockHeader)
    }
    return null
  }

  const getCellClipboardDataBlockEvents = (rowIndex: number, columnIndex: number) => {
    const blockEvent = blockEvents[rowIndex]
    if (columnIndex === 0) {
      return blockEvent.slot
    } else if (columnIndex === 1) {
      return blockEvent.block
    } else {
      return JSON.stringify(blockEvent)
    }
    return null
  }

  return (
    <div>
      <div
        className="bp3-running-text bp3-text-large"
        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}
      >
        <Stat label="Chain" value={chainIdLabel} />
        <Stat label="Block" value={numLocale(currBlockNum)} />
        <Stat label="Slot" value={numLocale(currSlotNum)} />
        <Stat label="TTD" value={numLocale(currentTotalTerminalDifficulty)} />
        <Stat label={mergeLabel} value={numLocale(mergeTotalTerminalDifficulty)} />
      </div>
      <div style={{ display: 'flex', height: 300 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: 4, marginBottom: 4 }}>Execution Block Headers</h3>
          <Table2
            numRows={Array.isArray(blockHeaders) ? blockHeaders.length : 0}
            getCellClipboardData={getCellClipboardDataBlockHeaders}
          >
            <Column
              name="Number"
              cellRenderer={(rowIndex: number) => blockNumberCellRenderer(blockHeaders[rowIndex])}
            />
            <Column
              name="Time"
              cellRenderer={(rowIndex: number) => blockTimeCellRenderer(blockHeaders[rowIndex])}
            />
            <Column
              name="JSON"
              cellRenderer={(rowIndex: number) => jsonCellRenderer(blockHeaders[rowIndex])}
            />
          </Table2>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: 4, marginBottom: 4 }}>Consensus Block Events</h3>
          <Table2
            numRows={Array.isArray(blockHeaders) ? blockHeaders.length : 0}
            getCellClipboardData={getCellClipboardDataBlockEvents}
          >
            <Column
              name="Slot"
              cellRenderer={(rowIndex: number) => blockEventSlotCellRenderer(blockEvents[rowIndex])}
            />
            <Column
              name="Block hash"
              cellRenderer={(rowIndex: number) =>
                blockEventBlockHashCellRenderer(blockEvents[rowIndex])
              }
            />
            <Column
              name="JSON"
              cellRenderer={(rowIndex: number) => jsonCellRenderer(blockEvents[rowIndex])}
            />
          </Table2>
        </div>
      </div>
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
