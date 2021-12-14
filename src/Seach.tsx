import { FormGroup, InputGroup } from '@blueprintjs/core'
import { updateSearchText, selectSearchText } from './state/search'
import { useAppDispatch, useAppSelector } from './state/hooks'
import { useGetBlockQuery } from './state/services'

export default function Search() {
  const dispatch = useAppDispatch()
  const rsSearchText = useAppSelector(selectSearchText)
  const { data, error, isLoading, isFetching } = useGetBlockQuery(rsSearchText)
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
      {(isLoading || isFetching) && <>Loading...</>}
      {error && <>No data found. Showing previous results</>}
      {!error && <div>{JSON.stringify(data, null, 2)}</div>}
    </div>
  )
}
