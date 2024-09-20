/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled, lighten } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { SelectChangeEvent } from '@mui/material/Select'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'
import moment from 'moment'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteInvoice } from 'src/store/apps/invoice'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'

// import { DAILYDISPATCHS, MONTH_ALL_DOCUMENT, WEEK_ALL_DOCUMENT, WEEK_DIS, WEEK_POWER_PURCHASE } from '@/lib/query'
import { DayPowerPurchase, MonthPowerPurchase, WeekPowerPurchase } from '@/__generated__/graphql'
import { DEL_CUSTOMER } from '@/lib/mutation'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CardDailyDispatch from 'src/@core/components/card-statistics/card-daily-dispatch'
import { Button, TextField, useTheme } from '@mui/material'
import PickerDailydispatch from 'src/views/forms/form-elements/pickers/PickerDailydispatch'
import PickerDailydeclar from 'src/views/forms/form-elements/pickers/PickerDailydeclar'
import { formatDate } from 'src/@core/utils/format'

// ** Custom Component Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import RangeDate from 'src/@core/components/date/RangeDate'

interface InvoiceStatusObj {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: MonthPowerPurchase
}

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

// ** Vars
const invoiceStatusObj: InvoiceStatusObj = {
  Sent: { color: 'secondary', icon: 'tabler:circle-check' },
  Paid: { color: 'success', icon: 'tabler:circle-half-2' },
  Draft: { color: 'primary', icon: 'tabler:device-floppy' },
  'Partial Payment': { color: 'warning', icon: 'tabler:chart-pie' },
  'Past Due': { color: 'error', icon: 'tabler:alert-circle' },
  Downloaded: { color: 'info', icon: 'tabler:arrow-down-circle' }
}

