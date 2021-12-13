import { useAppSelector, useAppDispatch } from '../state/hooks'
import { Button } from '@blueprintjs/core'
import { toggleDarkMode } from '../state/settings'

export default function ChainId() {
  const isDarkMode = useAppSelector((state) => state.settings.isDarkMode)
  const dispatch = useAppDispatch()
  return (
    <Button
      minimal={true}
      icon={isDarkMode ? 'moon' : 'lightbulb'}
      onClick={() => dispatch(toggleDarkMode())}
    ></Button>
  )
}
