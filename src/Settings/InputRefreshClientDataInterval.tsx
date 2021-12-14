import { useEffect, useState } from 'react'
import wait from 'wait'
import { Tag, Intent, FormGroup, NumericInput, Icon } from '@blueprintjs/core'
import {
  updateSettingsNumRefreshClientDataInterval,
  selectNumRefreshClientDataInterval,
} from '../state/settings'
import { useAppDispatch, useAppSelector } from '../state/hooks'

export default function InputRefreshClientDataInterval() {
  const dispatch = useAppDispatch()
  const rsNumRefreshClientDataInterval = useAppSelector(selectNumRefreshClientDataInterval)

  const onChange = async (value: number) => {
    dispatch(updateSettingsNumRefreshClientDataInterval(value))
  }

  return (
    <div>
      <span>
        <h3>Refresh client data interval:</h3>
      </span>
      <FormGroup
        label="Interval in milliseconds"
        labelFor="text-input"
        labelInfo="*"
        inline={true}
        style={{ display: 'inline-block' }}
      >
        <NumericInput
          id="number-input"
          min={0}
          allowNumericCharactersOnly={true}
          asyncControl={true}
          value={rsNumRefreshClientDataInterval}
          onValueChange={onChange}
        />
      </FormGroup>
    </div>
  )
}
