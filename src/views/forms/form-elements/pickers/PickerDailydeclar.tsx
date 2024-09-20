// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Imports
// import subDays from 'date-fns/subDays'

// import addDays from 'date-fns/addDays'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'

import 'react-datepicker/dist/react-datepicker.css'

const PickerDailydeclar = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => {
  // ** States
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [endDate, setEndDate] = useState<DateType>(new Date())

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <div>
        <DatePicker
          id='start-date'
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          popperPlacement={popperPlacement}
          onChange={(date: Date | null) => {
            if (date) {
              setStartDate(date)
              if (endDate && isAfter(date, endDate)) {
                setEndDate(date)
              }
            }
          }}
          customInput={<CustomInput label='From' />}
          selectsStart
        />
      </div>

      <div>
        <DatePicker
          id='end-date'
          selected={endDate}
          startDate={startDate}
          endDate={endDate}
          popperPlacement={popperPlacement}
          onChange={(date: Date | null) => {
            if (date) {
              setEndDate(date)
              if (startDate && isBefore(date, startDate)) {
                setStartDate(date)
              }
            }
          }}
          customInput={<CustomInput label='To' />}
          selectsEnd
        />
      </div>
    </Box>
  )
}

export default PickerDailydeclar
