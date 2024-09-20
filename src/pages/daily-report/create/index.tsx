/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { Fragment, useState } from 'react'

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
import { GET_REPORT_YESTERDAY, REPORTS, POWER_SOURCES } from '@/lib/query'
import { CREATE_DAILY_REORT } from '@/lib/mutation'
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
    title: 'Daily Reservoir',
    subtitle: 'Daily Reservoir Information'
  }
]
type DailyReport = {
  powerSource: CustomerDataType | null
  waterLevel: number | null
  rainFall: number | null
  netEnergyOutput: number | null
  asAmount: number | null

  inflowAmount: number | null
  inflowVolume: number | null

  outFlowAmount: number | null
  outFlowVolume: number | null

  spillWayAmount: number | null
  spillWayVolume: number | null

  owrAmount: number | null
  owrVolume: number | null
}

type PowerSource = {
  powerSource: CustomerDataType | null
}

const defaultValues: DailyReport = {
  powerSource: null,
  waterLevel: null,
  rainFall: null,
  netEnergyOutput: null,
  asAmount: null,

  inflowAmount: null,
  inflowVolume: null,

  outFlowAmount: null,
  outFlowVolume: null,

  spillWayAmount: null,
  spillWayVolume: null,

  owrAmount: null,
  owrVolume: null
}

