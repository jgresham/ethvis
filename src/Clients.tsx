import { useEffect, useState } from 'react'
import { Callout, Code, Intent } from "@blueprintjs/core";
import ConsensusAPI from "./ConsensusAPI"
import ExecutionWS from "./ExecutionWS"
import wait from 'wait'
import ClientConnectionError from "./ClientConnectionError"

interface ClientsProps {
	executionWS: any,
	consensusAPI: any
}

export default function Clients(props: ClientsProps) {
	const [sIsEcConnected, setIsEcConnected] = useState<boolean>()
	const [sIsCcConnected, setIsCcConnected] = useState<boolean>()
	const [sIsEcSyncing, setIsEcSyncing] = useState<boolean>()
	const [sNodeInfo, setNodeInfo] = useState<string>()
  const [sConsensusNodeInfo, setConsensusNodeInfo] = useState<string>()

	useEffect(() => {
		getClientInfo()
	}, [])

	const getClientInfo = () => {
		getConsensusNodeInfo()
		getExecutionNodeInfo()
		checkEcConnection()
		checkCcConnection()
	}
	
	const checkEcConnection = async () => {
		setIsEcConnected(await props.executionWS.isConnected())
		setIsEcSyncing(await props.executionWS.isSyncing())
		wait(5000)
		setIsEcConnected(await props.executionWS.isConnected())
		setIsEcSyncing(await props.executionWS.isSyncing())
	}
	const checkCcConnection = async () => {
		setIsCcConnected(await props.consensusAPI.isConnected())
	}

	const getConsensusNodeInfo = async () => {
    console.log("appjs getConsensusNodeInfo")
    const nodeInfo = await props.consensusAPI.getNodeInfo()
    setConsensusNodeInfo(nodeInfo)
  }

	const getExecutionNodeInfo = async () => {
    console.log("appjs getExecutionNodeInfo")
    const nodeInfo = await props.executionWS.getNodeInfo()
    setNodeInfo(nodeInfo)
  }

		return (
			<div>
				<p>
					<strong>Execution client:</strong> {sNodeInfo} isSyncing: {sIsEcSyncing !== undefined && sIsEcSyncing.toString()}
					<strong>Consensus client:</strong> {sConsensusNodeInfo}
				</p>
				{(!sIsCcConnected || !sIsEcConnected) && <ClientConnectionError />}
			</div>

		);
}