/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Imports
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Button, Tooltip } from '@mui/material'

import Translations from 'src/layouts/components/Translations'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { CUSTOMERS } from '@/lib/query'
import { Customer } from '@/__generated__/graphql'
import { DEL_CUSTOMER } from '@/lib/mutation'

// ** Store Imports

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports

// ** Third Party Components
import axios from 'axios'

// ** Stores Imports
import { Action, Pagegination } from '@/globalState'

// ** Stores Imports
import stores from '@/stores/index'

// ** Types Imports
import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { CustomerDataType } from 'src/types/customerType'
import { CardStatsHorizontalWithDetailsProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/customer/TableHeader'
import CustomerDrawer from 'src/views/customer/CustomerDrawer'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface CellType {
  row: Customer
}

// ** renders client column
const userRoleObj: UserRoleType = {
  1: { icon: 'pepicons-pencil:electricity', color: 'error' },
  2: { icon: 'fluent:building-32-regular', color: 'success' }
}

// ** renders client column

const defultColumn = [
  {
    flex: 0.2,
    minWidth: 200,
    headerName: 'Name',
    field: 'name',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {`${row.name} (${row.abbreviation})`}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'type',
    minWidth: 170,
    headerName: 'Type',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            skin='light'
            sx={{ mr: 4, width: 30, height: 30 }}
            color={(userRoleObj[row.type].color as ThemeColor) || 'primary'}
          >
            <Icon icon={userRoleObj[row.type].icon} />
          </CustomAvatar>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.type === 1 ? 'Declaration' : 'Dispatch'}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'company',
    headerName: 'Company',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.company}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'unit',
    headerName: 'Unit',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.unit}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'phone',
    headerName: 'Phone',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.phone}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.address}
        </Typography>
      )
    }
  }
]

const UserList = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState<Pagegination>({ page: 0, pageSize: 10 })
  const [id, setId] = useState<string>('')
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  // ** Stores
  const { setCustomerAction, setCustomer } = stores.useCustomer()

  // Query
  const { data, loading: loadingData } = useQuery(CUSTOMERS, {
    variables: {
      queryInput: {
        pageginate: { limit: paginationModel.pageSize, page: paginationModel.page },
        search: {
          q: value,
          searchField: ['name', 'company', 'phone']
        }
      }
    }
  })

  // ** Mutation
  const [removeCustomer, { loading: loadingDel }] = useMutation(DEL_CUSTOMER, {
    onCompleted: () => {
      onCloseDialog()
    },
    refetchQueries: [
      {
        query: CUSTOMERS,
        variables: {
          queryInput: {
            pageginate: { limit: paginationModel.pageSize, page: paginationModel.page },
            search: {
              q: '',
              searchField: ['name', 'company', 'phone']
            }
          }
        }
      }
    ]
  })
  const customers = data?.customers ? data?.customers : []

  const loading = loadingData || loadingDel

  // ** Hooks
  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleEdit = (customer: CustomerDataType) => {
    setCustomer(customer)
    setCustomerAction(Action.edit)
  }
  const onCloseDialog = () => {
    setOpenDialog(false)
    setId('')
  }
  const delUser = async () => {
    try {
      setOpenDialog(false)
      await removeCustomer({ variables: { removeCustomerId: id } })
    } catch (error) {
      console.log(error)
    }
  }

  const columns: GridColDef[] = [
    ...defultColumn,
    {
      flex: 0.15,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View' placement='top' arrow>
            <IconButton style={{ marginTop: '5px' }}>
              <VisibilityRoundedIcon fontSize='small' color='action' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Update' placement='top' arrow>
            <IconButton
              onClick={() => {
                const rowData = row as CustomerDataType
                handleEdit(rowData)
              }}
            >
              <BorderColorRoundedIcon fontSize='small' color='primary' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete' placement='top' arrow>
            <IconButton
              onClick={() => {
                setId(row._id)
                setOpenDialog(true)
              }}
            >
              <DeleteOutlineRoundedIcon fontSize='small' color='error' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} />
          <DataGrid
            autoHeight
            loading={loading}
            rowHeight={62}
            getRowId={row => row._id}
            rows={customers}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <Dialog sx={{ fontFamily: 'Noto Sans Lao' }} open={openDialog} onClose={onCloseDialog}>
        <DialogTitle sx={{ fontFamily: 'Noto Sans Lao' }}>
          <Translations text={'Delete power source'} />
        </DialogTitle>
        <DialogContent>
          <Translations text={'Are you sure you want to delete this power source?'} />
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontFamily: 'Noto Sans Lao' }} onClick={onCloseDialog}>
            <Translations text={'Cancel'} />
          </Button>
          <Button sx={{ fontFamily: 'Noto Sans Lao' }} color='error' onClick={delUser}>
            <Translations text={'Delete'} />
          </Button>
        </DialogActions>
      </Dialog>

      <CustomerDrawer pageginate={paginationModel} />
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData: CardStatsType = res.data

  return {
    props: {
      apiData
    }
  }
}

export default UserList
