/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import { styled } from '@mui/material/styles'
import { DayPowerPurchase } from '@/__generated__/graphql'
import { formatDate, formatDateToMonthShort } from 'src/@core/utils/format'

const Timeline = styled(MuiTimeline)<TimelineProps>({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const AcknowlegeUser = (data: DayPowerPurchase) => {
  const currentTime = new Date().toLocaleTimeString()

  return (
    <Card>
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
                {/* <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {data?.updatedAt ? formatDate(data?.updatedAt) : '--'}
                </Typography> */}
              </Box>
              <Typography variant='body2' sx={{ mb: 3 }}>
                {`Company: ${data?.disCustomerId.name || '--'}`}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src='/images/avatars/16.png' sx={{ mr: 3, width: 38, height: 38 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.primary' }}>
                    {`${data?.disUserId?.fName || '-'} ${data?.disUserId?.lName || '-'}`}
                  </Typography>
                  <Typography variant='caption'>
                    {data?.updatedAt && data?.disUserId ? formatDate(data?.updatedAt) : '--'}
                  </Typography>
                  <Typography>
                    {data?.updatedAt && data?.disUserId ? formatDateToMonthShort(data?.updatedAt) : '--'}
                  </Typography>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              {/* <TimelineConnector /> */}
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
                {/* <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {data?.updatedAt ? formatDate(data?.updatedAt) : '--'}
                </Typography> */}
              </Box>
              <Typography variant='body2' sx={{ mb: 3 }}>
                {`Company: ${data?.decCustomerId.name || '--'}`}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src='/images/avatars/16.png' sx={{ mr: 3, width: 38, height: 38 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.primary' }}>
                    {`Name: ${data?.decUserId.fName || '-'} ${data?.decUserId.lName || '-'}`}
                  </Typography>
                  <Typography variant='caption'>{data?.updatedAt ? formatDate(data?.updatedAt) : '--'}</Typography>
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default AcknowlegeUser
