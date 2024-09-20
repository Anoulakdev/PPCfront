/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import List, { ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import * as NumberFormat from 'react-number-format'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const NumberFormatComponent = NumberFormat.NumericFormat || NumberFormat

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { POWER_SOURCES, WEEK_DEC } from '@/lib/query'
import { MONTH_CREATE_DECLARATION } from '@/lib/mutation'
import { CustomerDataType } from 'src/types/customerType'
import CustomTextField from 'src/@core/components/mui/text-field'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'

const HorizontalList = styled(List)<ListProps>(({ theme }) => ({
  padding: 0,
  display: 'flex',
  borderRadius: 6,
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiListItem-root': {
    padding: theme.spacing(5),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  [theme.breakpoints.down('md')]: {
    display: 'block',
    '& .MuiListItem-root': {
      '&:not(:last-of-type)': {
        borderRight: 0,
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  }
}))

const rolesArr: string[] = Array.from(Array(24), (_, i) => {
  const startHour = i.toString().padStart(2, '0')
  const endHour = ((i + 1) % 24).toString().padStart(2, '0')

  return `${startHour}:00-${endHour}:00`
})

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}
const date = new Date()
const currentYear = date.getFullYear()
const currentMonth = date.getMonth() + 1
const unit = getDaysInMonth(currentYear, currentMonth)
const steps = [
  {
    title: 'Power Source',
    subtitle: 'Select Power Source'
  },
  {
    title: 'Declaration',
    subtitle: 'Daily Availability Declaration'
  }
]

type PowerSource = {
  powerSource: CustomerDataType | null
}
type DataDetail = {
  _id: string
  abbreviation: string
  address: string
  company: string
  name: string
  phone: string
}

const powerSourceValues: PowerSource = {
  powerSource: null
}

const powerSourceSchema = yup.object().shape({
  powerSource: yup.object().required()
})

const StepperLinearWithValidation = () => {
  const router = useRouter()

  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)
  const [declaration, setDeclaration] = useState<DataDetail | null>(null)
  const [dispatch, setDispatch] = useState<DataDetail | null>(null)
  const [unitValues, setUnitValues] = useState(Array(rolesArr.length * unit).fill('0'))

  // Query
  const { data: powerSources } = useQuery(POWER_SOURCES)
  const powerSourceData = powerSources?.getPowerSources ? powerSources?.getPowerSources : []

  // ** Mutation
  const [createMonthPowerPurchase, { loading: createLoading }] = useMutation(MONTH_CREATE_DECLARATION, {
    onCompleted: data => {
      if (data.createMonthPowerPurchase) {
        setDeclaration(data.createMonthPowerPurchase.decCustomerId)
        setDispatch(data.createMonthPowerPurchase.disCustomerId)
        toast.success('Declaration Successfully')
      }
    },
    refetchQueries: [
      {
        query: WEEK_DEC,
        variables: {
          queryInput: {
            pageginate: { limit: 10, page: 0 }
          }
        }
      }
    ]
  })
  const loading = createLoading

  // ** Hooks
  const {
    reset: powerSourceReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    watch: watchPowerSource,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: powerSourceValues,
    resolver: yupResolver(powerSourceSchema)
  })

  // static data
  const powerSource = watchPowerSource('powerSource')

  const [remarks, setRemark] = useState(Array(rolesArr.length).fill(''))
  const [remark, setRemarkData] = useState('')

  useEffect(() => {
    if (powerSource) {
      setUnitValues(Array(rolesArr.length * unit).fill('0'))
    }
  }, [powerSource])

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
    powerSourceReset()
  }
  const onSubmit = async () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      const valueData: string[][] = []
      let roles: number[] = []
      Array.from(Array(unit), (d, dIndex) => {
        Array.from(Array(24), (_, i) => {
          if (roles.length < 24) {
            roles.push(dIndex + unit * i)
          }
        })
        const dd: string[] = []
        roles.map(r => {
          dd.push(unitValues[r])
        })
        valueData.push(dd)
        roles = []
      })
      const powerDetail = valueData.map((value, index) => ({
        powers: value,
        title: `Unit-${index + 1}`
      }))

      const newData = {
        customerId: powerSource?._id || '',
        powerDetail,
        powers: unitValues,
        remarks,
        remark
      }

      // console.log('newData===>', newData)
      // console.log('Total Unit===>', unitValues)
      // console.log(total())
      try {
        await createMonthPowerPurchase({
          variables: {
            createMonthPowerPurchaseInput: newData
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUnitChange = (index: number, value: string) => {
    const parsedValue = Math.abs(Number(value))

    const updatedUnitValues = [...unitValues]
    updatedUnitValues[index] = String(parsedValue)
    const roles: number[] = []
    Array.from(Array(24), (_, i) => {
      roles.push(index + unit * i)
    })

    const curr: number[] = []
    roles.map(r => {
      if (r < rolesArr.length * unit) {
        curr.push(r)
      }
    })
    curr.map(e => {
      updatedUnitValues[e] = String(parsedValue)
    })
    setUnitValues(updatedUnitValues)
  }
  const handleRemark = (index: number, value: string) => {
    // console.log(`index: ${index}, value: ${value}`)

    const updatedRemarkValues = [...remarks]
    updatedRemarkValues[index] = String(value)
    setRemark(updatedRemarkValues)
  }

  const total = () => {
    const valueData: string[][] = []
    let roles: number[] = []
    Array.from(Array(unit), (d, dIndex) => {
      Array.from(Array(24), (_, i) => {
        if (roles.length < 24) {
          roles.push(dIndex + unit * i)
        }
      })
      const dd: string[] = []
      roles.map(r => {
        dd.push(unitValues[r])
      })
      valueData.push(dd)
      roles = []
    })
    const total = valueData.map(r => {
      return r.reduce((a, b) => {
        return Number(a) + Number(b)
      }, 0)
    })

    return total
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='powerSource'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { ...field }, fieldState: { error } }) => (
                      <CustomAutocomplete
                        size='medium'
                        id='autocomplete-custom'
                        options={powerSourceData as CustomerDataType[]}
                        getOptionLabel={option => option?.company || ''}
                        onChange={(event, value) => field.onChange(value)}
                        value={field.value || null}
                        renderInput={params => (
                          <CustomTextField
                            {...params}
                            label='Select Powersource'
                            placeholder='Select Powersource'
                            {...field}
                            error={!!error}

                            // helperText={error?.message}
                          />
                        )}
                      />
                    )}
                  />
                  {accountErrors.powerSource && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-account-username'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='primary' onClick={() => router.back()}>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={2} onSubmit={onSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <TableContainer sx={{ border: 'none', mt: 1 }}>
                <Table stickyHeader size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: '0 !important', position: 'sticky', top: 0, left: 0, zIndex: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            whiteSpace: 'nowrap',
                            ml: 2,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            '& svg': { ml: 1, cursor: 'pointer' },
                            color: theme => theme.palette.text.secondary,
                            fontSize: theme => theme.typography.h6.fontSize
                          }}
                        >
                          Time of Day (Hrs)
                        </Box>
                      </TableCell>
                      {[...Array(unit)].map((_, index) => (
                        <TableCell key={index}>
                          <Box
                            sx={{
                              display: 'flex',
                              whiteSpace: 'nowrap',

                              // ml: 1,
                              textTransform: 'capitalize',
                              '& svg': { ml: 1, cursor: 'pointer' },
                              color: theme => theme.palette.text.secondary,
                              fontSize: theme => theme.typography.h6.fontSize
                            }}
                          >
                            {`day-${index + 1}(MW)`}
                          </Box>
                        </TableCell>
                      ))}
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            whiteSpace: 'nowrap',
                            alignItems: 'center',
                            textTransform: 'capitalize',
                            '& svg': { ml: 1, cursor: 'pointer' },
                            color: theme => theme.palette.text.secondary,
                            fontSize: theme => theme.typography.h6.fontSize
                          }}
                        >
                          {`Remark`}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ border: 'none' }}>
                    {rolesArr.map((i: string, rowIndex: number) => {
                      return (
                        <TableRow key={rowIndex} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                          <TableCell
                            style={{
                              display: 'flex',
                              marginLeft: '10px',
                              whiteSpace: 'nowrap',

                              fontWeight: 'bold'
                            }}
                            sx={{ mt: 6 }}
                          >
                            {i}
                          </TableCell>
                          {[...Array(unit)].map((_, colIndex) => (
                            <TableCell key={colIndex}>
                              <NumberFormatComponent
                                style={{
                                  borderRadius: 5,
                                  border: '1px solid ',
                                  borderColor: 'rgba(0, 0, 0, 0.23)',
                                  padding: '10px',
                                  marginTop: '5px',
                                  width: `${unit <= 5 ? 800 / unit : 160}px`

                                  // width: `100px`
                                }}
                                value={unitValues[rowIndex * unit + colIndex]}
                                onChange={(event: { target: { value: string } }) =>
                                  handleUnitChange(rowIndex * unit + colIndex, event.target.value)
                                }
                              />
                            </TableCell>
                          ))}
                          <TableCell>
                            <CustomTextField
                              style={{
                                marginTop: '5px',
                                width: '160px'
                              }}
                              type='text'
                              placeholder='Remark'
                              value={remarks[rowIndex]}
                              onChange={event => handleRemark(rowIndex, event.target.value)}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                  <TableRow>
                    <TableCell sx={{ pl: '0 !important' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          whiteSpace: 'nowrap',
                          ml: 2,
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          '& svg': { ml: 1, cursor: 'pointer' },
                          color: theme => theme.palette.text.secondary,
                          fontSize: theme => theme.typography.h5.fontSize
                        }}
                      >
                        Total:
                      </Box>
                    </TableCell>
                    {total().map((d, index) => (
                      <TableCell key={index}>
                        <Box
                          sx={{
                            display: 'flex',
                            whiteSpace: 'nowrap',

                            // ml: 10,
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            '& svg': { ml: 1, cursor: 'pointer' },
                            color: theme => theme.palette.text.secondary,
                            fontSize: theme => theme.typography.h5.fontSize
                          }}
                        >
                          {`${d.toLocaleString()} Mw`}
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          whiteSpace: 'nowrap',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          '& svg': { ml: 1, cursor: 'pointer' },
                          color: theme => theme.palette.text.secondary,
                          fontSize: theme => theme.typography.h5.fontSize
                        }}
                      >
                        {`${unitValues.reduce((a, b) => Number(a) + Number(b), 0).toLocaleString()} Mw`}
                      </Box>
                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
              <Grid item xs={12}>
                <Box sx={{ padding: '10px' }}>
                  <CustomTextField
                    fullWidth
                    variant='outlined'
                    rows={4}
                    multiline
                    value={remark}
                    label='Remark'
                    id='textarea-outlined-static'
                    onChange={e => setRemarkData(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>

                <Button size='large' variant='contained' color='primary' type='submit'>
                  Submit
                </Button>
                {/* <LoadingButton
                  loading={loading}
                  size='large'
                  type='submit'
                  variant='contained'
                  endIcon={<Icon icon={'mynaui:save'} />}
                >
                  Submit
                </LoadingButton> */}
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      if (loading) {
        return (
          <Box display={'flex'} justifyContent={'center'}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
              <Icon icon={'line-md:uploading-loop'} width={'80'} />
              <Typography variant='h6'>Declaration...</Typography>
            </Box>
          </Box>
        )
      }

      return (
        <Fragment>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant='h5' sx={{ mb: 4 }}>
                  Thank You! 😇
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <HorizontalList>
                <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 1.5, display: 'flex' }}>
                      <Icon icon='mingcute:high-voltage-power-line' fontSize={32} />
                    </Box>
                    <Typography sx={{ fontWeight: 600 }}>Declaration</Typography>
                  </Box>
                  <Typography sx={{ color: 'text.secondary' }}>{declaration?.company || '--'}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{declaration?.address || '--'}</Typography>
                  <Typography sx={{ mb: 4, color: 'text.secondary' }}>{declaration?.abbreviation || '--'}</Typography>
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {declaration?.phone || '--'}
                  </Typography>
                </ListItem>
                <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 1.5, display: 'flex' }}>
                      <Icon icon='mdi:company' fontSize={30} />
                    </Box>
                    <Typography sx={{ fontWeight: 600 }}>Dispatch</Typography>
                  </Box>
                  <Typography sx={{ color: 'text.secondary' }}>{dispatch?.company || '--'}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{dispatch?.address || '--'}</Typography>
                  <Typography sx={{ mb: 4, color: 'text.secondary' }}>{dispatch?.abbreviation || '--'}</Typography>
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>{dispatch?.phone || '--'}</Typography>
                </ListItem>
              </HorizontalList>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button size='large' variant='contained' onClick={() => router.back()}>
              Back to Declaration
            </Button>
            <Button size='large' variant='contained' onClick={handleReset}>
              New Declaration
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export default StepperLinearWithValidation
