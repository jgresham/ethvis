import { Callout, Code, Intent } from "@blueprintjs/core";

export default function ClientConnectionError() {
		return (
			<Callout intent={Intent.DANGER} title={"Client connection error"}>
					The execution or consensus client is not connected.
			</Callout>
		);
}