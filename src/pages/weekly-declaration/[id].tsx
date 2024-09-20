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
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import SaveIcon from '@mui/icons-material/Save'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { WEEK_DEC, WEEK_POWER_PURCHASE } from '@/lib/query'
import { WEEK_ACKNOWLEDGED_DIS } from '@/lib/mutation'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** import numberformat
import * as NumberFormat from 'react-number-format'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import auth from 'src/configs/auth'
import stores from '@/stores/index'
import { DayPowerPurchase, WeekPowerPurchase } from '@/__generated__/graphql'
import AcknowlegeUser from 'src/@core/components/acknowlege/AcknowlegeUser'

const NumberFormatComponent = NumberFormat.NumericFormat || NumberFormat

interface CardDataType {
  title: string
  avatars: string[]
  totalUsers: number
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
const dayOfWeekArr: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// const unit = 3

const Dailydadform = () => {
  const router = useRouter()

  // const id = router?.query?.id
  const { id } = router.query

  // id = id?.length ? id[0] : ''

  // console.log('ID====>', id)

  // stores
  const { customer } = stores.useCustomer()

  // ** States
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [unitValues, setUnitValues] = useState<string[]>([])
  const [remarks, setRemark] = useState<string[]>([])
  const [maxs, setMax] = useState<number[]>([])
  const [mins, setMin] = useState<number[]>([])
  const [remark, setRemarkData] = useState('')
  const [rewrite, setRewrite] = useState<boolean>(false)

  const [showAlert, setShowAlert] = useState(false)

  // ** Query
  const { data, loading: dataLoading } = useQuery(WEEK_POWER_PURCHASE, {
    variables: {
      weekPowerPurchaseId: id as string
    }
  })

  const result = data?.weekPowerPurchase ? data.weekPowerPurchase : null
  const unit = result?.totalUnit || 1

  // console.log(data?.dayPowerPurchase)

  // ** Mutation

  const [acknowledgedWeekDispatch, { loading: acknowledgedLoading }] = useMutation(WEEK_ACKNOWLEDGED_DIS, {
    onCompleted: data => {
      handleClose()
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
      title: `Day-${index + 1}`
    }))
    const newData = {
      id: id as string,
      powerDetail,
      powers: unitValues,
      remarks,
      remark
    }

    // console.log('newData===>', newData)
    // console.log('Total Unit===>', unitValues)
    // console.log(total())
    try {
      await acknowledgedWeekDispatch({
        variables: {
          acknowledgedWeekDispatch: newData
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

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  useEffect(() => {
    if (result) {
      const { powers, remark, remarks } = result
      setUnitValues(powers)
      setRemark(remarks)
      setRemarkData(remark || '')
    }
  }, [dataLoading])
  const btnStatus = !result?.disAcknowleged ? !result?.disAcknowleged : rewrite && result?.decAcknowleged

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Card>
          {/* <Typography sx={{ textAlign: 'center', fontWeight: 'bold', mt: 4 }}>Week Availability Declaration</Typography> */}
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
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>Week Declaration</Typography>
            <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button
                onClick={() => setRewrite(!rewrite)}
                variant='contained'
                sx={{ '& svg': { mr: 2 } }}
                color={!rewrite ? 'primary' : 'error'}
              >
                <Icon fontSize='1.125rem' icon={!rewrite ? 'fe:edit' : 'ic:outline-cancel'} />
                {`${!rewrite ? 'Revise' : 'Cancel'}`}
              </Button>
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
                  {dayOfWeekArr.map((day, index) => (
                    <TableCell key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          whiteSpace: 'nowrap',
                          ml: 10,
                          textTransform: 'capitalize',
                          '& svg': { ml: 1, cursor: 'pointer' },
                          color: theme => theme.palette.text.secondary,
                          fontSize: theme => theme.typography.h6.fontSize
                        }}
                      >
                        {day}
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
                      fontSize: theme => theme.typography.h5.fontSize
                    }}
                  >
                    {`${unitValues.reduce((a, b) => Number(a) + Number(b), 0).toLocaleString()} Mw`}
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
                    disabled={!btnStatus}
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
                {/* <Grid item xs={12}>
                  {AcknowlegeUser(result as WeekPowerPurchase)}
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
                      onClick={handleSubmit}
                      disabled={loading || !btnStatus || !result?.decAcknowleged}
                      startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                      {loading ? 'Loading...' : 'Acknowledged Declaration'}
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
