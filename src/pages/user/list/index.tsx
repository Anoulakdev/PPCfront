// ** React Imports
import { useState, useCallback } from 'react'

// ** Next Imports
import { GetStaticProps } from 'next/types'

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

// ** Icon Imports
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { USERS } from '@/lib/query'
import { User } from '@/__generated__/graphql'
import { UserDataType } from 'src/types/userType'
import { DEL_USER } from '@/lib/mutation'

// ** Store Imports

// ** Third Party Components
import axios from 'axios'

// ** Stores Imports
import { Action, Pagegination } from '@/globalState'

// ** Stores Imports
import stores from '@/stores/index'

// ** Types Imports
// import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/UserDrawer'

interface CellType {
  row: User
}

const defultColumn = [
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Full Name',
    field: 'fName',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.fName + ' ' + row.fName}
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

  // {
  //   flex: 0.15,
  //   minWidth: 100,
  //   field: 'customerId',
  //   headerName: 'Customer',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Typography noWrap sx={{ color: 'text.secondary' }}>
  //         {row.customerId?.name}
  //       </Typography>
  //     )
  //   }
  // },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'customerId',
    headerName: 'Company',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.customerId?.company}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'roleId',
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.roleId?.name}
        </Typography>
      )
    }
  }
]

const UserList = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState<Pagegination>({ page: 0, pageSize: 10 })
  const [id, setId] = useState<string>('')
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  // ** Stores
  const { setUserAction, setUser } = stores.useUser()

  // Query
  const { data, loading: loadingData } = useQuery(USERS, {
    variables: {
      queryInput: {
        pageginate: { limit: paginationModel.pageSize, page: paginationModel.page },
        search: {
          q: value,
          searchField: ['fName', 'lName', 'phone']
        }
      }
    }
  })

  // ** Mutation
  const [removeUser, { loading: loadingDel }] = useMutation(DEL_USER, {
    onCompleted: () => {
      onCloseDialog()

      // console.log(data)
    },
    refetchQueries: [
      {
        query: USERS,
        variables: {
          queryInput: {
            pageginate: { limit: paginationModel.pageSize, page: paginationModel.page },
            search: {
              q: '',
              searchField: ['fName', 'lName', 'phone']
            }
          }
        }
      }
    ]
  })
  const users = data?.users ? data?.users : []

  const loading = loadingData || loadingDel

  // ** Hooks
  // const dispatch = useDispatch<AppDispatch>()
  // const store = useSelector((state: RootState) => state.user)

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const handleEdit = (user: UserDataType) => {
    setUser(user)
    setUserAction(Action.edit)
  }
  const onCloseDialog = () => {
    setOpenDialog(false)
    setId('')
  }
  const delUser = async () => {
    try {
      setOpenDialog(false)
      await removeUser({ variables: { removeUserId: id } })
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
                const rowData = row as UserDataType
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
            rows={users}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <Dialog open={openDialog} onClose={onCloseDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>Are you sure you want to delete this User?</DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Button color='error' onClick={delUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} pageginate={paginationModel} />
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
