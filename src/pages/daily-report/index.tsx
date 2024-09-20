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

// ** Third Party Imports
import format from 'date-fns/format'
import moment from 'moment'

// ** Graphql
import { useQuery } from '@apollo/client'
import { REPORTS } from '@/lib/query'

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

// ** Stores Imports
import stores from '@/stores/index'

import 'react-datepicker/dist/react-datepicker.css'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import RangeDate from 'src/@core/components/date/RangeDate'
import { ExportReportHeader } from 'src/@core/components/exports/ExportReportTaxHead'
import { ExcelPowerType, ExcelType } from '@/globalState'
import TableData from './TableData'

interface Report {
  _id: string
  createdAt: string
  powerNo: string
  dayId: number
  totalPower: number
  totalUnit: number
  netEnergyOutput: number
  remark: string
  powers: number[]
}

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
  row: Report
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
    renderCell: ({ row }: CellType) => <Typography>{`${row.powerNo}`}</Typography>
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
    field: 'netEnergyOutput',
    headerName: 'Power',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.netEnergyOutput.toLocaleString() || '0'} Mw`}</Typography>
    )
  }

  // {
  //   flex: 0.15,
  //   minWidth: 140,
  //   field: 'issuedDate',
  //   headerName: 'Modifield',
  //   renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.issuedDate}</Typography>
  // }
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

  // ** Stores
  const { role } = stores.useRole()

  const findPath = role.paths?.length ? role.paths.find(item => item === '/daily-report/create') : null

  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // console.log(popperPlacement)

  // Query
  const { data: report, loading } = useQuery(REPORTS, {
    variables: {
      queryInput: {
        dateFillter: {
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD')
        }
      }
    },
    fetchPolicy: 'network-only'
  })
  const reports = report?.reports ? report?.reports : []

  // console.log('reportData===>', reports)

  // const loading = loadingReport

  // ** Hooks
  // const dispatch = useDispatch<AppDispatch>()
  const dailyReport: ExcelType[] = []
  const operationReport: ExcelPowerType[] = []
  if (reports.length && !loading) {
    reports.map(item => {
      const data1: ExcelType = {
        a: moment(item?.createdAt).format('DD/MM/YYYY') || '',
        b: item?.decCustomerId.company || '',
        c: item?.waterLevel + '' || '',
        d: item?.dwy + '' || '',
        e: item?.dwf + '' || '',
        f: item?.pws + '' || '',
        g: item?.activeStorage?.amount + '' || '',
        h: item?.activeStorage?.average + '' || '',
        i: item?.inflow.amount + '' || '',
        j: item?.inflow.volume + '' || '',
        k: item?.outFlow.amount + '' || '',
        l: item?.outFlow.volume + '' || '',
        m: item?.spillWay.amount + '' || '',
        n: item?.spillWay.volume + '' || '',
        o: item?.otherWaterReleased.amount + '' || '',
        p: item?.otherWaterReleased.volume + '' || '',
        q: item?.rainFall + '' || '',
        r: item?.netEnergyOutput + '' || '',
        s: item?.waterRate.toFixed(3) + '' || ''
      }
      const power: ExcelPowerType = {
        a: moment(item?.createdAt).format('DD/MM/YYYY'),
        b: item?.decCustomerId.company || '',
        c: item?.powers[0] || '0',
        d: item?.powers[1] || '0',
        e: item?.powers[2] || '0',
        f: item?.powers[3] || '0',
        g: item?.powers[4] || '0',
        h: item?.powers[5] || '0',
        i: item?.powers[6] || '0',
        j: item?.powers[7] || '0',
        k: item?.powers[8] || '0',
        l: item?.powers[9] || '0',
        m: item?.powers[10] || '0',
        n: item?.powers[11] || '0',
        o: item?.powers[12] || '0',
        p: item?.powers[13] || '0',
        q: item?.powers[14] || '0',
        r: item?.powers[15] || '0',
        s: item?.powers[16] || '0',
        t: item?.powers[17] || '0',
        u: item?.powers[18] || '0',
        v: item?.powers[19] || '0',
        w: item?.powers[20] || '0',
        x: item?.powers[21] || '0',
        y: item?.powers[22] || '0',
        z: item?.powers[23] || '0',
        aa: item?.remark || ''
      }
      dailyReport.push(data1)
      operationReport.push(power)
    })
  }

  const exportExcel = () => {
    const result1: ExcelType[] = []
    const result2: ExcelPowerType[] = []

    reports.map(item => {
      const data1: ExcelType = {
        a: moment(item?.createdAt).format('DD/MM/YYYY') || '',
        b: item?.decCustomerId.company || '',
        c: item?.waterLevel + '' || '',
        d: item?.dwy + '' || '',
        e: item?.dwf + '' || '',
        f: item?.pws + '' || '',
        g: item?.activeStorage?.amount + '' || '',
        h: item?.activeStorage?.average + '' || '',
        i: item?.inflow.amount + '' || '',
        j: item?.inflow.volume + '' || '',
        k: item?.outFlow.amount + '' || '',
        l: item?.outFlow.volume + '' || '',
        m: item?.spillWay.amount + '' || '',
        n: item?.spillWay.volume + '' || '',
        o: item?.otherWaterReleased.amount + '' || '',
        p: item?.otherWaterReleased.volume + '' || '',
        q: item?.rainFall + '' || '',
        r: item?.netEnergyOutput + '' || '',
        s: item?.waterRate.toFixed(3) + '' || ''
      }
      const power: ExcelPowerType = {
        a: moment(item?.createdAt).format('DD/MM/YYYY'),
        b: item?.decCustomerId.company || '',
        c: item?.powers[0] || '0',
        d: item?.powers[1] || '0',
        e: item?.powers[2] || '0',
        f: item?.powers[3] || '0',
        g: item?.powers[4] || '0',
        h: item?.powers[5] || '0',
        i: item?.powers[6] || '0',
        j: item?.powers[7] || '0',
        k: item?.powers[8] || '0',
        l: item?.powers[9] || '0',
        m: item?.powers[10] || '0',
        n: item?.powers[11] || '0',
        o: item?.powers[12] || '0',
        p: item?.powers[13] || '0',
        q: item?.powers[14] || '0',
        r: item?.powers[15] || '0',
        s: item?.powers[16] || '0',
        t: item?.powers[17] || '0',
        u: item?.powers[18] || '0',
        v: item?.powers[19] || '0',
        w: item?.powers[20] || '0',
        x: item?.powers[21] || '0',
        y: item?.powers[22] || '0',
        z: item?.powers[23] || '0',
        aa: item?.remark || ''
      }
      result1.push(data1)
      result2.push(power)
    })
    ExportReportHeader(result1, result2)
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
    <DatePickerWrapper>
      <Grid container spacing={6}>
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
              <Box display={'flex'} flexDirection={'row'}>
                {/* <Grid item xs={12} md={4}> */}
                <DatePickerWrapper>
                  <DatePickerCustom popperPlacement={popperPlacement} />
                </DatePickerWrapper>
                <Box mt={8}>
                  <Button
                    size='medium'
                    disabled={reports.length ? false : true}
                    variant='contained'
                    onClick={() => exportExcel()}
                  >
                    Export to Excel
                  </Button>
                </Box>
              </Box>

              {findPath && (
                <Grid item flexDirection={'row'} display={'flex'}>
                  <Grid item>
                    <Link href='/daily-report/create' passHref>
                      <Button sx={{ mt: 8, mr: 10 }} variant='contained'>
                        Create
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Grid>
            {/* <DataGrid
              sx={{ mt: 10 }}
              autoHeight
              pagination
              rowHeight={62}
              getRowId={row => row._id}
              rows={reports}
              loading={loading}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            /> */}

            <TableData operationReport={operationReport} dailyReports={dailyReport} />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default DailyReport
