/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { use, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import SaveIcon from '@mui/icons-material/Save'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { GET_REPORT_YESTERDAY, REPORTS, POWER_SOURCES } from '@/lib/query'
import { CREATE_DAILY_REORT } from '@/lib/mutation'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

// ** import numberformat
import * as NumberFormat from 'react-number-format'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import auth from 'src/configs/auth'
import stores from '@/stores/index'
import { GetYesterday } from 'src/@core/utils/date-time'
import { CustomerDataType } from 'src/types/customerType'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'

const NumberFormatComponent = NumberFormat.NumericFormat || NumberFormat

interface CardDataType {
  title: string
  avatars: string[]
  totalUsers: number
}

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

interface InfoData {
  waterLevel: string
  dwy: string
  dwf: string
  dwm: string
  pws: string
  rainFall: string
  netEnergyOutput: string
  waterRate: string

  asAmount: string
  asAverage: string

  inflowAmount: string
  inflowVolume: string

  outFlowAmount: string
  outFlowVolume: string

  spillWayAmount: string
  spillWayVolume: string

  owrAmount: string
  owrVolume: string
}
const initialInfoData: InfoData = {
  waterLevel: '',
  dwy: '',
  dwf: '',
  dwm: '',
  pws: '',
  rainFall: '',
  netEnergyOutput: '',
  waterRate: '',

  asAmount: '',
  asAverage: '',

  inflowAmount: '',
  inflowVolume: '',

  outFlowAmount: '',
  outFlowVolume: '',

  spillWayAmount: '',
  spillWayVolume: '',

  owrAmount: '',
  owrVolume: ''
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
  powerSource: yup.object().required(),
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

const Dailydadform = () => {
  // stores
  const { customer } = stores.useCustomer()
  const unit = 1

  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [unitValues, setUnitValues] = useState(Array(rolesArr.length * unit).fill('0'))
  const [remarks, setRemark] = useState(Array(rolesArr.length).fill(''))
  const [maxs, setMax] = useState(Array(unit).fill('0'))
  const [mins, setMin] = useState(Array(unit).fill('0'))
  const [remark, setRemarkData] = useState('')

  // const [powerSource, setPowerSource] = useState<CustomerDataType | null>(null)
  const router = useRouter()

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<DailyReport>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(Schema)
  })
  const powerSource = watch('powerSource')
  const waterLevel = watch('waterLevel')
  const asAmount = watch('asAmount')
  const netEnergyOutput = watch('netEnergyOutput')
  const outFlowAmount = watch('outFlowAmount')

  const [isLoading, setIsLoading] = useState(false)

  const [showAlert, setShowAlert] = useState(false)

  const handleClickOpen = () => setOpen(true)

  // Query
  const { data: report, loading: loadingReport } = useQuery(GET_REPORT_YESTERDAY, {
    variables: {
      customerId: powerSource?._id || ''
    }
  })
  const { data: powerSources, loading: loadingPowerSource } = useQuery(POWER_SOURCES)
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
      handleClose()
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
  const onSubmit = async (data: DailyReport) => {
    // console.log('data====>', data)

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
    const minData = mins.map(r => parseFloat(r))
    const maxData = maxs.map(r => parseFloat(r))
    const machinesAvailability = { maxs: maxData, mins: minData }

    const activeStorage = {
      amount: data.asAmount || 0,
      average: asAverage ? parseFloat(asAverage) : 0
    }

    const inflow = {
      amount: data.inflowAmount || 0,
      volume: data.inflowVolume || 0
    }

    const outFlow = {
      amount: data.outFlowAmount || 0,
      volume: data.outFlowVolume || 0
    }

    const spillWay = {
      amount: data.spillWayAmount || 0,
      volume: data.spillWayVolume || 0
    }

    const otherWaterReleased = {
      amount: data.owrAmount || 0,
      volume: data.owrVolume || 0
    }

    const newData = {
      waterLevel: data.waterLevel || 0,
      dwy: dwy || 0,
      dwf: dwf || 0,
      pws: pws || 0,
      netEnergyOutput: netEnergyOutput ? parseFloat(netEnergyOutput + '') : 0,
      waterRate: waterRate || 0,
      rainFall: data.rainFall || 0,
      activeStorage,
      inflow,
      outFlow,
      spillWay,
      otherWaterReleased,
      powerDetail,
      powers: unitValues,
      remarks,
      remark,
      customerId: data.powerSource?._id || ''
    }

    // console.log('newData===>', newData)

    // console.log('Total Unit===>', unitValues)
    // console.log(total())
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

  const handleClose = () => {
    // setOpen(false)
    // setSelectedCheckbox([])
    // setIsIndeterminateCheckbox(false)
    setUnitValues(Array(rolesArr.length).fill(''))
    setRemark(Array(rolesArr.length).fill(''))
    setRemarkData('')
    router.back()
  }

  const totalUnitValues = unitValues.reduce((a, b) => Number(a) + Number(b), 0)

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  const renderDetail = (
    <Card>
      <CardHeader title='Daily Reservoir Information' sx={{ textAlign: 'center', fontWeight: 'bold' }} />
      <Grid item xs={12} sm={3} ml={5}>
        <Controller
          name='powerSource'
          control={control}
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
                  required
                  sx={{ mb: 4 }}
                  {...params}
                  label='Select Powersource'
                  placeholder='Select Powersource'
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          )}
        />
      </Grid>
      <Divider sx={{ m: '0 !important' }} />

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

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: 2 }}>
            <Button
              sx={{ mt: 2 }}
              onClick={() => handleClose()}
              variant='contained'
              startIcon={<Icon icon='ic:round-arrow-back' />}
            >
              Back
            </Button>
            <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Daily Report</Typography>
            <Box />
          </Box>

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

          <Box sx={{ overflowX: 'auto' }}>
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ mt: 5, padding: '10px' }}>
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
                <Grid item xs={12}>
                  {renderDetail}
                </Grid>
                {/* <Grid item xs={12}>
                  <ActivityTimeline />
                </Grid> */}

                <Box className='demo-space-x' sx={{ mb: 5, padding: '10px' }}>
                  &nbsp;
                  <Snackbar
                    open={showAlert}
                    autoHideDuration={4500}
                    onClose={() => setShowAlert(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <Alert variant='filled' severity='success' onClose={() => setShowAlert(false)}>
                      Submitted successfully!
                    </Alert>
                  </Snackbar>
                  <Box className='demo-space-x' sx={{ mb: 5, padding: '10px' }}>
                    <Button
                      fullWidth
                      type='submit'
                      size='large'
                      variant='contained'
                      onClick={handleSubmit(onSubmit)}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                      {loading ? 'Loading...' : 'Submit'}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Dailydadform
