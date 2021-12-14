import InfoDialog from './InfoDialog'

export default function ChainId() {
  return (
    <InfoDialog title="Chain ID">
      <div>
        <blockquote className="bp3-blockquote">
          Returns the currently configured chain ID, a value used in replay-protected transaction
          signing as introduced by EIP-155.
        </blockquote>
        <blockquote className="bp3-blockquote">
          The chain ID returned should always correspond to the information in the current known
          head block. This ensures that caller of this RPC method can always use the retrieved
          information to sign transactions built on top of the head.
        </blockquote>
        <p>
          <a href="https://github.com/ethereum/EIPs/blob/master/EIPS/eip-695.md">Source</a>
        </p>
      </div>
    </InfoDialog>
  )
}
