/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useEffect, useState } from 'react'

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

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import SaveIcon from '@mui/icons-material/Save'

// ** Graphql
import { useMutation } from '@apollo/client'
import { WEEK_DEC } from '@/lib/query'
import { CREATE_WEEK_DECLARATION } from '@/lib/mutation'

import * as NumberFormat from 'react-number-format'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import router from 'next/router'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

const NumberFormatComponent = NumberFormat.NumericFormat || NumberFormat

interface CardDataType {
  title: string
  avatars: string[]
  totalUsers: number
}

const rolesArr: string[] = Array.from(Array(24), (_, i) => {
  const startHour = i.toString().padStart(2, '0')
  const endHour = ((i + 1) % 24).toString().padStart(2, '0')

  return `${startHour}:00-${endHour}:00`
})
const dayOfWeekArr: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const unit = dayOfWeekArr.length // Number of days of the week

const Weekdadform = () => {
  // ** States
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [unitValues, setUnitValues] = useState(Array(rolesArr.length * unit).fill('0'))
  const [remarks, setRemark] = useState(Array(rolesArr.length).fill(''))
  const [remark, setRemarkData] = useState('')
  const router = useRouter()

  // const [dataVa, setDataVa] = useState(Array(unit).fill([]))
  // useEffect(()=>{

  // },[])

  const [isLoading, setIsLoading] = useState(false)

  const [showAlert, setShowAlert] = useState(false)

  const handleClickOpen = () => setOpen(true)

  // ** Mutation
  const [createWeekPowerPurchase, { loading: createLoading }] = useMutation(CREATE_WEEK_DECLARATION, {
    onCompleted: data => {
      handleClose()

      // console.log(data)
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
      powerDetail,
      powers: unitValues,
      remarks,
      remark
    }

    // console.log('newData===>', newData)

    // console.log('Total Unit===>', unitValues)
    // console.log(total())
    try {
      await createWeekPowerPurchase({
        variables: {
          createWeekPowerPurchaseInput: newData
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

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Card>
          <Typography sx={{ textAlign: 'center', fontWeight: 'bold', mt: 4, mb: 4 }}>
            Daily Availability Declaration
          </Typography>
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
                  {dayOfWeekArr.map((data, index) => (
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
                        {data}
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
                    {/* <LoadingButton
                      // startIcon={<SaveIcon />}
                      loading={loading}
                      size='large'
                      type='submit'
                      variant='contained'
                      sx={{ mr: 3 }}
                    >
                      Save
                    </LoadingButton> */}
                    <Button
                      fullWidth
                      type='submit'
                      size='large'
                      variant='contained'
                      onClick={handleSubmit}
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

export default Weekdadform
