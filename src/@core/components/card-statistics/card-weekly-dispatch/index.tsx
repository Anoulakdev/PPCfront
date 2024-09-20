/* eslint-disable newline-before-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Type Import
import { CardWeeklyDispatchProps } from 'src/@core/components/card-statistics/types'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { Divider, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'

const getWeek = (date: string | number | Date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7))
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
}

const CardWeeklyDispatch = (props: CardWeeklyDispatchProps) => {
  // ** Props
  const {
    sx,
    title2,
    increase,
    stats,
    title,
    value,
    subtitle,
    trendDiff,
    iconSize = 24,
    avatarSize = 38,
    trend = 'positive',
    avatarColor = 'primary'
  } = props

  const [currentWeek, setCurrentWeek] = useState('')
  const [lastWeek, setLastWeek] = useState('')
  const [weekCount, setWeekCount] = useState('')

  useEffect(() => {
    const currentDate = new Date()
    const week = getWeek(currentDate)
    setCurrentWeek(week.toString())
    setLastWeek((week - 1).toString())
    setWeekCount('52') // Assuming 52 weeks in a year
  }, [])

  return (
    <Card>
      <CardContent sx={{ p: theme => `${theme.spacing(5)} !important` }}>
        <Box sx={{ gap: 2, mb: 5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              This week: {currentWeek}
            </Typography>
            <Typography variant='h4'>{`${trendDiff}Mw`}</Typography>
          </div>
          <Typography sx={{ fontWeight: 500, color: 'success.main' }}>{`${increase}%`}</Typography>
        </Box>
        <Box sx={{ mb: 3.5, gap: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ py: 2.25, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>This week: {currentWeek}</Typography>
            </Box>
            <Typography variant='h5'>{`${trendDiff}Mw`}</Typography>
          </Box>
          <Divider flexItem sx={{ m: 0 }} orientation='vertical'>
            <CustomAvatar
              skin='light'
              color='secondary'
              sx={{ height: 24, width: 24, fontSize: '0.6875rem', color: 'text.secondary' }}
            >
              VS
            </CustomAvatar>
          </Divider>
          <Box sx={{ py: 2.25, display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1.5, color: 'text.secondary' }}>Last Week: {lastWeek}</Typography>
            </Box>
            <Typography variant='h5'>{`${value}Mw`}</Typography>
          </Box>
        </Box>

        <Typography variant='h6'>Total Weeks in Year: {weekCount}</Typography>
        <LinearProgress
          value={65}
          color='info'
          variant='determinate'
          sx={{
            height: 10,
            '&.MuiLinearProgress-colorInfo': { backgroundColor: 'primary.main' },
            '& .MuiLinearProgress-bar': {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            }
          }}
        />
      </CardContent>
    </Card>
  )
}

export default CardWeeklyDispatch
