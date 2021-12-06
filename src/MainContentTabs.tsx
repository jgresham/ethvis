import { Tab, Tabs, TabId } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import ExecutionClientTabs from './ExecutionClient/ExecutionClientTabs'
import ConsensusClientTabs from './ConsensusClientTabs'
interface MainConentTabsProps {executionWS: any}

export default function MainContentTabs(props: MainConentTabsProps) {
  const [sActiveTab, setActiveTab] = useState<TabId>('ec')

  return (
    <Tabs id="MainContentTabs" selectedTabId={sActiveTab} onChange={(tabId: TabId) => setActiveTab(tabId)}>
      <Tab id="hm" title="Home" panel={<div>home</div>} />
      <Tab id="ec" title="Execution Client" panel={<ExecutionClientTabs executionWS={props.executionWS}/>} />
      <Tab id="cc" title="Consensus Client" panel={<ConsensusClientTabs />} />
    </Tabs>
  )
}
