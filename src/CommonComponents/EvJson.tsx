import { useState } from 'react'
import { Dialog, Button, Classes, Code } from '@blueprintjs/core'
import ReactJson from 'react-json-view'
import { getThemeLocalStorage } from '../App'

export default function EvJson(props: any) {
  const darkLightTheme = getThemeLocalStorage()
  const jsonTheme = darkLightTheme === Classes.DARK ? 'monokai' : 'rjv-default'
  return <ReactJson theme={jsonTheme} displayDataTypes={false} collapsed={true} {...props} />
}
