/* eslint-disable react/jsx-no-undef */
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Type Import
import { CardDashboardProps } from 'src/@core/components/card-statistics/types'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

const CardDashboard = (props: CardDashboardProps) => {
  // ** Props
  const {
    sx,

    stats,
    title,
    subtitle,
    trendDiff,
    iconSize = 24,
    avatarSize = 38,
    avatarColor = 'primary',
    trend = 'positive'
  } = props

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: 'text.secondary' }}>{title}</Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h4'>{stats}</Typography>
            <Typography
              sx={{ color: trend === 'negative' ? 'error.main' : 'success.main', textTransform: 'capitalize' }}
            >{`${trendDiff}MWh`}</Typography>
          </Box>
          <Typography variant='h6' sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        </Box>
        <CustomAvatar skin='light' variant='rounded' color={avatarColor} sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon='material-symbols:electric-bolt-rounded' fontSize={iconSize} />
        </CustomAvatar>
      </CardContent>
    </Card>
  )
}

export default CardDashboard
