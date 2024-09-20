// ** Types
import { ApexOptions } from 'apexcharts'
import { ChipProps } from '@mui/material/Chip'
import { SxProps, Theme } from '@mui/material'
import { ThemeColor } from 'src/@core/layouts/types'

export type CardStatsSquareProps = {
  icon: string
  stats: string
  title: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
}

export type CardStatsHorizontalProps = {
  icon: string
  stats: string
  title: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
}

export type CardAlldocumentProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
}
export type CardDailyDeclarProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
  increase: any
  title2: any
  value: any
}
export type CardDailyDispatchProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
  increase: any
  title2: any
  value: any
  progress: number
}
export type CardDashboardProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
}
export type CardWeeklyDeclarProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
  increase: any
  title2: any
  value: any
}
export type CardWeeklyDispatchProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
  increase: any
  title2: any
  value: any
}
export type CardDailyReportProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
  increase: any
  title2: any
  value: any
}
export type CardWeeklyReportProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
  increase: any
  title2: any
  value: any
}

export type CardMonthlyDeclarProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
  increase: any
  title2: any
  value: any
}
export type CardMonthlyDispatchProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
  increase: any
  title2: any
  value: any
}

export type CardMonthlyReportProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
  increase: any
  title2: any
  value: any
}
export type CardStatsWithAreaChartProps = {
  stats: string
  title: string
  avatarIcon: string
  sx?: SxProps<Theme>
  avatarSize?: number
  chartColor?: ThemeColor
  avatarColor?: ThemeColor
  avatarIconSize?: number | string
  chartSeries: ApexOptions['series']
}

export type CardStatsVerticalProps = {
  stats: string
  title: string
  chipText: string
  subtitle: string
  avatarIcon: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  chipColor?: ChipProps['color']
}

export type CardStatsHorizontalWithDetailsProps = {
  icon: string
  stats: string
  title: string
  subtitle: string
  trendDiff: string
  sx?: SxProps<Theme>
  avatarSize?: number
  avatarColor?: ThemeColor
  iconSize?: number | string
  trend?: 'positive' | 'negative'
}

export type CardSummaryProps = {
  sx?: SxProps<Theme>
  icon?: string
  title: string
  subtitle: string
  declaration: string
  dispatch: string
  iconSize?: number | string
  progress?: number
}
