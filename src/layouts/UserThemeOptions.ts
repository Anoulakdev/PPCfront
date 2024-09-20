// ** MUI Imports
import { ThemeOptions } from '@mui/material'

// ** To use core palette, uncomment the below import
// import { PaletteMode } from '@mui/material'

// ** To use core palette, uncomment the below import
// import corePalette from 'src/@core/theme/palette'

// ** To use mode (light/dark/semi-dark), skin(default/bordered), direction(ltr/rtl), etc. for conditional styles, uncomment below line
// import { useSettings } from 'src/@core/hooks/useSettings'

const UserThemeOptions = (): ThemeOptions => {
  // ** To use mode (light/dark/semi-dark), skin(default/bordered), direction(ltr/rtl), etc. for conditional styles, uncomment below line
  // const { settings } = useSettings()

  // ** To use mode (light/dark/semi-dark), skin(default/bordered), direction(ltr/rtl), etc. for conditional styles, uncomment below line
  // const { mode, skin } = settings

  // ** To use core palette, uncomment the below line
  // const palette = corePalette(mode as PaletteMode, skin)

  return {
    palette: {
      primary: {
        light: '#0275d8',
        main: '#0275d8',
        dark: '#0275d8'
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1920
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            textTransform: 'none'
          },
          sizeSmall: {
            padding: '6px 16px'
          },
          sizeMedium: {
            padding: '8px 20px'
          },
          sizeLarge: {
            padding: '11px 24px'
          },
          textSizeSmall: {
            padding: '7px 12px'
          },
          textSizeMedium: {
            padding: '9px 16px'
          },
          textSizeLarge: {
            padding: '12px 16px'
          }
        }
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: '16px 24px'
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '32px 24px',
            '&:last-child': {
              paddingBottom: '32px'
            }
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box'
          },
          html: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          '#__next': {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          }
        }
      }
    },
    shape: {
      borderRadius: 8
    },
    typography: {
      fontFamily:
        '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
    },

    zIndex: {
      appBar: 1200,
      drawer: 1100
    }
  }
}

export default UserThemeOptions
