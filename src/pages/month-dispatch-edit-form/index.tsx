/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
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
import CustomTextField from 'src/@core/components/mui/text-field'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

interface CardDataType {
  title: string
  avatars: string[]
  totalUsers: number
}

const NumberFormatComponent = NumberFormat.NumericFormat || NumberFormat

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

const Monthmdform = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<'Add' | 'Edit'>('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState<boolean>(false)
  const [unitValues, setUnitValues] = useState(Array(rolesArr.length * unit).fill('0'))
  const [remark, setRemark] = useState(Array(rolesArr.length).fill(''))

  const [edit, Setedit] = useState<boolean>(false)

  const [showAlert, setShowAlert] = useState(false)

  const inputRef = useRef(null)

  const handleClickOpen = () => setOpen(true)

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

  const handleEdit = () => {
    Setedit(true)
  }

  const handleSave = () => {
    setShowAlert(true)
    Setedit(false)
  }

  const handleRemark = (index: number, value: string) => {
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

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      rolesArr.forEach(row => {
        const id = row.toLowerCase().split(' ').join('-')
        togglePermission(`${id}-read`)
        togglePermission(`${id}-write`)
        togglePermission(`${id}-create`)
      })
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
          <Typography sx={{ textAlign: 'center', fontWeight: 'bold', mt: 4 }}>Monthly dispatch</Typography>
          <TableContainer sx={{ border: 'none', maxHeight: 1000 }}>
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
                        {`day-${index + 1}`}
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
                            disabled={!edit}
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
          </Box>{' '}
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
                Acknowledged
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

export default Monthmdform
