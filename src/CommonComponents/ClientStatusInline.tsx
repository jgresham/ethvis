import { Icon, Intent, Tag, Spinner, SpinnerSize } from '@blueprintjs/core'
import { IconName } from '@blueprintjs/icons'
import { Tooltip2, Classes, Popover2, Popover2InteractionKind } from '@blueprintjs/popover2'
import { useEffect, useState } from 'react'
import ExecutionConnectionRequirements from '../InfoDialogs/ExecutionConnectionRequirements'
import ConnectableText from './ConnectableText'
import EvJson from './EvJson'

interface ClientStatusInlineProps {
  clientDisplayName: string
  clientVersion?: string
  isSyncing?: boolean | any
  isConnected?: boolean
  peers?: any
  type: string
}

export default function ClientStatusInline({
  clientDisplayName,
  clientVersion,
  isSyncing,
  isConnected,
  peers,
  type,
}: ClientStatusInlineProps) {
  const [sIsOpenOverlay, setIsOpenOverlay] = useState<boolean>(false)
  const [sSyncPercent, setSyncPercent] = useState<string>('')
  const [sIsSyncing, setIsSyncing] = useState<boolean>()
  const [sPeers, setPeers] = useState<number>()
  const [sIsListeningForPeers, setIsListeningForPeers] = useState<boolean>()

  useEffect(() => {
    if (typeof isSyncing === 'object') {
      if (type === 'execution') {
        const syncRatio = isSyncing.currentBlock / isSyncing.highestBlock
        setSyncPercent((syncRatio * 100).toFixed(1))
        setIsSyncing(true)
      } else if (type === 'consensus' && isSyncing.is_syncing) {
        const syncRatio =
          parseInt(isSyncing.head_slot) /
          (parseInt(isSyncing.sync_distance) + parseInt(isSyncing.head_slot))
        console.log('consensus isSyncing', isSyncing, syncRatio)
        setSyncPercent((syncRatio * 100).toFixed(1))
        setIsSyncing(true)
      }
    } else {
      setSyncPercent('')
      setIsSyncing(false)
    }
  }, [isSyncing])

  useEffect(() => {
    console.log('my peers', peers)
    if (typeof peers === 'object') {
      if (type === 'execution') {
        setPeers(peers.peerCount)
        setIsListeningForPeers(peers.isListeningForPeers)
      } else if (type === 'consensus' && Array.isArray(peers)) {
        console.log('consensus isSyncing', isSyncing)
        setPeers(peers.length)
        setIsListeningForPeers(false)
      }
    } else {
      setPeers(undefined)
      setIsListeningForPeers(undefined)
    }
  }, [peers])

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ConnectableText
        text={clientDisplayName}
        hoverText={clientVersion}
        isConnected={isConnected}
      />
      {isConnected ? (
        <>
          {sIsSyncing && (
            <>
              <Spinner
                size={SpinnerSize.SMALL}
                value={parseFloat(sSyncPercent) / 100}
                intent={Intent.PRIMARY}
              />
              &ensp;
              <Popover2
                className={Classes.TOOLTIP2_INDICATOR}
                content={<EvJson src={isSyncing} />}
                placement="bottom"
                interactionKind={Popover2InteractionKind.HOVER}
              >
                <span>{sSyncPercent}% synced</span>
              </Popover2>
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
      &ensp;
      {peers && (
        <>
          {sPeers !== undefined && (
            <Popover2
              className={Classes.TOOLTIP2_INDICATOR}
              content={<EvJson src={peers} />}
              placement="bottom"
              interactionKind={Popover2InteractionKind.HOVER}
            >
              <>
                {sIsListeningForPeers ? (
                  <Icon icon={'inherited-group' as IconName} />
                ) : (
                  <Icon icon={'people' as IconName} />
                )}{' '}
                {sPeers}
              </>
            </Popover2>
          )}
        </>
      )}
    </div>
  )
}
