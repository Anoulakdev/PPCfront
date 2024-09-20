// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Type Import
import { CardAlldocumentProps } from 'src/@core/components/card-statistics/types'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

const CardAlldocument = (props: CardAlldocumentProps) => {
  // ** Props
  const {
    sx,

    stats,
    title,

    trendDiff,
    iconSize = 24,
    avatarSize = 38,
    trend = 'positive',
    avatarColor = 'primary'
  } = props

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: 'text.secondary' }}>{title}</Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h4'>{stats}</Typography>
            <Typography
              sx={{ color: trend === 'negative' ? 'error.main' : 'success.main' }}
            >{`${trendDiff}MWh`}</Typography>
          </Box>
        </Box>
        <CustomAvatar skin='light' variant='rounded' color={avatarColor} sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon='material-symbols:edit-document-outline-rounded' fontSize={iconSize} />
        </CustomAvatar>
      </CardContent>
    </Card>
  )
}

export default CardAlldocument
