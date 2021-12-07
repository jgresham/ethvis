import { Tab, Tabs, TabId } from '@blueprintjs/core'
import { useEffect, useState } from 'react'

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
      <Tab id="hm" title="Node" panel={<div>node</div>} />
      <Tab id="ec" title="Network" panel={<div>network</div>} />
      <Tab id="cc" title="Chain" panel={<div>chain</div>} />
    </Tabs>
  )
}
