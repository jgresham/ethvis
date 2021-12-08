import { Classes } from '@blueprintjs/core'
import ReactJson, { ReactJsonViewProps } from 'react-json-view'
import { getThemeLocalStorage } from '../App'

export default function EvJson(props: ReactJsonViewProps) {
  const darkLightTheme = getThemeLocalStorage()
  const jsonTheme = darkLightTheme === Classes.DARK ? 'ocean' : 'rjv-default'
  return (
    <ReactJson
      theme={jsonTheme}
      indentWidth={1}
      displayDataTypes={false}
      collapsed={true}
      {...props}
    />
  )
}
