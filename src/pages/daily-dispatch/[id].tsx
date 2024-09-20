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
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import LoadingButton from '@mui/lab/LoadingButton'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import List, { ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import SaveIcon from '@mui/icons-material/Save'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { DAILYDECLARATIONS, DAILY_POWER_PURCHASE, DAILYDISPATCHS } from '@/lib/query'
import { CREATE_DAILY_DECLARATION, ACKNOWLEDGED_DAY_DECLARATION } from '@/lib/mutation'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** import numberformat
import * as NumberFormat from 'react-number-format'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import auth from 'src/configs/auth'
import stores from '@/stores/index'
import AcknowlegeUser from 'src/@core/components/acknowlege/AcknowlegeUser'
import { DayPowerPurchase } from '@/__generated__/graphql'
import Exportpdf from '../daily-view/exportpdf'
import { formatDate, formatDateToMonthShort } from 'src/@core/utils/format'

const NumberFormatComponent = NumberFormat.NumericFormat || NumberFormat

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

interface CardDataType {
  title: string
  avatars: string[]
  totalUsers: number
}

export type User = {
  _id: string
  email: string
  fName: string
  lName: string
  phone: string
}
export type Customer = {
  _id: string
  abbreviation: string
  address: string
  company: string
  name: string
  phone: string
  logo: string
  type: number
  unit: number
  email: string
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
  upstreamLevel: string
  downstreamLevel: string
  amountStorageReservoir: string
  averageStoreReservoir: string
  totalActiveReservoir: string
  averageActiveReservoir: string
  tdAmount: string // Turbine Discharge
  tdAverage: string
  sdAmount: string // Spillway Discharge
  sdAverage: string
  edAmount: string // Ecological Discharge
  edAverage: string
}
const initialInfoData: InfoData = {
  upstreamLevel: '0',
  downstreamLevel: '0',
  amountStorageReservoir: '0',
  averageStoreReservoir: '0',
  totalActiveReservoir: '0',
  averageActiveReservoir: '0',
  tdAmount: '0',
  tdAverage: '0',
  sdAmount: '0',
  sdAverage: '0',
  edAmount: '0',
  edAverage: '0'
}

// const unit = 3

const Dailydadform = () => {
  const router = useRouter()

  // const id = router?.query?.id
  const { id } = router.query

  // id = id?.length ? id[0] : ''

  // console.log('ID====>', id)

  // stores
  const { customer } = stores.useCustomer()

  // const unit = customer.unit || 1
  // console.log('unit', unit)
  // console.log('customer', customer.unit)
  // console.log('customer', customer)

  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [unitValues, setUnitValues] = useState<string[]>([])
  const [remarks, setRemark] = useState<string[]>([])
  const [maxs, setMax] = useState<number[]>([])
  const [mins, setMin] = useState<number[]>([])
  const [remark, setRemarkData] = useState('')
  const [revise, setRevise] = useState<boolean>(false)
  const [infoData, setInfoData] = useState<InfoData>(initialInfoData)

  const [isLoading, setIsLoading] = useState(false)

  const [showAlert, setShowAlert] = useState(false)

  const handleClickOpen = () => setOpen(true)

  // ** Query
  const { data, loading: dataLoading } = useQuery(DAILY_POWER_PURCHASE, {
    variables: {
      dayPowerPurchaseId: id as string
    },
    fetchPolicy: 'network-only'
  })

  const result = data?.dayPowerPurchase ? data.dayPowerPurchase : null
  const unit = result?.totalUnit || 1

  const decUser: User | null = result && result.decUserId ? (result.decUserId as User) : null
  const decCustomer: Customer | null = result && result.decCustomerId ? (result.decCustomerId as Customer) : null
  const disUser: User | null = result && result.disUserId ? (result.disUserId as User) : null
  const disCustomer: Customer | null = result && result.disCustomerId ? (result.disCustomerId as Customer) : null

  // console.log(data?.dayPowerPurchase)

  // ** Mutation
  const [acknowledgedDayDeclaration, { loading: acknowledgedLoading }] = useMutation(ACKNOWLEDGED_DAY_DECLARATION, {
    onCompleted: data => {
      handleClose()

      // console.log(data)
    },
    refetchQueries: [
      {
        query: DAILYDISPATCHS,
        variables: {
          queryInput: {
            pageginate: { limit: 10, page: 0 }
          }
        }
      }
    ]
  })
  const loading = acknowledgedLoading

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

  const handleTotal = (index: number, value: string) => {
    console.log(`index: ${index}, value: ${value}`)

    const updatedRemarkValues = [...remarks]
    updatedRemarkValues[index] = String(value)
    setRemark(updatedRemarkValues)
  }
  const handleRemark = (index: number, value: string) => {
    // console.log(`index: ${index}, value: ${value}`)

    const updatedRemarkValues = [...remarks]
    updatedRemarkValues[index] = String(value)
    setRemark(updatedRemarkValues)
  }
  const handleMax = (index: number, value: string) => {
    // console.log(`index: ${index}, value: ${value}`)

    const updatedMaxValues = [...maxs]
    updatedMaxValues[index] = parseFloat(value)
    setMax(updatedMaxValues)
  }
  const handleMin = (index: number, value: string) => {
    // console.log(`index: ${index}, value: ${value}`)

    const updatedMinValues = [...mins]
    updatedMinValues[index] = parseFloat(value)
    setMin(updatedMinValues)
  }
  const handleSubmit = async () => {
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
      upstreamLevel: parseFloat(infoData.upstreamLevel) || 0,
      downstreamLevel: parseFloat(infoData.downstreamLevel) || 0,
      totalStorage: {
        amount: parseFloat(infoData.amountStorageReservoir) || 0,
        average: parseFloat(infoData.averageStoreReservoir) || 0
      },
      activeStorage: {
        amount: parseFloat(infoData.averageStoreReservoir) || 0,
        average: parseFloat(infoData.averageActiveReservoir) || 0
      }
    }
    const waterDischarge = {
      turbineDischarge: {
        amount: parseFloat(infoData.tdAmount) || 0,
        average: parseFloat(infoData.tdAverage) || 0
      },
      spillwayDischarge: {
        amount: parseFloat(infoData.sdAmount) || 0,
        average: parseFloat(infoData.sdAverage) || 0
      },
      ecologicalDischarge: {
        amount: parseFloat(infoData.edAmount) || 0,
        average: parseFloat(infoData.edAverage) || 0
      }
    }
    const machinesAvailability = { maxs, mins }

    const newData = {
      id: id as string,
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
      await acknowledgedDayDeclaration({
        variables: {
          acknowledgedDayDeclarationInput: newData
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  const totalDischarge = () => {
    const tdAmount = infoData.tdAmount ? parseFloat(infoData.tdAmount) : 0
    const tdAverage = infoData.tdAverage ? parseFloat(infoData.tdAverage) : 0
    const sdAmount = infoData.sdAmount ? parseFloat(infoData.sdAmount) : 0
    const sdAverage = infoData.sdAverage ? parseFloat(infoData.sdAverage) : 0
    const edAmount = infoData.edAmount ? parseFloat(infoData.edAmount) : 0
    const edAverage = infoData.edAverage ? parseFloat(infoData.edAverage) : 0
    const totalAmount = tdAmount + sdAmount + edAmount
    const totalAverage = tdAverage + sdAverage + edAverage

    return <Box sx={{ ml: 5 }}>{`${totalAmount.toFixed(2)} MCM   ||   ${totalAverage.toFixed(2)} m³/s`}</Box>
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

  useEffect(() => {
    if (result) {
      const { powers, remark, remarks, machinesAvailability, reservoirSituation, waterDischarge } = result
      const info: InfoData = {
        upstreamLevel: String(reservoirSituation.upstreamLevel),
        downstreamLevel: String(reservoirSituation.downstreamLevel),
        amountStorageReservoir: String(reservoirSituation.totalStorage.amount),
        averageStoreReservoir: String(reservoirSituation.totalStorage.average),
        totalActiveReservoir: String(reservoirSituation.activeStorage.amount),
        averageActiveReservoir: String(reservoirSituation.activeStorage.average),
        tdAmount: String(waterDischarge.turbineDischarge.amount),
        tdAverage: String(waterDischarge.turbineDischarge.average),
        sdAmount: String(waterDischarge.spillwayDischarge.amount),
        sdAverage: String(waterDischarge.spillwayDischarge.amount),
        edAmount: String(waterDischarge.ecologicalDischarge.amount),
        edAverage: String(waterDischarge.ecologicalDischarge.amount)
      }
      setUnitValues(powers)
      setRemark(remarks)
      setRemarkData(remark || '')
      setMax(machinesAvailability.maxs)
      setMin(machinesAvailability.mins)
      setInfoData(info)
    }
  }, [dataLoading])
  const btnStatus = !result?.decAcknowleged ? !result?.decAcknowleged : revise && result?.decAcknowleged

  const renderUserAcknowlade = (
    <Grid item xs={12}>
      <Box padding={5}>
        <HorizontalList>
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1.5, display: 'flex' }}>
                <Icon icon='mingcute:high-voltage-power-line' fontSize={32} />
              </Box>
              <Typography sx={{ fontWeight: 600 }}>Declaration</Typography>
            </Box>
            <Typography sx={{ color: 'text.secondary' }}>
              {`${decCustomer?.company} || ( ${decCustomer?.abbreviation} ` || '--'}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{decCustomer?.address || '--'}</Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 4
              }}
            >
              <Typography variant='h6' sx={{ mr: 2 }}>
                Acknowleged:
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src='/images/avatars/16.png' sx={{ mr: 3, width: 38, height: 38 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {`Name: ${decUser?.fName || '-'} ${decUser?.lName || '-'}`}
                </Typography>
                <Typography variant='caption'>{`Date: ${
                  result?.updatedAt ? formatDate(result?.updatedAt) : '--'
                }`}</Typography>
                <Typography variant='caption'>
                  {`Time: ${result?.updatedAt ? formatDateToMonthShort(result?.updatedAt) : '--'}`}
                </Typography>
              </Box>
            </Box>
          </ListItem>
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1.5, display: 'flex' }}>
                <Icon icon='mdi:company' fontSize={30} />
              </Box>
              <Typography sx={{ fontWeight: 600 }}>Dispatch</Typography>
            </Box>
            <Typography sx={{ color: 'text.secondary' }}>
              {`${decCustomer?.company} || ${disCustomer?.abbreviation}` || '--'}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{disCustomer?.address || '--'}</Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 4
              }}
            >
              <Typography variant='h6' sx={{ mr: 2 }}>
                Issued by EDL:
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src='/images/avatars/16.png' sx={{ mr: 3, width: 38, height: 38 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {`Name: ${disUser?.fName || '-'} ${disUser?.lName || '-'}`}
                </Typography>
                <Typography variant='caption'>
                  {`Date: ${result?.updatedAt && disUser ? formatDate(result?.updatedAt) : '--'}`}
                </Typography>
                <Typography variant='caption'>
                  {`Time: ${result?.updatedAt && disUser ? formatDateToMonthShort(result?.updatedAt) : '--'}`}
                </Typography>
              </Box>
            </Box>
          </ListItem>
        </HorizontalList>
      </Box>
    </Grid>
  )

  const renderDetail = (
    <Card>
      <CardHeader title='Daily Availability' sx={{ textAlign: 'center', fontWeight: 'bold' }} />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
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
                            <CustomTextField
                              disabled
                              label={`Unit-${index + 1} (MW)`}
                              style={{
                                marginTop: '5px',
                                width: '160px'
                              }}
                              type='text'
                              placeholder={`Unit-${index + 1} (MW)`}
                              value={maxs[index]}
                              onChange={event => handleMax(index, event.target.value)}
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
                            <CustomTextField
                              disabled
                              label={`Unit-${index + 1}(MW)`}
                              style={{
                                marginTop: '5px',
                                width: '160px'
                              }}
                              type='text'
                              placeholder={`Unit-${index + 1}`}
                              value={mins[index]}
                              onChange={event => handleMin(index, event.target.value)}
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
              <CustomTextField
                disabled
                type='text'
                fullWidth
                required
                label='Upstream Level (masl)'
                placeholder='Upstream Level'
                value={infoData.upstreamLevel}
                onChange={e => setInfoData({ ...infoData, upstreamLevel: e.target.value || '' })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                disabled
                fullWidth
                required
                label='Downstream Level (masl)'
                placeholder='Downstream Level'
                value={infoData.downstreamLevel}
                onChange={e => setInfoData({ ...infoData, downstreamLevel: e.target.value || '' })}
              />
            </Grid>
            <Grid container spacing={5} item xs={24} sm={12}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                    Total Storage:
                  </Typography>
                  <CustomTextField
                    disabled
                    sx={{ mr: 2 }}
                    fullWidth
                    required
                    placeholder='MCM'
                    label='Amount (MCM)'
                    value={infoData.amountStorageReservoir}
                    onChange={e => setInfoData({ ...infoData, amountStorageReservoir: e.target.value || '' })}
                  />
                  <CustomTextField
                    disabled
                    fullWidth
                    required
                    placeholder='(%)'
                    label='Percent (%) '
                    value={infoData.averageStoreReservoir}
                    onChange={e => setInfoData({ ...infoData, averageStoreReservoir: e.target.value || '' })}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                    Active Storage:
                  </Typography>
                  <CustomTextField
                    disabled
                    sx={{ mr: 2 }}
                    fullWidth
                    required
                    placeholder='MCM'
                    label='Amount (MCM)'
                    value={infoData.totalActiveReservoir}
                    onChange={e => setInfoData({ ...infoData, totalActiveReservoir: e.target.value || '' })}
                  />
                  <CustomTextField
                    disabled
                    fullWidth
                    required
                    placeholder='(%)'
                    label='Percent (%)'
                    value={infoData.averageActiveReservoir}
                    onChange={e => setInfoData({ ...infoData, averageActiveReservoir: e.target.value || '' })}
                  />
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
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                  Turbine Discharge:
                </Typography>
                <CustomTextField
                  disabled
                  sx={{ mr: 2 }}
                  fullWidth
                  required
                  placeholder='MCM'
                  label='Amount (MCM)'
                  value={infoData.tdAmount}
                  onChange={e => setInfoData({ ...infoData, tdAmount: e.target.value || '' })}
                />
                <CustomTextField
                  disabled
                  fullWidth
                  required
                  placeholder='( m³/s)'
                  label='Average ( m³/s)'
                  value={infoData.tdAverage}
                  onChange={e => setInfoData({ ...infoData, tdAverage: e.target.value || '' })}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                  Turbine Discharge:
                </Typography>
                <CustomTextField
                  disabled
                  sx={{ mr: 2 }}
                  fullWidth
                  required
                  placeholder='MCM'
                  label='Amount (MCM)'
                  value={infoData.sdAmount}
                  onChange={e => setInfoData({ ...infoData, sdAmount: e.target.value || '' })}
                />
                <CustomTextField
                  disabled
                  fullWidth
                  required
                  placeholder='( m³/s)'
                  label='Average ( m³/s)'
                  value={infoData.sdAverage}
                  onChange={e => setInfoData({ ...infoData, sdAverage: e.target.value || '' })}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, lineHeight: 'normal' }}>
                  Turbine Discharge:
                </Typography>
                <CustomTextField
                  disabled
                  sx={{ mr: 2 }}
                  fullWidth
                  required
                  placeholder='MCM'
                  label='Amount (MCM)'
                  value={infoData.edAmount}
                  onChange={e => setInfoData({ ...infoData, edAmount: e.target.value || '' })}
                />
                <CustomTextField
                  disabled
                  fullWidth
                  required
                  placeholder='( m³/s)'
                  label='Average ( m³/s)'
                  value={infoData.edAverage}
                  onChange={e => setInfoData({ ...infoData, edAverage: e.target.value || '' })}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: 'flex',
                  mt: 4,
                  fontWeight: 'bold',
                  backgroundColor: '#f0f0f0',

                  borderRadius: 1,
                  padding: 2,
                  fontSize: 16
                }}
              >
                Total Discharge: {totalDischarge()}
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
          <Box
            sx={{
              py: 4,
              px: 6,
              rowGap: 2,
              columnGap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button onClick={() => handleClose()} variant='contained' startIcon={<Icon icon='ic:round-arrow-back' />}>
              Back
            </Button>
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>Daily Availability Dispatch</Typography>
            <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button
                onClick={() => setRevise(!revise)}
                variant='contained'
                sx={{ '& svg': { mr: 2 } }}
                color={!revise ? 'primary' : 'error'}
              >
                <Icon fontSize='1.125rem' icon={!revise ? 'fe:edit' : 'ic:outline-cancel'} />
                {`${!revise ? 'Revise' : 'Cancel'}`}
              </Button>
              {/* <Exportpdf /> */}
            </Box>
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
                        sx={{ mt: 6 }}
                      >
                        {i}
                      </TableCell>
                      {[...Array(unit)].map((_, colIndex) => (
                        <TableCell key={colIndex}>
                          <NumberFormatComponent
                            disabled={!btnStatus}
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
                {/* <Box sx={{ mt: 5, borderRadius: '50%', padding: '10px' }}>
                  <CustomTextField
                    fullWidth
                    type='text'
                    value={`Total: ${unitValues.reduce((a, b) => Number(a) + Number(b), 0)} Mw`}
                    disabled
                    InputProps={{ readOnly: true }}
                    sx={{ fontWeight: 'bold', color: theme => theme.palette.text.primary }}
                  />
                </Box> */}
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
                {renderUserAcknowlade}
                {/* <Grid item xs={12}>
                
                  {AcknowlegeUser(result as DayPowerPurchase)}
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
                    {revise ? (
                      <Button
                        fullWidth
                        type='submit'
                        size='large'
                        variant='contained'
                        onClick={handleSubmit}
                        disabled={loading || !btnStatus}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                      >
                        {loading ? 'Loading...' : 'Revise Declaration'}
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        type='submit'
                        size='large'
                        variant='contained'
                        onClick={handleSubmit}
                        disabled={loading || !btnStatus}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                      >
                        {loading ? 'Loading...' : 'Acknowledged Declaration'}
                      </Button>
                    )}
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
