import { Tab, Tabs, TabId } from '@blueprintjs/core'
import { useState } from 'react'
import ExecutionClientTabs from './ExecutionClient/ExecutionClientTabs'
import ConsensusClientTabs from './ConsensusClient/ConsensusClientTabs'
import TheMerge from './TheMerge/TheMerge'
import Search from './Seach'
import Dashboard from './Dashboard/Dashboard'
interface MainConentTabsProps {
  executionWS: any
}

export default function MainContentTabs(props: MainConentTabsProps) {
  const [sActiveTab, setActiveTab] = useState<TabId>('db')

  return (
    <Tabs
      id="MainContentTabs"
      selectedTabId={sActiveTab}
      onChange={(tabId: TabId) => setActiveTab(tabId)}
    >
      <Tab id="db" title="Dashboard" panel={<Dashboard />} />
      {/* <Tab id="mg" title="Merge" panel={<TheMerge />} /> */}
      <Tab
        id="ec"
        title="Execution Client"
        panel={<ExecutionClientTabs executionWS={props.executionWS} />}
      />
      <Tab id="cc" title="Consensus Client" panel={<ConsensusClientTabs />} />
      <Tab id="se" title="Search" panel={<Search />} />
    </Tabs>
  )
}
