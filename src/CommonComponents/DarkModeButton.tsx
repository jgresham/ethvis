import { useAppSelector, useAppDispatch } from '../state/hooks'
import { Button } from '@blueprintjs/core'
import { toggleDarkMode, selectIsDarkMode } from '../state/settings'

export default function ChainId() {
  const isDarkMode = useAppSelector(selectIsDarkMode)
  const dispatch = useAppDispatch()
  return (
    <Button
      minimal={true}
      icon={isDarkMode ? 'moon' : 'lightbulb'}
      onClick={() => dispatch(toggleDarkMode())}
    ></Button>
  )
}
