/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { useState } from 'react'

import { useQuery } from '@apollo/client'
import { CHART, POWER_SOURCES } from '@/lib/query'

// ** Third Party Imports
import { Line } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import { useTheme } from '@mui/material/styles'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Condition } from '@/__generated__/graphql'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import RangeDate from 'src/@core/components/date/RangeDate'

import moment from 'moment'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { CustomerSelectDataType } from 'src/types/customerType'

export interface DataLine {
  labels: number[]
  data1: number[]
  data2: number[]
}
interface LineProps {
  white: string
  warning: string
  primary: string
  success: string
  labelColor: string
  borderColor: string
  legendColor: string
}

const DashboardChart = (props: LineProps) => {
  // ** States
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [endDate, setEndDate] = useState<DateType>(new Date())

  const [customerId, setCustomerId] = useState<string>('')

  // Condition
  const condition = () => {
    const con: Condition[] = []
    if (customerId) {
      con.push({
        field: 'decCustomerId',
        value: customerId
      })
    }
    if (con.length) {
      return con
    } else {
      return null
    }
  }

  // console.log(moment(startDate).format('YYYY-MM-DD'))

  // ** Query
  const { data: customerData } = useQuery(POWER_SOURCES)
  const { data: chartData } = useQuery(CHART, {
    variables: {
      queryInput: {
        condition: condition(),
        dateFillter: {
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD')
        }
      }
    }
  })

  // const Data
  const customers = customerData?.getPowerSources ? customerData.getPowerSources : []
  const chart = chartData?.chart ? chartData.chart : null

  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // ** Props
  const { white, primary, success, labelColor, borderColor, legendColor } = props

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          color: borderColor
        }
      },
      y: {
        min: chart?.min || 0,
        max: chart?.max || 100,
        ticks: {
          stepSize: 10,
          color: labelColor
        },
        grid: {
          color: borderColor
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          padding: 25,
          boxWidth: 10,
          color: legendColor,
          usePointStyle: true
        }
      }
    }
  }

  const dataRender: ChartData<'line'> = {
    labels: chart?.labels,
    datasets: [
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'Declaration',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: primary,
        backgroundColor: primary,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: primary,
        data: chart?.declarations || []
      },

      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'dispatch',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: success,
        backgroundColor: success,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: success,
        data: chart?.dispatchs || []
      }
    ]
  }

  const handleCustomerChange = (event: React.ChangeEvent<{}>, value: CustomerSelectDataType | null) => {
    setCustomerId(value?._id || '')
  }

  const DatePickerCustom = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => (
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
          customInput={<RangeDate label='From' />}
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
          customInput={<RangeDate label='To' />}
          selectsEnd
        />
      </div>
    </Box>
  )

  return (
    <Card>
      <Typography variant='h6' sx={{ mt: 3, ml: 8, fontWeight: 800, lineHeight: 'normal' }}>
        Summary
      </Typography>
      <Box
        sx={{
          py: 3,
          px: 8,
          rowGap: 2,
          columnGap: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <CustomAutocomplete
              sx={{ mt: 4 }}
              id='autocomplete-custom'
              options={customers}
              getOptionLabel={option => option?.name || ''}
              renderInput={params => (
                <CustomTextField {...params} label='Choose Power source' placeholder='Power source' />
              )}
              onChange={handleCustomerChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePickerWrapper>
              <DatePickerCustom popperPlacement={popperPlacement} />
            </DatePickerWrapper>
          </Grid>
        </Grid>
      </Box>

      <CardContent>
        <Line data={dataRender} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default DashboardChart
