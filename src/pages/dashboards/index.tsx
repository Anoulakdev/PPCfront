/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports

import Chart from 'src/views/dashboards/Chart'

// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useTheme } from '@mui/material/styles'
import CardDailyDispatch from 'src/@core/components/card-statistics/card-daily-dispatch'

import moment from 'moment'

import { useMutation, useQuery } from '@apollo/client'
import { SUMMARY_ENERGY } from '@/lib/query'
import { FormatDate, GetDay, GetEndMonth, GetEndYear, GetStartMonth, GetStartYear } from 'src/@core/utils/date-time'

const Dashboard = () => {
  const dateNow = new Date()
  const theme = useTheme()
  const { direction } = theme

  // Data
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
  const { data: yearlyEnergy } = useQuery(SUMMARY_ENERGY, {
    variables: {
      queryInput: {
        dateFillter: {
          startDate: GetStartYear(),
          endDate: GetEndYear()
        }
      }
    }
  })

  const diadlyEnergyData = dailyEnergy?.summaryEnergy ? dailyEnergy.summaryEnergy : null
  const monthlyEnergyData = monthlyEnergy?.summaryEnergy ? monthlyEnergy.summaryEnergy : null
  const yearlyEnergyData = yearlyEnergy?.summaryEnergy ? yearlyEnergy.summaryEnergy : null

  // console.log('diadlyEnergyData====>', diadlyEnergyData)
  // console.log('monthlyEnergyData====>', monthlyEnergyData)
  // console.log('yearlyEnergyData====>', yearlyEnergyData)

  const progress = (originTotal: number, total: number): number => {
    return (total * 100) / originTotal
  }

  return (
    <ApexChartWrapper>
      <var></var>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item sm={6} lg={4} xs={12}>
            <CardDailyDispatch
              icon={''}
              stats={'20'}
              title={'Today'}
              subtitle={FormatDate(GetDay())}
              increase={'--'}
              title2={'Last day'}
              trendDiff={diadlyEnergyData?.declaration + ''}
              value={diadlyEnergyData?.dispatch}
              progress={progress(diadlyEnergyData?.declaration || 0, diadlyEnergyData?.dispatch || 0) || 0}
            />
          </Grid>
          <Grid item sm={6} lg={4} xs={12}>
            <CardDailyDispatch
              icon={''}
              stats={'20'}
              title={'Month'}
              subtitle={`${FormatDate(GetStartMonth())} - ${FormatDate(GetDay())}`}
              increase={'-10'}
              title2={'Last day'}
              trendDiff={monthlyEnergyData?.declaration + ''}
              value={monthlyEnergyData?.dispatch}
              progress={progress(monthlyEnergyData?.declaration || 0, diadlyEnergyData?.dispatch || 0) || 0}
            />
          </Grid>
          <Grid item sm={6} lg={4} xs={12}>
            <CardDailyDispatch
              icon={''}
              stats={'50'}
              title={'Year'}
              subtitle={`${FormatDate(GetStartYear())} - ${FormatDate(GetDay())}`}
              increase={'+50'}
              title2={'Last day'}
              trendDiff={yearlyEnergyData?.declaration + ''}
              value={yearlyEnergyData?.dispatch}
              progress={progress(yearlyEnergyData?.declaration || 0, diadlyEnergyData?.dispatch || 0) || 0}
            />
          </Grid>

          <Grid item xs={12}>
            <Chart />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default Dashboard
