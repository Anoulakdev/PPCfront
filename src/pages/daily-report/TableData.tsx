/* eslint-disable newline-before-return */
import React from 'react'
import { useState, SyntheticEvent } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import { ExcelPowerType, ExcelType } from '@/globalState'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '& .MuiTableCell-root': {
      borderLeft: '1px solid rgba(224, 224, 224, 1)',
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      borderTop: '1px solid rgba(224, 224, 224, 1)'
    }
  }
})

type Props = {
  operationReport: ExcelPowerType[] | []
  dailyReports: ExcelType[] | []
}

const headersOperationReport: string[] = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
]
const headersDaiyReport: string[] = [
  'Water Level',
  'Diff with Yesterday',
  'Diff with Full',
  'Potential Water Storage',
  'Active Storage',
  'Inflow',
  'OutFlow',
  'Spill Way',
  'Other Water Released',
  'Rain fall',
  'Net Energy Output (NEO)',
  'Water Rate'
]
const subHeadersDaiyReport: string[] = [
  'masl',
  'm',
  'm',
  'MCM',
  'MCM',
  '(%)',
  'm3/s',
  'MCM',
  'm3/s',
  'MCM',
  'm3/s',
  'MCM',
  'm3/s',
  'MCM',
  'mm',
  'KWh',
  'm3/kwh'
]

// const headersDaiyReport: string[] = ['Rain fall', 'Net Energy Output (NEO)', 'Water Rate']

