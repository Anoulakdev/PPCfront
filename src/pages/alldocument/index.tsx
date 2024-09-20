/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { SelectChangeEvent } from '@mui/material/Select'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import RangeDate from 'src/@core/components/date/RangeDate'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import moment from 'moment'

// ** Store & Actions Imports

// ** Types Imports

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { ALL_DOCUMENT, POWER_SOURCES, SUMMARY_ENERGY } from '@/lib/query'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'

import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CardAlldocument from 'src/@core/components/card-statistics/card-alldocument'
import PickerAlldocument from 'src/views/forms/form-elements/pickers/PickerAlldocument'
import { Document } from '@/__generated__/graphql'
import {
  FormatDate,
  GetCurrentWeekNumber,
  GetDay,
  GetEndMonth,
  GetEndYear,
  GetFullYear,
  GetStartAndEndDateOfWeek,
  GetStartMonth,
  GetStartYear,
  GetYearAndMonth
} from 'src/@core/utils/date-time'
import { Condition, Status } from '@/globalState'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { CustomerSelectDataType } from 'src/types/customerType'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import CardDailyDispatch from 'src/@core/components/card-statistics/card-daily-dispatch'
import CardSummary from 'src/@core/components/card-summary'

// ** renders client column
interface CellType {
  row: Document
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 120,
    headerName: 'ID',
    renderCell: ({ row }: CellType) => `${row.powerNo}`
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'dis_dec',
    headerName: 'DAD - DD',
    renderCell: ({ row }: CellType) => row.dis_dec
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'declaration',
    headerName: 'DAD',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.declaration.toLocaleString() || ''} MWh`}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'dispatch',
    headerName: 'DD',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.dispatch.toLocaleString() || ''} MWh`}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'edited',
    headerName: 'Document',
    renderCell: ({ row }: CellType) => (
      <CustomChip
        rounded
        skin='light'
        size='small'
        label={row.edited ? Status.revise : Status.original}
        color={row.edited ? 'warning' : 'success'}
        sx={{ textTransform: 'capitalize' }}
      />
    )
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'decAcknowleged',
    headerName: 'Status(DAD)',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton style={{ marginTop: '5px' }}>
          <Icon
            icon={row.decAcknowleged ? `icon-park-solid:folder-success` : `icon-park-solid:folder-failed`}
            color={row.decAcknowleged ? 'green' : 'red'}
          />
        </IconButton>
      </Box>
    )
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'disAcknowleged',
    headerName: 'Status(DD)',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton style={{ marginTop: '5px' }}>
          <Icon
            icon={row.disAcknowleged ? `icon-park-solid:folder-success` : `icon-park-solid:folder-failed`}
            color={row.disAcknowleged ? 'green' : 'red'}
          />
        </IconButton>
      </Box>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'createdAt',
    headerName: 'Date',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${FormatDate(row.createdAt) || ''}`}</Typography>
    )
  }
]

/* eslint-disable */

/* eslint-enable */

const Alldocument = () => {
  const theme = useTheme()
  const { direction } = theme

  const { startWeek, endWeek } = GetStartAndEndDateOfWeek()

  // ** State
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [endDate, setEndDate] = useState<DateType>(new Date())
  const [docType, setDocType] = useState<string>('daily')
  const [customerId, setCustomerId] = useState<string>('')
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

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // Query

  const { data: customerData } = useQuery(POWER_SOURCES)
  const customers = customerData?.getPowerSources ? customerData.getPowerSources : []

  const { data, loading: loadingData } = useQuery(ALL_DOCUMENT, {
    variables: {
      queryInput: {
        condition: condition(),
        pageginate: { limit: paginationModel.pageSize, page: paginationModel.page },
        dateFillter: {
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD')
        }
      },
      docType
    }
  })
  const { data: dailyEnergy } = useQuery(SUMMARY_ENERGY, {
    variables: {
      queryInput: {
        dateFillter: {
          startDate: GetDay(),
          endDate: GetDay()
        }
      }
    }
  })
  const { data: weeklyEnergy } = useQuery(SUMMARY_ENERGY, {
    variables: {
      queryInput: {
        dateFillter: {
          startDate: startWeek,
          endDate: endWeek
        }
      }
    }
  })
  const { data: monthlyEnergy } = useQuery(SUMMARY_ENERGY, {
    variables: {
      queryInput: {
        dateFillter: {
          startDate: GetStartMonth(),
          endDate: GetEndMonth()
        }
      }
    }
  })

  // const { data: yearlyEnergy } = useQuery(SUMMARY_ENERGY, {
  //   variables: {
  //     queryInput: {
  //       dateFillter: {
  //         startDate: GetStartYear(),
  //         endDate: GetEndYear()
  //       }
  //     }
  //   }
  // })

  const daidlyEnergyData = dailyEnergy?.summaryEnergy ? dailyEnergy.summaryEnergy : null
  const weeklyEnergyData = weeklyEnergy?.summaryEnergy ? weeklyEnergy.summaryEnergy : null
  const monthlyEnergyData = monthlyEnergy?.summaryEnergy ? monthlyEnergy.summaryEnergy : null

  // const yearlyEnergyData = yearlyEnergy?.summaryEnergy ? yearlyEnergy.summaryEnergy : null

  const allDocuments = data?.documents ? data?.documents : []

  const loading = loadingData

  // ** Hooks

  const handleDocumentTypeValue = (e: SelectChangeEvent<unknown>) => {
    setDocType(e.target.value as string)
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

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View'>
            <IconButton
              size='small'
              component={Link}
              sx={{ color: 'text.secondary' }}
              href={`/daily-dispatch/${row._id}`}
            >
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item sm={6} lg={4} xs={12}>
          <CardSummary
            icon={''}
            title={'Today'}
            subtitle={FormatDate(GetDay())}
            declaration={daidlyEnergyData?.declaration + '' || ''}
            dispatch={daidlyEnergyData?.dispatch + '' || ''}
            progress={0}
          />
        </Grid>
        <Grid item sm={6} lg={4} xs={12}>
          <CardSummary
            icon={''}
            title={'Weekly'}
            subtitle={GetCurrentWeekNumber() + ''}
            declaration={weeklyEnergyData?.declaration + '' || ''}
            dispatch={weeklyEnergyData?.dispatch + '' || ''}
            progress={0}
          />
        </Grid>
        <Grid item sm={6} lg={4} xs={12}>
          <CardSummary
            icon={''}
            title={'Monthly'}
            subtitle={GetYearAndMonth()}
            declaration={monthlyEnergyData?.declaration + '' || ''}
            dispatch={monthlyEnergyData?.dispatch + '' || ''}
            progress={0}
          />
        </Grid>
        {/* <Grid item sm={6} lg={3} xs={12}>
          <CardSummary
            icon={''}
            title={'Yearly'}
            subtitle={GetFullYear() + ''}
            declaration={yearlyEnergyData?.declaration + '' || ''}
            dispatch={yearlyEnergyData?.dispatch + '' || ''}
            progress={0}
          />
        </Grid> */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Choose day,week,month'
                    SelectProps={{ value: docType, onChange: e => handleDocumentTypeValue(e) }}
                  >
                    <MenuItem value='daily'>Daily</MenuItem>
                    <MenuItem value='weekly'>Weekly</MenuItem>
                    <MenuItem value='monthly'>Monthly</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomAutocomplete
                    sx={{ ml: 2 }}
                    id='autocomplete-custom'
                    options={customers}
                    getOptionLabel={option => option?.name || ''}
                    renderInput={params => (
                      <CustomTextField {...params} label='Choose Power source' placeholder='Power source' />
                    )}
                    onChange={handleCustomerChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid
              container
              xs={12}
              sx={{
                display: 'flex',

                padding: 2,
                margin: 2,
                bgcolor: 'background.paper',
                borderRadius: 4
              }}
            >
              <Grid item xs={12} md={6}>
                <DatePickerWrapper>
                  <DatePickerCustom popperPlacement={popperPlacement} />
                </DatePickerWrapper>
              </Grid>
            </Grid>

            <DataGrid
              sx={{ mt: 10 }}
              autoHeight
              pagination
              rowHeight={62}
              getRowId={row => row._id}
              rows={allDocuments}
              loading={loading}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Alldocument
