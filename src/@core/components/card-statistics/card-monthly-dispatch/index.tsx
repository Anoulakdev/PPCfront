/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Type Import
import { CardMonthlyDispatchProps } from 'src/@core/components/card-statistics/types'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import { useState } from 'react'
import { Declaration, Dispatch } from '../../../../lib/__generated__/graphql'

const CardMonthlyDispatch = (props: CardMonthlyDispatchProps) => {
  // Current month
  const [currentMonth] = useState(new Date().toLocaleString('en-US', { month: 'long' }))
  const [lastMonth, setLastMonth] = useState<string>('')

  // ** Props
  const {
    sx,
    title2,

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

  // Generate last month
  useState(() => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const lastMonthDate = new Date(year, month - 1)

    const lastMonth = lastMonthDate.toLocaleString('en-US', { month: 'long' })
    setLastMonth(lastMonth)
  })

  return (
    <Card>
      <CardContent sx={{ p: theme => `${theme.spacing(5)} !important` }}>
        <Box sx={{ gap: 2, mb: 5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              This month:{currentMonth}
            </Typography>
            <Typography variant='h4'>{`${trendDiff}MWh`}</Typography>
          </div>
          {/* <Typography sx={{ fontWeight: 500, color: 'success.main' }}>{`${increase}%`}</Typography> */}
        </Box>
        <Box sx={{ mb: 3.5, gap: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ py: 2.25, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>This month: {currentMonth}</Typography>
            </Box>
            <Typography variant='h5'>{`${trendDiff}MWh`}</Typography>
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
              <Typography sx={{ mr: 1.5, color: 'text.secondary' }}>lastmonth: {lastMonth}</Typography>
            </Box>
            <Typography variant='h5'>{`${value}MWh`}</Typography>
          </Box>
        </Box>
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

export default CardMonthlyDispatch
