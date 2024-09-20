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
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import * as NumberFormat from 'react-number-format'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const NumberFormatComponent = NumberFormat.NumericFormat || NumberFormat

interface CardDataType {
  title: string
  avatars: string[]
  totalUsers: number
}

// const rolesArr: string[] = [
//   '00:00-1:00',
//   'Content Management',
//   'Disputes Management',
//   'Database Management',
//   'Financial Management',
//   'Reporting',
//   'API Control',
//   'Repository Management',
//   'Payroll'
// ]
const rolesArr: string[] = Array.from(Array(24), (_, i) => {
  const startHour = i.toString().padStart(2, '0')
  const endHour = ((i + 1) % 24).toString().padStart(2, '0')

  return `${startHour}:00-${endHour}:00`
})
const dayOfWeekArr: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const unit = dayOfWeekArr.length // Number of days of the week

const Weekddform = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [unitValues, setUnitValues] = useState(Array(rolesArr.length * unit).fill('0'))
  const [remark, setRemark] = useState(Array(rolesArr.length).fill(''))
  const router = useRouter()

  const [edit, Setedit] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleClickOpen = () => setOpen(true)

  const handleUnitChange = (index: number, value: string) => {
    console.log(`index: ${index}, value: ${value}`)

    const parsedValue = Math.abs(Number(value))

    // console.log('parsedValue===>', parsedValue)

    // Logic Unit
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

  const handleEdit = () => {
    Setedit(true)
  }

  const handleSave = () => {
    Setedit(false)
    setShowAlert(true)
  }

  const handleRemark = (index: number, value: string) => {
    console.log(`index: ${index}, value: ${value}`)

    const updatedRemarkValues = [...remark]
    updatedRemarkValues[index] = String(value)
    setRemark(updatedRemarkValues)
  }

  const handleSubmit = () => {
    console.log('Data===>', unitValues)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
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
          <Typography sx={{ textAlign: 'center', fontWeight: 'bold', mt: 4 }}>Weekly dispatch</Typography>

          <TableContainer sx={{ border: 'none', mt: 3, maxHeight: 1000 }}>
            <Table stickyHeader size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important', position: 'sticky', top: 0, zIndex: 1 }}>
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
                          textAlign: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }}
                        sx={{ mt: 5 }}
                      >
                        {i}
                      </TableCell>
                      {[...Array(unit)].map((_, colIndex) => (
                        <TableCell key={colIndex}>
                          <NumberFormatComponent
                            disabled={!edit}
                            style={{
                              borderRadius: 5,
                              border: '1px solid ',
                              borderColor: 'rgba(0, 0, 0, 0.23)',
                              padding: '10px',
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
                          style={{
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
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              mt: 5,
              padding: '10px',
              whiteSpace: 'nowrap',
              alignItems: 'center',
              textTransform: 'capitalize',
              '& svg': { ml: 1, cursor: 'pointer' },
              color: theme => theme.palette.text.secondary,
              fontSize: theme => theme.typography.h6.fontSize
            }}
          >
            &nbsp;
            <CustomTextField
              disabled
              fullWidth
              value={`Total: ${unitValues.reduce((a, b) => Number(a) + Number(b), 0)} Mw`}
            />
          </Box>

          <Box sx={{ mt: 5, width: '100%', padding: '10px' }}>
            &nbsp;
            <CustomTextField
              fullWidth
              variant='outlined'
              rows={4}
              multiline
              label='Remark'
              id='textarea-outlined-static'
            />
          </Box>

          <Box className='demo-space-x' sx={{ mb: 5, padding: '10px' }}>
            <Snackbar
              open={showAlert}
              autoHideDuration={2000}
              onClose={() => setShowAlert(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert variant='filled' severity='success' onClose={() => setShowAlert(false)}>
                Confirm successfully!
              </Alert>
            </Snackbar>
            &nbsp;
            {edit ? (
              <Button fullWidth type='submit' variant='contained' onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button fullWidth type='submit' variant='contained' onClick={handleEdit}>
                Edit
              </Button>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Weekddform
