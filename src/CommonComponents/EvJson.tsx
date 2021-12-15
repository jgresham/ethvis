import ReactJson, { ReactJsonViewProps } from 'react-json-view'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'

export default function EvJson(props: ReactJsonViewProps) {
  const isDarkMode = useSelector((state: RootState) => state.settings.isDarkMode)
  const jsonTheme = isDarkMode ? 'ocean' : 'rjv-default'
  return (
    <ReactJson
      theme={jsonTheme}
      indentWidth={1}
      displayDataTypes={false}
      collapsed={true}
      name={null}
      {...props}
    />
  )
}
