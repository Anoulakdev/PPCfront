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
import { POWER_SOURCES, DAILYDECLARATIONS } from '@/lib/query'
import { CREATE_DAILY_DECLARATION } from '@/lib/mutation'
import { CustomerDataType } from 'src/types/customerType'
import CustomTextField from 'src/@core/components/mui/text-field'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import auth from 'src/configs/auth'

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

const rolesArr: string[] = [
  '00:00-01:00',
  '01:00-02:00',
  '02:00-03:00',
  '03:00-04:00',
  '04:00-05:00',
  '05:00-06:00',
  '06:00-07:00',
  '07:00-08:00',
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
  '21:00-22:00',
  '22:00-23:00',
  '23:00-00:00'
]
const steps = [
  {
    title: 'Power Source',
    subtitle: 'Select Power Source'
  },
  {
    title: 'Availability',
    subtitle: 'Daily Availability'
  },
  {
    title: 'Declaration',
    subtitle: 'Daily Availability Declaration'
  }
]

type PowerSource = {
  powerSource: CustomerDataType | null
}
type AvailabilityType = {
  upstreamLevel: string
  downstreamLevel: string
  amountStorageReservoir: string
  averageStoreReservoir: string
  totalActiveReservoir: string
  averageActiveReservoir: string
  tdAmount: string
  tdAverage: string
  sdAmount: string
  sdAverage: string
  edAmount: string
  edAverage: string
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

const availabilityValues: AvailabilityType = {
  upstreamLevel: '',
  downstreamLevel: '',
  amountStorageReservoir: '',
  averageStoreReservoir: '',
  totalActiveReservoir: '',
  averageActiveReservoir: '',
  tdAmount: '',
  tdAverage: '',
  sdAmount: '',
  sdAverage: '',
  edAmount: '',
  edAverage: ''
}

const powerSourceSchema = yup.object().shape({
  powerSource: yup.object().required()
})
const availabilitySchema = yup.object().shape({
  upstreamLevel: yup.string().required(),
  downstreamLevel: yup.string().required(),
  amountStorageReservoir: yup.string().required(),
  averageStoreReservoir: yup.string().required(),
  totalActiveReservoir: yup.string().required(),
  averageActiveReservoir: yup.string().required(),
  tdAmount: yup.string().required(),
  tdAverage: yup.string().required(),
  sdAmount: yup.string().required(),
  sdAverage: yup.string().required(),
  edAmount: yup.string().required(),
  edAverage: yup.string().required()
})

const StepperLinearWithValidation = () => {
  const router = useRouter()

  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)
  const [declaration, setDeclaration] = useState<DataDetail | null>(null)
  const [dispatch, setDispatch] = useState<DataDetail | null>(null)

  // Query
  const { data: powerSources } = useQuery(POWER_SOURCES)
  const powerSourceData = powerSources?.getPowerSources ? powerSources?.getPowerSources : []

  // ** Mutation
  const [createDayDeclaration, { loading: createLoading }] = useMutation(CREATE_DAILY_DECLARATION, {
    onCompleted: data => {
      // handleClose()
      // setActiveStep(activeStep + 1)
      if (data.createDayDeclaration) {
        setDeclaration(data.createDayDeclaration.decCustomerId)
        setDispatch(data.createDayDeclaration.disCustomerId)
        toast.success('Declaration Successfully')
      }
    },
    refetchQueries: [
      {
        query: DAILYDECLARATIONS,
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
  const {
    reset: availabilityReset,
    control: availabilityControl,
    watch: watchAvailability,
    handleSubmit: handleAvailabilitySubmit,
    formState: { errors: availabilityErrors },
    getValues: getValuesAvailabilityValues
  } = useForm<AvailabilityType>({
    defaultValues: availabilityValues,
    resolver: yupResolver(availabilitySchema)
  })

  // static data
  const powerSource = watchPowerSource('powerSource')
  const unit = powerSource ? powerSource?.unit : 0

  // State
  const [unitValues, setUnitValues] = useState(Array(rolesArr.length * unit).fill('0'))
  const [remarks, setRemark] = useState(Array(rolesArr.length).fill(''))
  const [remark, setRemarkData] = useState('')
  const [maxs, setMax] = useState(Array(unit).fill('0'))
  const [mins, setMin] = useState(Array(unit).fill('0'))

  useEffect(() => {
    if (powerSource) {
      setUnitValues(Array(rolesArr.length * unit).fill('0'))
      setMax(Array(unit).fill('0'))
      setMin(Array(unit).fill('0'))
    }
  }, [powerSource])

  const handleMax = (index: number, value: string) => {
    const parsedValue = Math.abs(Number(value))
    const updatedMaxValues = [...maxs]
    updatedMaxValues[index] = value ? String(parsedValue) : '0'
    setMax(updatedMaxValues)
  }
  const handleMin = (index: number, value: string) => {
    const parsedValue = Math.abs(Number(value))
    const updatedMinValues = [...mins]
    updatedMinValues[index] = value ? String(parsedValue) : '0'
    setMin(updatedMinValues)
  }

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
    powerSourceReset()
    availabilityReset()

    // socialReset({ google: '', twitter: '', facebook: '', linkedIn: '' })
    // accountReset({ email: '', username: '', password: '', 'confirm-password': '' })
    // personalReset({ country: '', language: [], 'last-name': '', 'first-name': '' })
  }
  const onSubmit = async () => {
    // if (activeStep <= steps.length - 2) {
    //   setActiveStep(activeStep + 1)
    // }
    // console.log('getValuesAvailabilityValues()===>', getValuesAvailabilityValues())

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
      const reservoirSituation = {
        upstreamLevel: parseFloat(getValuesAvailabilityValues().upstreamLevel) || 0,
        downstreamLevel: parseFloat(getValuesAvailabilityValues().downstreamLevel) || 0,
        totalStorage: {
          amount: parseFloat(getValuesAvailabilityValues().amountStorageReservoir) || 0,
          average: parseFloat(getValuesAvailabilityValues().averageStoreReservoir) || 0
        },
        activeStorage: {
          amount: parseFloat(getValuesAvailabilityValues().averageStoreReservoir) || 0,
          average: parseFloat(getValuesAvailabilityValues().averageActiveReservoir) || 0
        }
      }
      const waterDischarge = {
        turbineDischarge: {
          amount: parseFloat(getValuesAvailabilityValues().tdAmount) || 0,
          average: parseFloat(getValuesAvailabilityValues().tdAverage) || 0
        },
        spillwayDischarge: {
          amount: parseFloat(getValuesAvailabilityValues().sdAmount) || 0,
          average: parseFloat(getValuesAvailabilityValues().sdAverage) || 0
        },
        ecologicalDischarge: {
          amount: parseFloat(getValuesAvailabilityValues().edAmount) || 0,
          average: parseFloat(getValuesAvailabilityValues().edAverage) || 0
        }
      }
      const minData = mins.map(r => parseFloat(r))
      const maxData = maxs.map(r => parseFloat(r))
      const machinesAvailability = { maxs: maxData, mins: minData }

      const newData = {
        customerId: powerSource?._id || '',
        powerDetail,
        powers: unitValues,
        remarks,
        remark,
        machinesAvailability,
        reservoirSituation,
        waterDischarge
      }

      // console.log('newData===>', newData)
      // console.log('Total Unit===>', unitValues)
      // console.log(total())
      try {
        await createDayDeclaration({
          variables: {
            createDayDeclarationInput: newData
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUnitChange = (index: number, value: string) => {
    // console.log(`index:${index}, value:${value}`)

    // const findValue = maxs.find((i, index2) => {
    //   if (index2 === index) {
    //     if (parseFloat(i) >= parseFloat(value)) {
    //       return value
    //     } else {
    //       return i
    //     }
    //   }
    // })
    // console.log(`index data===>:${index % unit}`)

    let findValue = maxs.find((i, index2) => index2 === index % unit)

    // console.log('findValue===>', findValue)

    // console.log('maxs===>', maxs)

    if (parseFloat(findValue) >= parseFloat(value) || 0) {
      findValue = value
    }
    if (!value) {
      findValue = value
    }

    const parsedValue = Math.abs(Number(findValue))

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

  const totalDischarge = () => {
    const tdAmount = parseFloat(watchAvailability('tdAmount'))
    const tdAverage = parseFloat(watchAvailability('tdAverage'))
    const sdAmount = parseFloat(watchAvailability('sdAmount'))
    const sdAverage = parseFloat(watchAvailability('sdAverage'))
    const edAmount = parseFloat(watchAvailability('edAmount'))
    const edAverage = parseFloat(watchAvailability('edAverage'))
    const totalAmount = tdAmount + sdAmount + edAmount
    const totalAverage = tdAverage + sdAverage + edAverage

    return (
      <Box sx={{ ml: 5 }}>{`${totalAmount ? totalAmount.toFixed(2) : '--'} MCM   ||   ${
        totalAverage ? totalAverage.toFixed(2) : '--'
      } m³/s`}</Box>
    )
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
          <form key={1} onSubmit={handleAvailabilitySubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  1. Machines Availability
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ border: 'none', mt: 1, maxHeight: auth }}>
                  <Table size='small'>
                    <TableHead>
                      <TableBody sx={{ border: 'none' }}>
                        <TableRow>
                          <TableCell sx={{ pl: '0 !important', borderBottom: 'none' }}>
                            <Box
                              sx={{
                                whiteSpace: 'nowrap',
                                ml: 2,
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                '& svg': { ml: 1, cursor: 'pointer' },
                                color: theme => theme.palette.text.secondary,
                                fontSize: theme => theme.typography.h6.fontSize
                              }}
                            >
                              MAX
                            </Box>
                          </TableCell>
                          {[...Array(unit)].map((_, index) => (
                            <TableCell key={index} sx={{ pl: '0 !important', borderBottom: 'none' }}>
                              <Box>{`Unit-${index + 1} (MW)`}</Box>
                              <NumberFormatComponent
                                style={{
                                  borderRadius: 5,
                                  border: '1px solid ',
                                  borderColor: 'rgba(0, 0, 0, 0.23)',
                                  padding: '10px',
                                  marginTop: '5px',
                                  width: `${unit <= 5 ? 800 / unit : 160}px`
                                }}
                                value={maxs[index]}
                                onChange={(event: { target: { value: string } }) =>
                                  handleMax(index, event.target.value)
                                }
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ pl: '0 !important', borderBottom: 'none' }}>
                            <Box
                              sx={{
                                whiteSpace: 'nowrap',
                                ml: 2,
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                '& svg': { ml: 1, cursor: 'pointer' },
                                color: theme => theme.palette.text.secondary,
                                fontSize: theme => theme.typography.h6.fontSize
                              }}
                            >
                              MIN
                            </Box>
                          </TableCell>
                          {[...Array(unit)].map((_, index) => (
                            <TableCell key={index} sx={{ pl: '0 !important', borderBottom: 'none' }}>
                              <Box>{`Unit-${index + 1} (MW)`}</Box>
                              <NumberFormatComponent
                                style={{
                                  borderRadius: 5,
                                  border: '1px solid ',
                                  borderColor: 'rgba(0, 0, 0, 0.23)',
                                  padding: '10px',
                                  marginTop: '5px',
                                  width: `${unit <= 5 ? 800 / unit : 160}px`
                                }}
                                value={mins[index]}
                                onChange={(event: { target: { value: string } }) =>
                                  handleMin(index, event.target.value)
                                }
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  2. Reservoir Situation
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='upstreamLevel'
                    control={availabilityControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        type='number'
                        fullWidth
                        required
                        value={value}
                        label='Upstream Level (masl) '
                        placeholder='masl '
                        onChange={onChange}
                        error={Boolean(availabilityErrors['upstreamLevel'])}
                        aria-describedby='stepper-linear-personal-first-name'
                      />
                    )}
                  />
                  {availabilityErrors['upstreamLevel'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-first-name'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='downstreamLevel'
                    control={availabilityControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        required
                        value={value}
                        label='Downstream Level (masl)'
                        placeholder='masl'
                        onChange={onChange}
                        error={Boolean(availabilityErrors['downstreamLevel'])}
                        aria-describedby='stepper-linear-personal-first-name'
                      />
                    )}
                  />
                  {availabilityErrors['downstreamLevel'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid container spacing={5} item xs={24} sm={12}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                      Total Storage:
                    </Typography>
                    <FormControl fullWidth>
                      <Controller
                        name='amountStorageReservoir'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            placeholder='MCM'
                            label='Amount (MCM)'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['amountStorageReservoir'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                      {availabilityErrors['amountStorageReservoir'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl sx={{ ml: 2 }} fullWidth>
                      <Controller
                        name='averageStoreReservoir'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            label='Percent ( % )'
                            placeholder='( % )'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['averageStoreReservoir'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                      {availabilityErrors['averageStoreReservoir'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                      Active Storage:
                    </Typography>
                    <FormControl fullWidth>
                      <Controller
                        name='totalActiveReservoir'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            placeholder='MCM'
                            label='Amount (MCM)'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['totalActiveReservoir'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                      {availabilityErrors['totalActiveReservoir'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl sx={{ ml: 2 }} fullWidth>
                      <Controller
                        name='averageActiveReservoir'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            label='Percent ( % )'
                            placeholder='( % )'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['averageActiveReservoir'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                      {availabilityErrors['averageActiveReservoir'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: '0 !important' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  3. Daily Water Discharge Plan
                </Typography>
              </Grid>
              <Grid container spacing={5} item xs={24} sm={12}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                      Turbine Discharge:
                    </Typography>
                    <FormControl fullWidth>
                      <Controller
                        name='tdAmount'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            placeholder='MCM'
                            label='Amount (MCM)'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['tdAmount'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                      {availabilityErrors['tdAmount'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl sx={{ ml: 2 }} fullWidth>
                      <Controller
                        name='tdAverage'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            label='Average ( m³/s)'
                            placeholder='( m³/s)'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['tdAverage'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                      {availabilityErrors['tdAverage'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                      Spillway Discharge:
                    </Typography>
                    <FormControl fullWidth>
                      <Controller
                        name='sdAmount'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            placeholder='MCM'
                            label='Amount (MCM)'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['sdAmount'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                      {availabilityErrors['sdAmount'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl sx={{ ml: 2 }} fullWidth>
                      <Controller
                        name='sdAverage'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            label='Average ( m³/s)'
                            placeholder='( m³/s)'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['sdAverage'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                      {availabilityErrors['sdAverage'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                      Ecological Discharge:
                    </Typography>
                    <FormControl fullWidth>
                      <Controller
                        name='edAmount'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            placeholder='MCM'
                            label='Amount (MCM)'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['edAmount'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                      {availabilityErrors['edAmount'] && (
                        <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-last-name'>
                          This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl sx={{ ml: 2 }} fullWidth>
                      <Controller
                        name='edAverage'
                        control={availabilityControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            label='Average ( m³/s)'
                            placeholder='( m³/s)'
                            onChange={onChange}
                            error={Boolean(availabilityErrors['edAverage'])}
                            aria-describedby='stepper-linear-personal-first-name'
                          />
                        )}
                      />
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      mt: 4,
                      fontWeight: 'bold',
                      backgroundColor: '#e5e5e5',

                      borderRadius: 1,
                      padding: 2
                    }}
                  >
                    Total Discharge: {totalDischarge()}
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      case 2:
        return (
          <form key={2} onSubmit={onSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[2].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[2].subtitle}
                </Typography>
              </Grid>
              <TableContainer sx={{ border: 'none', mt: 1, maxHeight: auth }}>
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
                            {`Unit-${index + 1}(MW)`}
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
                            sx={{ mt: 7 }}
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
                                  width: `${unit <= 5 ? 500 / unit : 100}px`

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
                          fontSize: theme => theme.typography.h6.fontSize
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
                            fontSize: theme => theme.typography.h6.fontSize
                          }}
                        >
                          {`${d.toLocaleString()} MWh`}
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
                          fontSize: theme => theme.typography.h6.fontSize
                        }}
                      >
                        {`${unitValues.reduce((a, b) => Number(a) + Number(b), 0).toLocaleString()} MWh`}
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
