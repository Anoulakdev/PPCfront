// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant='caption'>
        {`© ${new Date().getFullYear()} Made with `}
        <Box component='span' sx={{ color: 'error.main' }}>
          <img style={{ width: '16px', height: '16px' }} src='/images/hh.png' alt='logo' />
        </Box>
        {` by `}
        <Link target='_blank' href='https://edl.com.la/'>
          EDL ICT
        </Link>
        {`  V1.0.1 `}
      </Typography>

      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}></Box>
      )}
    </Box>
  )
}

export default FooterContent
