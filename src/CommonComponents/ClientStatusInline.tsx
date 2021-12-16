import { Icon, Intent, Tag, Spinner, SpinnerSize } from '@blueprintjs/core'
import { IconName } from '@blueprintjs/icons'
import { useEffect, useState } from 'react'
import ExecutionConnectionRequirements from '../InfoDialogs/ExecutionConnectionRequirements'
import ConnectableText from './ConnectableText'

interface ClientStatusInlineProps {
  clientDisplayName: string
  clientVersion?: string
  isSyncing?: boolean | any
  isConnected?: boolean
  type: string
}

export default function ClientStatusInline({
  clientDisplayName,
  clientVersion,
  isSyncing,
  isConnected,
  type,
}: ClientStatusInlineProps) {
  const [sIsOpenOverlay, setIsOpenOverlay] = useState<boolean>(false)
  const [sSyncPercent, setSyncPercent] = useState<string>('')

  useEffect(() => {
    if (isSyncing) {
      if (type === 'execution') {
        setSyncPercent(((isSyncing.currentBlock / isSyncing.highestBlock) * 100).toFixed(1))
      } else {
        console.log('consensus isSyncing', isSyncing)
        setSyncPercent(
          ((isSyncing.head_slot / isSyncing.sync_distance + isSyncing.head_slot) * 100).toFixed(1)
        )
      }
    } else {
      setSyncPercent('')
    }
  }, [isSyncing])
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ConnectableText
        text={clientDisplayName}
        hoverText={clientVersion}
        isConnected={isConnected}
      />
      {isConnected ? (
        <>
          {typeof isSyncing === 'object' && (
            <>
              <Spinner
                size={SpinnerSize.SMALL}
                value={parseFloat(sSyncPercent) / 100}
                intent={Intent.PRIMARY}
              />
              &ensp;
              <span>{sSyncPercent}% synced</span>
            </>
          )}
        </>
      ) : (
        <>
          <Tag
            intent={Intent.DANGER}
            large={true}
            interactive={true}
            onClick={() => setIsOpenOverlay(true)}
          >
            <Icon icon={'info-sign' as IconName} />
            <span style={{ paddingLeft: 5 }}>Disconnected</span>
          </Tag>
          {type === 'execution' ? (
            <ExecutionConnectionRequirements
              isOpen={sIsOpenOverlay}
              onClose={() => setIsOpenOverlay(false)}
            />
          ) : (
            <ExecutionConnectionRequirements
              isOpen={sIsOpenOverlay}
              onClose={() => setIsOpenOverlay(false)}
            />
          )}
        </>
      )}
    </div>
  )
}
