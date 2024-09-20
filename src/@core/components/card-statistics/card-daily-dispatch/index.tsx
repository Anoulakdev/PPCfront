/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Type Import
import { CardDailyDispatchProps } from 'src/@core/components/card-statistics/types'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'

const CardDailyDispatch = (props: CardDailyDispatchProps) => {
  // ** Props
  const {
    sx,
    title2,

    // increase,
    stats,
    title,
    value,
    subtitle,
    trendDiff,
    iconSize = 24,
    avatarSize = 38,
    trend = 'positive',
    avatarColor = 'primary',
    progress
  } = props

  // Get the current day
  const today = new Date()
  const day = today.getDate()

  // Get the yesterday

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  return (
    <Card>
      <CardContent sx={{ p: theme => `${theme.spacing(5)} !important` }}>
        <Box sx={{ gap: 2, mb: 5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            {/* <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              {today.toDateString()}
            </Typography> */}
            <Typography sx={{ fontSize: 24, fontWeight: 'bold', mt: -2 }} variant='h5'>{`${title}`}</Typography>
          </div>
          <Typography sx={{ fontWeight: 300, color: 'primary.main', fontSize: 11 }}>{subtitle}</Typography>
        </Box>
        <Box sx={{ mb: 3.5, gap: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ py: 2.25, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>Declaration</Typography>
            </Box>
            <Typography variant='h6'>{`${Number(trendDiff).toLocaleString()} MWh`}</Typography>
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
              <Typography sx={{ mr: 1.5, color: 'text.secondary' }}> Dispatch</Typography>
            </Box>
            <Typography variant='h6'>{`${Number(value).toLocaleString()} MWh`}</Typography>
          </Box>
        </Box>
        {/* <LinearProgress
          value={progress}
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
        /> */}
      </CardContent>
    </Card>
  )
}

export default CardDailyDispatch
