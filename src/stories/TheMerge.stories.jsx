import React from 'react'

import CCountdown from '../TheMerge/Countdown'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Ethvis/TheMerge',
  component: CCountdown,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CCountdown {...args} />

export const Countdown = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Countdown.args = {
  secondsToMerge: 600000,
}
