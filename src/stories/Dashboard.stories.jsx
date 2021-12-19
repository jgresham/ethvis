import React from 'react'
import { BlockHeader } from 'web3-eth'

import CDashboardPresentational from '../Dashboard/DashboardPresentational'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'EthVis/Dashboard',
  component: CDashboardPresentational,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CDashboardPresentational {...args} />

export const Dashboard = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const currTimestamp = new Date().getTime()

const blockHeaders = [{ number: 1, timestamp: currTimestamp }]

Dashboard.args = {
  chainId: 13777702,
  currBlockNum: 4507,
  currSlotNum: 230,
  currentTotalTerminalDifficulty: 23120000,
  mergeTotalTerminalDifficulty: 50000000000,
  blockHeaders: blockHeaders,
}
