import React, { useState } from 'react'
import { Dialog, Button, Classes, Code, DialogProps } from '@blueprintjs/core'
import { useAppSelector } from '../state/hooks'

interface EDialogProps extends DialogProps {
  children: React.ReactNode
}

export default function EDialog(props: EDialogProps) {
  const isDarkMode = useAppSelector((state) => state.settings.isDarkMode)
  const dialogTitle = props.title ? props.title + ' Info' : 'Info'
  return (
    <Dialog title={dialogTitle} className={isDarkMode ? Classes.DARK : ''} {...props}>
      <div className={Classes.DIALOG_BODY}>{props.children}</div>
    </Dialog>
  )
}