const TableData = ({ operationReport, dailyReports }: Props) => {
  const classes = useStyles()
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const renderDailyReportHeader = (
    <TableHead>
      <TableRow>
        <TableCell align='center' rowSpan={2} sx={{ color: 'black' }}>
          Date
        </TableCell>
        <TableCell align='center' rowSpan={2} sx={{ color: 'black' }}>
          Customer
        </TableCell>
        {headersDaiyReport.map((data, index) => (
          <TableCell key={index} colSpan={index > 3 && index <= 8 ? 2 : 0}>
            <Box
              sx={{
                display: 'flex',
                whiteSpace: 'nowrap',

                // ml: 1,
                textTransform: 'capitalize',
                '& svg': { ml: 1, cursor: 'pointer' },
                color: theme => theme.palette.text.primary,
                fontSize: theme => theme.typography.body2,
                fontWeight: 'bold',
                alignContent: 'center',
                justifyContent: 'center'
              }}
            >
              {data}
            </Box>
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        {subHeadersDaiyReport.map((data, colIndex) => (
          <TableCell key={colIndex} align='center'>
            {data}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )

  const renderOperationReport = (
    <TableHead>
      <TableRow>
        <TableCell align='center' rowSpan={2}>
          Date
        </TableCell>
        <TableCell align='center' rowSpan={2} sx={{ color: 'black' }}>
          Customer
        </TableCell>
        {headersOperationReport.map((data, index) => (
          <TableCell key={index}>
            <Box
              sx={{
                display: 'flex',
                whiteSpace: 'nowrap',

                // ml: 1,
                textTransform: 'capitalize',
                '& svg': { ml: 1, cursor: 'pointer' },
                color: theme => theme.palette.text.primary,
                fontSize: theme => theme.typography.h6.fontSize
              }}
            >
              {data}
            </Box>
          </TableCell>
        ))}
        <TableCell>
          <Box
            sx={{
              display: 'flex',
              whiteSpace: 'nowrap',

              // ml: 1,
              textTransform: 'capitalize',
              '& svg': { ml: 1, cursor: 'pointer' },
              color: theme => theme.palette.text.secondary,
              fontSize: theme => theme.typography.h6.fontSize
            }}
          >
            Event Remarks
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        {[...Array(24)].map((_, colIndex) => (
          <TableCell key={colIndex} align='center'>
            MW
            {/* </Box> */}
          </TableCell>
        ))}
        <TableCell>
          <Box
            sx={{
              display: 'flex',
              whiteSpace: 'nowrap',

              // ml: 1,
              textTransform: 'capitalize',
              '& svg': { ml: 1, cursor: 'pointer' },
              color: theme => theme.palette.text.secondary,
              fontSize: theme => theme.typography.h6.fontSize
            }}
          ></Box>
        </TableCell>
      </TableRow>
    </TableHead>
  )

  const renderOperationReportBody = operationReport.length
    ? operationReport.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.a}</TableCell>
          <TableCell align='center'>{row.b}</TableCell>
          <TableCell align='center'>{row.c}</TableCell>
          <TableCell align='center'>{row.d}</TableCell>
          <TableCell align='center'>{row.e}</TableCell>
          <TableCell align='center'>{row.f}</TableCell>
          <TableCell align='center'>{row.g}</TableCell>
          <TableCell align='center'>{row.h}</TableCell>
          <TableCell align='center'>{row.i}</TableCell>
          <TableCell align='center'>{row.j}</TableCell>
          <TableCell align='center'>{row.k}</TableCell>
          <TableCell align='center'>{row.l}</TableCell>
          <TableCell align='center'>{row.m}</TableCell>
          <TableCell align='center'>{row.n}</TableCell>
          <TableCell align='center'>{row.o}</TableCell>
          <TableCell align='center'>{row.p}</TableCell>
          <TableCell align='center'>{row.q}</TableCell>
          <TableCell align='center'>{row.r}</TableCell>
          <TableCell align='center'>{row.s}</TableCell>
          <TableCell align='center'>{row.t}</TableCell>
          <TableCell align='center'>{row.u}</TableCell>
          <TableCell align='center'>{row.v}</TableCell>
          <TableCell align='center'>{row.w}</TableCell>
          <TableCell align='center'>{row.x}</TableCell>
          <TableCell align='center'>{row.y}</TableCell>
          <TableCell align='center'>{row.z}</TableCell>
          <TableCell align='center'>{row.aa}</TableCell>
        </TableRow>
      ))
    : null
  const renderDailyReportBody = dailyReports.length
    ? dailyReports.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.a}</TableCell>
          <TableCell align='center'>{row.b}</TableCell>
          <TableCell align='center'>{row.c}</TableCell>
          <TableCell align='center'>{row.d}</TableCell>
          <TableCell align='center'>{row.e}</TableCell>
          <TableCell align='center'>{row.f}</TableCell>
          <TableCell align='center'>{row.g}</TableCell>
          <TableCell align='center'>{row.h}</TableCell>
          <TableCell align='center'>{row.i}</TableCell>
          <TableCell align='center'>{row.j}</TableCell>
          <TableCell align='center'>{row.k}</TableCell>
          <TableCell align='center'>{row.l}</TableCell>
          <TableCell align='center'>{row.m}</TableCell>
          <TableCell align='center'>{row.n}</TableCell>
          <TableCell align='center'>{row.o}</TableCell>
          <TableCell align='center'>{row.p}</TableCell>
          <TableCell align='center'>{row.q}</TableCell>
          <TableCell align='center'>{row.r}</TableCell>
          <TableCell align='center'>{row.s}</TableCell>
        </TableRow>
      ))
    : null

  return (
    <>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='simple tabs example'>
          <Tab value='1' label='Daily Report' />
          <Tab value='2' label='Daily Operation' />
        </TabList>
        <TabPanel value='1'>
          <TableContainer component={Paper} sx={{ overflowX: 'scroll' }}>
            <Table className={classes.table}>
              {renderDailyReportHeader}
              <TableBody>{renderDailyReportBody}</TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value='2'>
          <TableContainer component={Paper} sx={{ overflowX: 'scroll' }}>
            <Table className={classes.table} stickyHeader aria-label='sticky table'>
              {renderOperationReport}
              <TableBody>{renderOperationReportBody}</TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
    </>
  )
}

export default TableData
