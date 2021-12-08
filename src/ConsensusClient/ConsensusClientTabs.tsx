import { Tab, Tabs, TabId } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import ConsensusClientNodeTab from './ConsensusClientNodeTab'

// interface MainConentTabsProps {}

export default function ConsensusClientTabs() {
  const [sActiveTab, setActiveTab] = useState<TabId>('hm')

  return (
    <Tabs
      id="ConsensusClientTabs"
      selectedTabId={sActiveTab}
      onChange={(tabId: TabId) => setActiveTab(tabId)}
      vertical={true}
    >
      <Tab id="hm" title="Config" panel={<ConsensusClientNodeTab />} />
      <Tab id="bc" title="Beacon" panel={<div>beacon</div>} />
      <Tab id="nd" title="Node" panel={<div>Node</div>} />
      <Tab id="ev" title="Events" panel={<div>Requires implementation from Ethvis</div>} />
    </Tabs>
  )
}
