import React from 'react'

import { Clients } from './Clients'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Clients',
  component: Clients,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Clients {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  executionClient: 'Geth/v1.10.12-unstable-893c3721-20211123/linux-amd64/go1.17.3',
  consensusClient: 'Lighthouse/v2.0.1-5c4adce/x86_64-linux',
}
