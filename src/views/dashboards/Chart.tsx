/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Styled Component

// ** Demo Components Imports

import ChartjsLineChart from 'src/views/charts/DashboardChart'

// ** Third Party Styles Import
import 'chart.js/auto'

const Chart = () => {
  // ** Hook
  const theme = useTheme()
  const { direction } = theme

  // Vars
  const whiteColor = '#fff'

  const lineChartYellow = 'red'

  const lineChartPrimary = '#0275d8'
  const lineChartWarning = '#ff9800'

  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <ChartjsLineChart
          white={whiteColor}
          labelColor={labelColor}
          success={lineChartYellow}
          borderColor={borderColor}
          legendColor={legendColor}
          primary={lineChartPrimary}
          warning={lineChartWarning}
        />
      </Grid>
    </Grid>
  )
}

export default Chart
