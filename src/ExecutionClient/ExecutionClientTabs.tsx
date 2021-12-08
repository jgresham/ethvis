import { Tab, Tabs, TabId } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import ExecutionClientNodeTab from './ExecutionClientNodeTab'

interface ExecutionClientTabsProps {
  executionWS: any
}

export default function ExecutionClientTabs(props: ExecutionClientTabsProps) {
  const [sActiveTab, setActiveTab] = useState<TabId>('hm')

  return (
    <Tabs
      id="ExecutionClientTabs"
      selectedTabId={sActiveTab}
      onChange={(tabId: TabId) => setActiveTab(tabId)}
      vertical={true}
    >
      <Tab id="hm" title="Node" panel={<ExecutionClientNodeTab executionWS={props.executionWS} />} />
      {/* <Tab id="ec" title="Network" panel={<div>network</div>} />
      <Tab id="cc" title="Chain" panel={<div>chain</div>} /> */}
    </Tabs>
  )
}