// ** renders client column
const renderClient = (row: InvoiceType) => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={(row.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 100,
    headerName: 'ID',
    renderCell: ({ row }: CellType) => (
      <Typography
        component={LinkStyled}
        href={`/daily-dispatch/${row._id}`}
      >{`${row.powerNo}-${row.monthId}`}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'createdAt',
    headerName: 'Date',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${formatDate(row.createdAt) || ''}`}</Typography>
    )
  },

  {
    flex: 0.25,
    field: 'customerId',
    minWidth: 320,
    headerName: 'Declaration',

    renderCell: ({ row }: CellType) => {
      const { name, email } = row.decCustomerId

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'dispatchId',
    headerName: 'DEC - DIS',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.decCustomerId.abbreviation || ''} - ${
        row.disCustomerId.abbreviation
      }`}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'totalUnit',
    headerName: 'Unit',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.totalUnit || ''}`}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'totalPower',
    headerName: 'Power',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.totalPower.toLocaleString() || ''} Mw`}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'decAcknowleged',
    headerName: 'Declaration',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip
          title={`${row.decAcknowleged ? row?.decUserId?.fName + ' ' + row?.decUserId?.lName : 'Not Acknowlege yet'}`}
          placement='top'
          arrow
        >
          <IconButton style={{ marginTop: '5px' }}>
            <Icon
              icon={row.decAcknowleged ? `icon-park-solid:folder-success` : `icon-park-solid:folder-failed`}
              color={row.decAcknowleged ? 'green' : 'red'}
            />
          </IconButton>
        </Tooltip>
      </Box>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'disAcknowleged',
    headerName: 'Dispatch',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip
          title={`${row.disAcknowleged ? row?.disUserId?.fName + ' ' + row?.disUserId?.lName : 'Not Acknowlege yet'}`}
          placement='top'
          arrow
        >
          <IconButton style={{ marginTop: '5px' }}>
            <Icon
              icon={row.disAcknowleged ? `icon-park-solid:folder-success` : `icon-park-solid:folder-failed`}
              color={row.disAcknowleged ? 'green' : 'red'}
            />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
]

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const DailyReport = () => {
  const theme = useTheme()
  const { direction } = theme

  // ** States
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [endDate, setEndDate] = useState<DateType>(new Date())

  // console.log('startDate===>', moment(startDate).format('YYYY-MM-DD'))

  // console.log('endDate===>', endDate)

  // const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // console.log(popperPlacement)

  // Query
  // const { data, loading: loadingData } = useQuery(MONTH_ALL_DOCUMENT, {
  //   variables: {
  //     queryInput: {
  //       pageginate: { limit: paginationModel.pageSize, page: paginationModel.page },
  //       dateFillter: {
  //         startDate: moment(startDate).format('YYYY-MM-DD'),
  //         endDate: moment(endDate).format('YYYY-MM-DD')
  //       }
  //     }
  //   },
  //   fetchPolicy: 'network-only'
  // })

  // const allDocument = data?.allMonthlyDocument ? data?.allMonthlyDocument : []

  // const loading = loadingData

  // ** Hooks
  // const dispatch = useDispatch<AppDispatch>()

  // const store = useSelector((state: RootState) => state.invoice)

  // const columns: GridColDef[] = [
  //   ...defaultColumns,
  //   {
  //     flex: 0.1,
  //     minWidth: 140,
  //     sortable: false,
  //     field: 'actions',
  //     headerName: 'Actions',
  //     renderCell: ({ row }: CellType) => (
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         {/* <Tooltip title='Delete Invoice'>
  //           <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => dispatch(deleteInvoice(row.id))}>
  //             <Icon icon='tabler:trash' />
  //           </IconButton>
  //         </Tooltip> */}
  //         <Tooltip title='View'>
  //           <IconButton
  //             size='small'
  //             component={Link}
  //             sx={{ color: 'text.secondary' }}
  //             href={`/daily-dispatch/${row._id}`}
  //           >
  //             <Icon icon='tabler:eye' />
  //           </IconButton>
  //         </Tooltip>
  //         <OptionsMenu
  //           menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
  //           iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
  //           options={[
  //             {
  //               text: 'Download',
  //               icon: <Icon icon='tabler:download' fontSize={20} />
  //             },
  //             {
  //               text: 'Edit',
  //               href: `/apps/invoice/edit/${row._id}`,
  //               icon: <Icon icon='tabler:edit' fontSize={20} />
  //             },
  //             {
  //               text: 'Duplicate',
  //               icon: <Icon icon='tabler:copy' fontSize={20} />
  //             }
  //           ]}
  //         />
  //       </Box>
  //     )
  //   }
  // ]

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
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item sm={6} lg={4} xs={12}>
          <CardDailyDispatch
            icon={''}
            stats={'50'}
            title={'Daily declaration'}
            subtitle={'This day'}
            trendDiff={'40'}
            increase={'+20'}
            title2={'Last day'}
            value={'20'}
          />
        </Grid>
        <Grid item sm={6} lg={4} xs={12}>
          <CardDailyDispatch
            icon={''}
            stats={'50'}
            title={'Daily declaration'}
            subtitle={'This day'}
            trendDiff={'40'}
            increase={'-10'}
            title2={'Last day'}
            value={'20'}
          />
        </Grid>
        <Grid item sm={6} lg={4} xs={12}>
          <CardDailyDispatch
            icon={''}
            stats={'50'}
            title={'Daily declaration'}
            subtitle={'This day'}
            trendDiff={'40'}
            increase={'+50'}
            title2={'Last day'}
            value={'20'}
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Grid
              container
              xs={12}
              display={'flex'}
              justifyContent='space-between'
              alignItems='center'
              padding={2}
              margin={2}
            >
              <Grid item xs={12} md={4}>
                <DatePickerWrapper>
                  <DatePickerCustom popperPlacement={popperPlacement} />
                </DatePickerWrapper>
              </Grid>
              <Grid item>
                <Link href='#' passHref>
                  <Button sx={{ mt: 10, mr: 10 }} variant='contained'>
                    Export
                  </Button>
                </Link>
              </Grid>
            </Grid>
            {/* <DataGrid
              sx={{ mt: 10 }}
              autoHeight
              pagination
              rowHeight={62}
              getRowId={row => row._id}
              rows={allDocument}
              loading={loading}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            /> */}
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default DailyReport
