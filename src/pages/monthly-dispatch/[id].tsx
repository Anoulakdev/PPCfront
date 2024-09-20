/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
import * as NumberFormat from 'react-number-format'

const NumberFormatComponent = NumberFormat.NumericFormat || NumberFormat

import CustomTextField from 'src/@core/components/mui/text-field'
import ActivityTimeline from 'src/views/pages/user-profile/profile/ActivityTimeline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { MONTH_DEC, MONTH_PPC } from '@/lib/query'
import { MONTH_ACKNOWLEDGED_DEC, MONTH_CREATE_DECLARATION } from '@/lib/mutation'

import CircularProgress from '@mui/material/CircularProgress'

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
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}
const date = new Date()
const currentYear = date.getFullYear()
const currentMonth = date.getMonth() + 1
const unit = getDaysInMonth(currentYear, currentMonth)

const Monthdadform = () => {
  const router = useRouter()
  const { id } = router.query

  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [unitValues, setUnitValues] = useState<string[]>([])
  const [remarks, setRemark] = useState<string[]>([])
  const [remark, setRemarkData] = useState('')
  const [rewrite, setRewrite] = useState<boolean>(false)

  const inputRef = useRef(null)

  // ** Query
  const { data, loading: dataLoading } = useQuery(MONTH_PPC, {
    variables: {
      monthPowerPurchaseId: id as string
    },
    fetchPolicy: 'network-only'
  })

  const result = data?.monthPowerPurchase ? data.monthPowerPurchase : null
  const unit = result?.totalUnit || 1

  const handleClickOpen = () => setOpen(true)

  // ** Mutation
  const [acknowledgedMonthDeclaration, { loading: createLoading }] = useMutation(MONTH_ACKNOWLEDGED_DEC, {
    onCompleted: data => {
      handleClose()

      // console.log(data)
    },
    refetchQueries: [
      {
        query: MONTH_DEC,
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
      await acknowledgedMonthDeclaration({
        variables: {
          acknowledgedMonthDeclaration: newData
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleClose = () => {
    setUnitValues(Array(rolesArr.length).fill(''))
    setRemark(Array(rolesArr.length).fill(''))
    setRemarkData('')
    router.back()
  }

  const togglePermission = (id: string) => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
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

  const btnStatus = !result?.decAcknowleged ? !result?.decAcknowleged : rewrite && result?.decAcknowleged

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Card>
          {/* <Typography sx={{ textAlign: 'center', fontWeight: 'bold', mt: 4 }}>Monthly declaration</Typography> */}
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
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>Monthly Dispatch</Typography>
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
          <TableContainer sx={{ border: 'none' }}>
            <Table stickyHeader aria-label='sticky table' size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important', position: 'sticky', top: 0, left: 0, zIndex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        whiteSpace: 'nowrap',
                        ml: 10,
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        '& svg': { ml: 1, cursor: 'pointer' },
                        color: theme => theme.palette.text.secondary,
                        fontSize: theme => theme.typography.h6.fontSize
                      }}
                    >
                      Time
                    </Box>
                  </TableCell>
                  {[...Array(unit)].map((_, index) => (
                    <TableCell key={index} sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
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
                        {`day-${index + 1}(MW)`}
                      </Box>
                    </TableCell>
                  ))}
                  <TableCell sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
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
              <TableBody>
                {rolesArr.map((i: string, rowIndex: number) => {
                  return (
                    <TableRow key={rowIndex} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                      <TableCell
                        style={{
                          display: 'flex',
                          marginLeft: '10px',
                          whiteSpace: 'nowrap',
                          textAlign: 'center',
                          justifyContent: 'center',
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
                              width: '120px'
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
                          disabled={!btnStatus}
                          style={{
                            marginTop: '5px',
                            width: '120px'
                          }}
                          type='text'
                          placeholder='Remark'
                          value={remark[rowIndex]}
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
                    {`${unitValues.reduce((a, b) => Number(a) + Number(b), 0).toLocaleString()} MWh`}
                  </Box>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 5, width: '100%', padding: '10px' }}>
            <CustomTextField
              disabled={!btnStatus}
              fullWidth
              variant='outlined'
              rows={4}
              multiline
              label='Remark'
              id='textarea-outlined-static'
            />
          </Box>
          <Box sx={{ mt: 5, width: '100%', padding: '10px' }}>{/* <ActivityTimeline /> */}</Box>
          <Box className='demo-space-x' sx={{ mb: 5, padding: '10px' }}>
            {rewrite ? (
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
        </Card>
      </Grid>
    </Grid>
  )
}

export default Monthdadform
