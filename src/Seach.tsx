import { FormGroup, InputGroup } from '@blueprintjs/core'
import { updateSearchText, selectSearchText } from './state/search'
import { useAppDispatch, useAppSelector } from './state/hooks'
import { useGetBlockQuery, useGetExecutionBlockQuery } from './state/services'
import EvJson from './CommonComponents/EvJson'

export default function Search() {
  const dispatch = useAppDispatch()
  const rsSearchText = useAppSelector(selectSearchText)
  const { data, error, isLoading, isFetching } = useGetBlockQuery(rsSearchText)
  const qGetExecutionBlockQuery = useGetExecutionBlockQuery(rsSearchText)
  //   const rsConsensusApiEndpoint = useAppSelector((state) => state.settings.consensusApi)

  const onSearchTextChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    console.log('onSearchTextChange', newText)
    dispatch(updateSearchText(newText))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormGroup
          label="Search"
          labelFor="text-input"
          labelInfo="blocks only"
          inline={true}
          style={{ display: 'inline-block' }}
        >
          <InputGroup
            id="text-input"
            asyncControl={true}
            value={rsSearchText}
            onChange={onSearchTextChange}
          />
        </FormGroup>
      </div>
      <h3>Execution client</h3>
      {(qGetExecutionBlockQuery.isLoading || qGetExecutionBlockQuery.isFetching) && <>Loading...</>}
      {qGetExecutionBlockQuery.error && <>No data found. Showing previous results</>}
      {!qGetExecutionBlockQuery.error && (
        <div>
          <EvJson src={qGetExecutionBlockQuery.data} />
        </div>
      )}
      <h3>Consensus client</h3>
      {(isLoading || isFetching) && <>Loading...</>}
      {error && <>No data found. Showing previous results</>}
      {!error && (
        <div>
          <EvJson src={data} />
        </div>
      )}
    </div>
  )
}
