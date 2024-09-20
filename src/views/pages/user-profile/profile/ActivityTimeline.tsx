// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import OptionsMenu from 'src/@core/components/option-menu'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const ActivityTimeline = () => {
  return (
    <Card>
      <CardHeader
        title='Activity Timeline'
        sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
        titleTypographyProps={{ sx: { color: 'text.primary' } }}
        avatar={<Icon fontSize='1.25rem' icon='tabler:list-details' />}
        action={
          <OptionsMenu
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
            options={['Share timeline', 'Suggest edits', { divider: true }, 'Report bug']}
          />
        }
      />
      <CardContent>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='warning' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='h6' sx={{ mr: 2 }}>
                  Issued by EDL
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Today
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 3 }}>
                Name: Phin
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src='/images/avatars/16.png' sx={{ mr: 3, width: 38, height: 38 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.primary' }}>
                    Saiphin
                  </Typography>
                  <Typography variant='caption'>ICT</Typography>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant='h6' sx={{ mr: 2 }}>
                  Acknowleged:
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Today
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 3 }}>
                Name: Shing
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src='/images/avatars/16.png' sx={{ mr: 3, width: 38, height: 38 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.primary' }}>
                    Saiphin
                  </Typography>
                  <Typography variant='caption'>ICT</Typography>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ActivityTimeline
