import { Tab, Tabs, TabId } from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import ConsensusClientConfigTab from './ConsensusClientConfigTab'
import ConsensusClientBeaconTab from './ConsensusClientBeaconTab'
import ConsensusClientNodeTab from './ConsensusClientNodeTab'

// interface MainConentTabsProps {}

export default function ConsensusClientTabs() {
  const [sActiveTab, setActiveTab] = useState<TabId>('nd')

  return (
    <Tabs
      id="ConsensusClientTabs"
      selectedTabId={sActiveTab}
      onChange={(tabId: TabId) => setActiveTab(tabId)}
      vertical={true}
    >
      <Tab id="hm" title="Config" panel={<ConsensusClientConfigTab />} />
      <Tab id="bc" title="Beacon" panel={<ConsensusClientBeaconTab />} />
      <Tab id="nd" title="Node" panel={<ConsensusClientNodeTab />} />
      <Tab id="ev" title="Events" panel={<div>Requires implementation from Ethvis</div>} />
    </Tabs>
  )
}
