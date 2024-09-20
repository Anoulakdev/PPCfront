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
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports

// ** Graphql
import { useQuery } from '@apollo/client'
import { DAILYDECLARATIONS, SUMMARY_ENERGY } from '@/lib/query'
import { DayPowerPurchase } from '@/__generated__/graphql'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CardDailyDispatch from 'src/@core/components/card-statistics/card-daily-dispatch'
import { Button } from '@mui/material'
import { Status } from '@/globalState'
import {
  FormatDate,
  GetDay,
  GetEndMonth,
  GetStartMonth,
  GetYearAndMonth,
  GetYesterday
} from 'src/@core/utils/date-time'
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
  row: DayPowerPurchase
}

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

// ** Vars

// ** renders client column

const defaultColumns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 120,
    headerName: 'ID',
    renderCell: ({ row }: CellType) => `${row.powerNo}-${row.dayId}`
  },

  {
    flex: 0.15,
    field: 'customerId',
    minWidth: 100,
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
    minWidth: 100,
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
    minWidth: 120,
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
    minWidth: 120,
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

const DailyDeclarationList = () => {
  // ** State

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // Query
  const { data: yesterday } = useQuery(SUMMARY_ENERGY, {
    variables: {
      queryInput: {
        dateFillter: {
          startDate: GetYesterday(),
          endDate: GetYesterday()
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
  const {
    data,
    loading: loadingData,
    refetch
  } = useQuery(DAILYDECLARATIONS, {
    variables: {
      queryInput: {
        pageginate: { limit: paginationModel.pageSize, page: paginationModel.page },
        dateFillter: {
          startDate: GetDay(),
          endDate: GetDay()
        }

        // search: {
        //   q: value,
        //   searchField: ['name', 'company', 'phone']
        // }
      }
    },
    fetchPolicy: 'network-only'
  })
  const { data: today } = useQuery(SUMMARY_ENERGY, {
    variables: {
      queryInput: {
        dateFillter: {
          startDate: GetDay(),
          endDate: GetDay()
        }
      }
    }
  })

  const dailyDeclarations = data?.dayDeclarations ? data?.dayDeclarations : []
  const yesterdayData = yesterday?.summaryEnergy ? yesterday?.summaryEnergy : null
  const monthlyEnergyData = monthlyEnergy?.summaryEnergy ? monthlyEnergy.summaryEnergy : null
  const todayData = today?.summaryEnergy ? today?.summaryEnergy : null

  const loading = loadingData

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} sx={{ color: 'text.secondary' }} href={`/daily-view/${row._id}`}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Action'>
            <IconButton
              size='small'
              component={Link}
              sx={{ color: '#0275d8', ml: 2 }}
              href={`/daily-declaration/${row._id}`}
            >
              <Icon icon='carbon:touch-interaction' />
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
            title={'Yesterday'}
            subtitle={FormatDate(GetYesterday())}
            declaration={yesterdayData?.declaration + ''}
            dispatch={yesterdayData?.dispatch + ''}
            progress={0}
          />
        </Grid>
        <Grid item sm={6} lg={4} xs={12}>
          <CardSummary
            icon={''}
            title={'Today'}
            subtitle={FormatDate(GetDay())}
            declaration={todayData?.declaration + '' || ''}
            dispatch={todayData?.dispatch + '' || ''}
            progress={0}
          />
        </Grid>
        <Grid item sm={6} lg={4} xs={12}>
          <CardSummary
            icon={''}
            title={'Month'}
            subtitle={GetYearAndMonth()}
            declaration={monthlyEnergyData?.declaration + ''}
            dispatch={monthlyEnergyData?.dispatch + ''}
            progress={0}
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Grid
              container
              xs={12}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              padding={2}
              margin={2}
            >
              <Grid item>
                <Link href='/day-declaration-form' passHref>
                  <Button sx={{ mt: 2 }} variant='contained'>
                    Create
                  </Button>
                </Link>
              </Grid>
              <Tooltip title='Refetch'>
                <IconButton size='small' sx={{ color: 'text.secondary', mr: 2 }} onClick={() => refetch()}>
                  <Icon icon='ic:baseline-refresh' color='red' width={32} />
                </IconButton>
              </Tooltip>
            </Grid>
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              getRowId={row => row._id}
              rows={dailyDeclarations}
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

export default DailyDeclarationList
