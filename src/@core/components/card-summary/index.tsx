/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Type Import
import { CardDailyDispatchProps, CardSummaryProps } from 'src/@core/components/card-statistics/types'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Divider from '@mui/material/Divider'

const CardSummary = (props: CardSummaryProps) => {
  // ** Props
  const { sx, icon, title, subtitle, declaration, dispatch, iconSize, progress } = props

  // Get the current day
  const today = new Date()
  const day = today.getDate()

  // Get the yesterday

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const progressData = () => {
    if (Number(declaration) && Number(dispatch)) {
      return (Number(dispatch) * 100) / Number(declaration)
    } else {
      return 0
    }
  }

  return (
    <Card>
      <CardContent sx={{ p: theme => `${theme.spacing(5)} !important` }}>
        <Box sx={{ gap: 2, mb: 5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <Typography sx={{ fontSize: 24, fontWeight: 'bold', mt: -2 }} variant='h5'>{`${title}`}</Typography>
          </div>
          <Typography sx={{ fontWeight: 300, color: 'primary.main', fontSize: 11 }}>{subtitle}</Typography>
        </Box>
        <Box sx={{ mb: 3.5, gap: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ py: 2.25, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1.5, color: 'text.secondary' }}> Dispatch</Typography>
            </Box>
            <Typography variant='h6'>{`${Number(dispatch).toLocaleString()} MWh`}</Typography>
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
              <Typography sx={{ color: 'text.secondary' }}>Declaration</Typography>
            </Box>
            <Typography variant='h6'>{`${Number(declaration).toLocaleString()} MWh`}</Typography>
          </Box>
        </Box>
        <LinearProgress
          value={progressData() || 0}
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

export default CardSummary
