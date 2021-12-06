import React, {useState }from 'react'
import { Dialog, Button, Classes, Code } from '@blueprintjs/core'

interface InfoDialogProps {
    title?: string
    children: React.ReactNode
  }

export default function InfoDialog(props: InfoDialogProps) {
    const [sIsOpen, setIsOpen] = useState<boolean>(false)
    const dialogTitle = props.title ? props.title + " Info" : "Info"
    return (
      <>
          <Button minimal={true} onClick={() => setIsOpen(true)} icon={'info-sign'}/>
              <Dialog
                title={dialogTitle}
                isOpen={sIsOpen}
                onClose={() => setIsOpen(false)}
              >
                <div className={Classes.DIALOG_BODY}>
                  {props.children}
                </div>
              </Dialog>
    </>
    )
  }
  