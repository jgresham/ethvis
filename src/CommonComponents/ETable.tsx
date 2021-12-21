import { Column, Table2 } from '@blueprintjs/table'

interface ETableProps {
  data: any[]
}

export default function ETable(props: ETableProps) {
  return (
    <Table2
      enableRowReordering={true}
      //   selectionModes={SelectionModes.ALL}
      // bodyContextMenuRenderer={renderBodyContextMenu}
      //   numRows={Array.isArray(blockHeaders) ? blockHeaders.length : 0}
      // getCellClipboardData={getCellClipboardData}
    >
      {/* <Column
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
      /> */}
    </Table2>
  )
}
