import '../src/index.scss'
import '../src/App.scss'
import { Classes } from '@blueprintjs/core'

const withThemeProvider = (Story, context) => {
  return (
    <div className={Classes.DARK}>
      <Story {...context} />
    </div>
  )
}
export const decorators = [withThemeProvider]

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }
