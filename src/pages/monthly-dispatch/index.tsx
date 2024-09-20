/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useEffect, forwardRef, useCallback } from 'react'

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
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { MONTH_DIS, MONTH_SUMMARY_ENERGY } from '@/lib/query'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteInvoice } from 'src/store/apps/invoice'

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
import CardMonthlyDispatch from 'src/@core/components/card-statistics/card-monthly-dispatch'
import { Button, TextField, useTheme } from '@mui/material'
import PickerMonthlydispatch from 'src/views/forms/form-elements/pickers/PickerMonthlydispatch'
import { DayPowerPurchase, MonthPowerPurchase } from '@/__generated__/graphql'
import { formatDate } from 'src/@core/utils/format'
import { Status } from '@/globalState'
import Searchinput from './searchinput'
import { FormatDate, GetEndMonth, GetFullMonth, GetStartMonth, GetYearAndMonth } from 'src/@core/utils/date-time'
import CardSummary from 'src/@core/components/card-summary'

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
    minWidth: 120,
    headerName: 'ID',
    renderCell: ({ row }: CellType) => `${row.powerNo}-${row.monthId}`
  },
  {
    flex: 0.25,
    field: 'customerId',
    minWidth: 100,
    headerName: 'Issued by',

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
    headerName: 'DAD - DD',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.decCustomerId.abbreviation || ''} - ${
        row.disCustomerId.abbreviation
      }`}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'originalDetail',
    headerName: 'DAD',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${
        row.originalDetail.totalPower.toLocaleString() || ''
      } MWh`}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'totalPower',
    headerName: 'DD',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.totalPower.toLocaleString() || ''} MWh`}</Typography>
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
        <Tooltip
          title={`${row.decAcknowleged ? row?.disUserId?.fName + ' ' + row?.disUserId?.lName : 'Not Acknowlege yet'}`}
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
    minWidth: 150,
    field: 'disAcknowleged',
    headerName: 'Status(DD)',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip
          title={`${row.disAcknowleged ? row?.decUserId?.fName + ' ' + row?.decUserId?.lName : 'Not Acknowlege yet'}`}
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

const MonthlyDispatch = () => {
  // ** State

  const [value, setValue] = useState<string>('')

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // Query
  const { data, loading: loadingData } = useQuery(MONTH_DIS, {
    variables: {
      queryInput: {
        pageginate: { limit: paginationModel.pageSize, page: paginationModel.page }
      }
    },
    fetchPolicy: 'network-only'
  })
  const { data: monthlyEnergy } = useQuery(MONTH_SUMMARY_ENERGY, {
    variables: {
      queryInput: {
        dateFillter: {
          startDate: GetStartMonth(),
          endDate: GetEndMonth()
        }
      }
    }
  })
  const loading = loadingData
  const monthDis = data?.monthDispatchs ? data?.monthDispatchs : []
  const monthlyEnergyData = monthlyEnergy?.monthSummaryEnergy ? monthlyEnergy.monthSummaryEnergy : null

  // ** Hooks

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
              href={`/monthly-dispatch/${row._id}`}
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
            title={`Month: ${GetFullMonth()}`}
            subtitle={`${GetYearAndMonth()}`}
            declaration={monthlyEnergyData?.declaration + ''}
            dispatch={monthlyEnergyData?.dispatch + ''}
            progress={0}
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Searchinput value={value} handleFilter={handleFilter} />
            <DataGrid
              loading={loading}
              autoHeight
              pagination
              rowHeight={62}
              getRowId={row => row._id}
              rows={monthDis}
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

export default MonthlyDispatch
