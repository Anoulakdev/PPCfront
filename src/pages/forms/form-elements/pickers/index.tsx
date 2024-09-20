// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { ReactDatePickerProps } from 'react-datepicker'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports

import PickersMinMax from 'src/views/forms/form-elements/pickers/PickersMinMax'
import PickersLocale from 'src/views/forms/form-elements/pickers/PickersLocale'
import PickersOptions from 'src/views/forms/form-elements/pickers/PickersOptions'

import PickersIncludeExclude from 'src/views/forms/form-elements/pickers/PickersIncludeExclude'
import PickersMonthYearQuarter from 'src/views/forms/form-elements/pickers/PickersMonthYearQuarter'
import PickersMonthYearDropdowns from 'src/views/forms/form-elements/pickers/PickersMonthYearDropdowns'

// ** Source code imports
import * as source from 'src/views/forms/form-elements/pickers/PickersSourceCode'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ReactDatePicker = () => {
  // ** Hook
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <PageHeader
          subtitle={
            <Typography sx={{ color: 'text.secondary' }}>
              A simple and reusable datepicker component for React
            </Typography>
          }
          title={
            <Typography variant='h4'>
              <LinkStyled href='https://github.com/Hacker0x01/react-datepicker/' target='_blank'>
                React DatePicker
              </LinkStyled>
            </Typography>
          }
        />

        <Grid item xs={12}>
          <CardSnippet
            title='Min & Max Pickers'
            code={{ tsx: source.PickersMinMaxTSXCode, jsx: source.PickersMinMaxJSXCode }}
          >
            <PickersMinMax popperPlacement={popperPlacement} />
          </CardSnippet>
        </Grid>

        <Grid item xs={12}>
          <CardSnippet
            title='Include Exclude'
            code={{ tsx: source.PickersIncludeExcludeTSXCode, jsx: source.PickersIncludeExcludeJSXCode }}
          >
            <PickersIncludeExclude popperPlacement={popperPlacement} />
          </CardSnippet>
        </Grid>
        <Grid item xs={12}>
          <CardSnippet title='Locale' code={{ tsx: source.PickersLocaleTSXCode, jsx: source.PickersLocaleJSXCode }}>
            <PickersLocale popperPlacement={popperPlacement} />
          </CardSnippet>
        </Grid>
        <Grid item xs={12}>
          <CardSnippet
            title='Month & Year Dropdowns'
            code={{ tsx: source.PickersMonthYearDropdownsTSXCode, jsx: source.PickersMonthYearDropdownsJSXCode }}
          >
            <PickersMonthYearDropdowns popperPlacement={popperPlacement} />
          </CardSnippet>
        </Grid>
        <Grid item xs={12}>
          <CardSnippet
            title='Month, Year & Quarter'
            code={{ tsx: source.PickersMonthYearQuarterTSXCode, jsx: source.PickersMonthYearQuarterJSXCode }}
          >
            <PickersMonthYearQuarter popperPlacement={popperPlacement} />
          </CardSnippet>
        </Grid>
        <Grid item xs={12}>
          <CardSnippet title='Options' code={{ tsx: source.PickersOptionsTSXCode, jsx: source.PickersOptionsJSXCode }}>
            <PickersOptions popperPlacement={popperPlacement} />
          </CardSnippet>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default ReactDatePicker