const Schema = yup.object().shape({
  waterLevel: yup.number().min(1).required(),
  rainFall: yup.number().min(1).required(),
  netEnergyOutput: yup.number().min(1).required(),
  asAmount: yup.number().min(1).required(),
  inflowAmount: yup.number().min(1).required(),
  inflowVolume: yup.number().min(1).required(),
  outFlowAmount: yup.number().min(1).required(),
  outFlowVolume: yup.number().min(1).required(),
  spillWayAmount: yup.number().min(1).required(),
  spillWayVolume: yup.number().min(1).required(),
  owrAmount: yup.number().min(1).required(),
  owrVolume: yup.number().min(1).required()
})
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
  const unit = 1
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
    reset: resetDailyReport,
    control,
    handleSubmit: handleSubmitDailyReport,
    getValues,
    watch
  } = useForm<DailyReport>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(Schema)
  })
  const powerSource = watchPowerSource('powerSource')
  const waterLevel = watch('waterLevel')
  const asAmount = watch('asAmount')
  const netEnergyOutput = watch('netEnergyOutput')
  const outFlowAmount = watch('outFlowAmount')

  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)
  const [declaration, setDeclaration] = useState<DataDetail | null>(null)
  const [dispatch, setDispatch] = useState<DataDetail | null>(null)
  const [unitValues, setUnitValues] = useState(Array(rolesArr.length * unit).fill('0'))
  const [remarks, setRemark] = useState(Array(rolesArr.length).fill(''))
  const [remark] = useState('')

  // Query
  const { data: powerSources } = useQuery(POWER_SOURCES)
  const { data: report } = useQuery(GET_REPORT_YESTERDAY, {
    variables: {
      customerId: powerSource?._id || ''
    }
  })

  const reports = report?.getReportYesterDay ? report?.getReportYesterDay : null
  const powerSourceData = powerSources?.getPowerSources ? powerSources?.getPowerSources : []
  const fullLevel = powerSource?.fullLevel || 0
  const minLevel = powerSource?.minimumLevel || 0
  const totalActiveStorage = powerSource?.totalActiveStorage || 0
  const waterLevelYerterDay = reports?.asYesterday || 0
  const asAverage = asAmount && totalActiveStorage > 0 ? (asAmount / totalActiveStorage).toLocaleString() : 0
  const dwy = waterLevel ? waterLevel - waterLevelYerterDay : 0
  const dwf = waterLevel ? waterLevel - fullLevel : 0
  const dwm = waterLevel ? waterLevel - minLevel : 0
  const pws = asAmount ? totalActiveStorage - asAmount : 0
  const waterRate =
    outFlowAmount && netEnergyOutput && outFlowAmount > 0 && netEnergyOutput > 0 ? outFlowAmount / netEnergyOutput : 0

  // ** Mutation
  const [createReport, { loading: createLoading }] = useMutation(CREATE_DAILY_REORT, {
    onCompleted: data => {
      if (data.createReport) {
        setDeclaration(data.createReport.decCustomerId)
        setDispatch(data.createReport.disCustomerId)
        toast.success('Declaration Successfully')
      }
    },
    refetchQueries: [
      {
        query: REPORTS
      }
    ]
  })
  const loading = createLoading

  const handleUnitChange = (index: number, value: string) => {
    // console.log(`index: ${index}, value: ${value}`)

    const parsedValue = Math.abs(Number(value))

    // console.log('parsedValue===>', parsedValue)

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

    // console.log('updatedUnitValues===>', updatedUnitValues)

    setUnitValues(updatedUnitValues)
  }
  const handleRemark = (index: number, value: string) => {
    // console.log(`index: ${index}, value: ${value}`)

    const updatedRemarkValues = [...remarks]
    updatedRemarkValues[index] = String(value)
    setRemark(updatedRemarkValues)
  }

  const onSubmit = async () => {
    // console.log('Test')

    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      const data: DailyReport = getValues()
      const {
        asAmount,
        inflowAmount,
        inflowVolume,
        outFlowAmount,
        outFlowVolume,
        spillWayAmount,
        spillWayVolume,
        owrAmount,
        owrVolume,
        rainFall
      } = data
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

      const activeStorage = {
        amount: asAmount ? parseFloat(asAmount + '') : 0,
        average: asAverage ? parseFloat(asAverage) : 0
      }

      const inflow = {
        amount: inflowAmount ? parseFloat(inflowAmount + '') : 0,
        volume: inflowVolume ? parseFloat(inflowVolume + '') : 0
      }

      const outFlow = {
        amount: outFlowAmount ? parseFloat(outFlowAmount + '') : 0,
        volume: outFlowVolume ? parseFloat(outFlowVolume + '') : 0
      }

      const spillWay = {
        amount: spillWayAmount ? parseFloat(spillWayAmount + '') : 0,
        volume: spillWayVolume ? parseFloat(spillWayVolume + '') : 0
      }

      const otherWaterReleased = {
        amount: owrAmount ? parseFloat(owrAmount + '') : 0,
        volume: owrVolume ? parseFloat(owrVolume + '') : 0
      }

      const newData = {
        waterLevel: waterLevel ? parseFloat(waterLevel + '') : 0,
        dwy: dwy || 0,
        dwf: dwf || 0,
        pws: pws || 0,
        netEnergyOutput: netEnergyOutput ? parseFloat(netEnergyOutput + '') : 0,
        waterRate: waterRate || 0,
        rainFall: rainFall ? parseFloat(rainFall + '') : 0,
        activeStorage,
        inflow,
        outFlow,
        spillWay,
        otherWaterReleased,
        powerDetail,
        powers: unitValues,
        remarks,
        remark,
        customerId: powerSource ? powerSource?._id + '' : ''
      }

      // console.log('newData===>', newData)

      // console.log('Total Unit===>', unitValues)
      console.log(total())
      try {
        await createReport({
          variables: {
            createReportInput: newData
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
    powerSourceReset()
    resetDailyReport()
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
          <form key={1} onSubmit={handleSubmitDailyReport(onSubmit)}>
            <TableContainer sx={{ border: 'none', mt: 1, maxHeight: auth }}>
              <Table stickyHeader size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: '0 !important', position: 'sticky', top: 0, left: 0, zIndex: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          whiteSpace: 'nowrap',
                          ml: 1,
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
                          {`Total (MW)`}
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
                        ml: 1,
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
                          '& svg': { ml: 2, cursor: 'pointer' },
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
              {renderDetail}
            </Grid>
            <Grid item mt={8} xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                Back
              </Button>
              <Button size='large' type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderDetail = (
    <Card sx={{ mt: 4 }}>
      {/* <CardHeader title='Daily Reservoir Information' sx={{ textAlign: 'center', fontWeight: 'bold' }} />
      <Divider sx={{ m: '0 !important' }} /> */}

      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid container spacing={5} item xs={24} sm={12}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <Box width={'40%'} mt={4}>
                    <Typography variant='body2' sx={{ mr: 2, fontWeight: 700, lineHeight: 'normal' }}>
                      Active Storage:
                    </Typography>
                  </Box>
                  <Controller
                    name='asAmount'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <CustomTextField
                        sx={{ mr: 2 }}
                        required
                        fullWidth
                        value={value}
                        type='number'
                        label='Amount (MCM)'
                        onChange={onChange}
                        placeholder='MCM'
                        error={!!error}

                        // helperText={error?.message}
                      />
                    )}
                  />
                  <Box borderRadius={1} display={'flex'} flexDirection={'column'} width={'100%'}>
                    <Typography variant='body2' sx={{ fontWeight: 600, lineHeight: 'normal' }}>
                      Percent (%)
                    </Typography>
                    <Box
                      mt={1}
                      borderRadius={1}
                      display={'flex'}
                      flexDirection={'row'}
                      padding={1.7}
                      bgcolor={'#f3f3f3'}
                      width={'100%'}
                    >
                      <Typography variant='h5' sx={{ ml: 2, fontWeight: 600, lineHeight: 'normal' }}>
                        {`${asAverage} %`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid display={'flex'} container spacing={4} item xs={24} sm={24}>
              <Grid item xs={12} sm={2.4}>
                <Controller
                  name='waterLevel'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      sx={{ mr: 2 }}
                      required
                      fullWidth
                      value={value}
                      label='Water Level at 00:00 (masl)'
                      onChange={onChange}
                      placeholder='masl'
                      error={!!error}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <Box borderRadius={1} display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Typography variant='body2' sx={{ fontWeight: 600, lineHeight: 'normal' }}>
                    Diff with Yesterday (m)
                  </Typography>
                  <Box
                    mt={1}
                    borderRadius={1}
                    display={'flex'}
                    flexDirection={'row'}
                    padding={1.7}
                    bgcolor={'#f3f3f3'}
                    width={'100%'}
                  >
                    <Typography variant='h5' sx={{ ml: 2, fontWeight: 600, lineHeight: 'normal' }}>
                      {`${dwy.toLocaleString()} m`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <Box borderRadius={1} display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Typography variant='body2' sx={{ fontWeight: 600, lineHeight: 'normal' }}>
                    Diff with Full (m)
                  </Typography>
                  <Box
                    mt={1}
                    borderRadius={1}
                    display={'flex'}
                    flexDirection={'row'}
                    padding={1.7}
                    bgcolor={'#f3f3f3'}
                    width={'100%'}
                  >
                    <Typography variant='h5' sx={{ ml: 2, fontWeight: 600, lineHeight: 'normal' }}>
                      {`${dwf.toLocaleString()} m`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <Box borderRadius={1} display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Typography variant='body2' sx={{ fontWeight: 600, lineHeight: 'normal' }}>
                    Diff with Min (m)
                  </Typography>
                  <Box
                    mt={1}
                    borderRadius={1}
                    display={'flex'}
                    flexDirection={'row'}
                    padding={1.7}
                    bgcolor={'#f3f3f3'}
                    width={'100%'}
                  >
                    <Typography variant='h5' sx={{ ml: 2, fontWeight: 600, lineHeight: 'normal' }}>
                      {`${dwm.toLocaleString()} m`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2.4}>
                <Box borderRadius={1} display={'flex'} flexDirection={'column'} width={'100%'}>
                  <Typography variant='body2' sx={{ fontWeight: 600, lineHeight: 'normal' }}>
                    Potential Water Storage (MCM)
                  </Typography>
                  <Box
                    mt={1}
                    borderRadius={1}
                    display={'flex'}
                    flexDirection={'row'}
                    padding={1.7}
                    bgcolor={'#f3f3f3'}
                    width={'100%'}
                  >
                    <Typography variant='h5' sx={{ ml: 2, fontWeight: 600, lineHeight: 'normal' }}>
                      {`${pws.toLocaleString()} MCM`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: '0 !important' }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                  Inflow:
                </Typography>
                <Controller
                  name='inflowAmount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      sx={{ mr: 2 }}
                      required
                      fullWidth
                      value={value}
                      label='Amount (MCM)'
                      onChange={onChange}
                      placeholder='MCM'
                      error={!!error}
                    />
                  )}
                />
                <Controller
                  name='inflowVolume'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      sx={{ mr: 2 }}
                      required
                      fullWidth
                      value={value}
                      label='Average ( m³/s)'
                      placeholder='( m³/s)'
                      onChange={onChange}
                      error={!!error}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                  OutFlow:
                </Typography>
                <Controller
                  name='outFlowAmount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      sx={{ mr: 2 }}
                      required
                      fullWidth
                      value={value}
                      placeholder='MCM'
                      label='Amount (MCM)'
                      onChange={onChange}
                      error={!!error}
                    />
                  )}
                />
                <Controller
                  name='outFlowVolume'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      sx={{ mr: 2 }}
                      required
                      fullWidth
                      value={value}
                      placeholder='( m³/s)'
                      label='Average ( m³/s)'
                      onChange={onChange}
                      error={!!error}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                  Spill Way:
                </Typography>
                <Controller
                  name='spillWayAmount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      sx={{ mr: 2 }}
                      required
                      fullWidth
                      value={value}
                      placeholder='MCM'
                      label='Amount (MCM)'
                      onChange={onChange}
                      error={!!error}
                    />
                  )}
                />
                <Controller
                  name='spillWayVolume'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      sx={{ mr: 2 }}
                      required
                      fullWidth
                      value={value}
                      placeholder='( m³/s)'
                      label='Average ( m³/s)'
                      onChange={onChange}
                      error={!!error}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                  Other Water Released:
                </Typography>
                <Controller
                  name='owrAmount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      sx={{ mr: 2 }}
                      required
                      fullWidth
                      value={value}
                      placeholder='MCM'
                      label='Amount (MCM)'
                      onChange={onChange}
                      error={!!error}
                    />
                  )}
                />
                <Controller
                  name='owrVolume'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      sx={{ mr: 2 }}
                      required
                      fullWidth
                      value={value}
                      placeholder='( m³/s)'
                      label='Average ( m³/s)'
                      onChange={onChange}
                      error={!!error}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: '0 !important' }} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name='rainFall'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <CustomTextField
                    sx={{ mr: 2 }}
                    required
                    fullWidth
                    value={value}
                    label='Rain fall (mm) '
                    placeholder='mm '
                    onChange={onChange}
                    error={!!error}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name='netEnergyOutput'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <CustomTextField
                    sx={{ mr: 2 }}
                    required
                    fullWidth
                    value={value}
                    label='Net Energy Output (NEO)'
                    placeholder='kWh'
                    onChange={onChange}
                    error={!!error}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box borderRadius={1} display={'flex'} flexDirection={'column'} width={'100%'}>
                <Typography variant='body2' sx={{ fontWeight: 600, lineHeight: 'normal' }}>
                  Water Rate (m³/s)
                </Typography>
                <Box
                  mt={1}
                  borderRadius={1}
                  display={'flex'}
                  flexDirection={'row'}
                  padding={1.7}
                  bgcolor={'#f3f3f3'}
                  width={'100%'}
                >
                  <Typography variant='h5' sx={{ ml: 2, fontWeight: 600, lineHeight: 'normal' }}>
                    {`${waterRate.toLocaleString()} m³/s`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )

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
