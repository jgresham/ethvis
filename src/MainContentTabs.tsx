import { Tab, Tabs, TabId } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import ExecutionClientTabs from './ExecutionClientTabs'
import ConsensusClientTabs from './ConsensusClientTabs'
// interface MainConentTabsProps {}

export default function MainContentTabs() {
  const [sActiveTab, setActiveTab] = useState<TabId>('hm')

  return (
    <Tabs id="MainContentTabs" selectedTabId={sActiveTab} onChange={(tabId: TabId) => setActiveTab(tabId)}>
      <Tab id="hm" title="Home" panel={<div>home</div>} />
      <Tab id="ec" title="Execution Client" panel={<ExecutionClientTabs />} />
      <Tab id="cc" title="Consensus Client" panel={<ConsensusClientTabs />} />
    </Tabs>
  )
}
