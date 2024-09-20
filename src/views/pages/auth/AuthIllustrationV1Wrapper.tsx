// ** MUI Components
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Styled Components
const AuthIllustrationV1Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  position: 'relative',
  backgroundImage: `url('/images/pages/_MG_1557.jpg')`,
  [theme.breakpoints.up('lg')]: {
    '&:before': {
      zIndex: -1,
      top: '-79px',
      content: '""',
      left: '-46px',
      width: '238px',
      height: '234px',
      position: 'absolute',
      backgroundImage: `url('/images/pages/_MG_1557.jpg')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center'
    }
  }
}))

export default AuthIllustrationV1Wrapper
