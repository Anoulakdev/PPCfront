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

// ** Custom Component Import

import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Third Party Components
import axios from 'axios'

// ** Stores Imports
import { Action, Pagegination } from '@/globalState'

// ** Stores Imports
import stores from '@/stores/index'

// ** Types Imports
// import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'

// import { ThemeColor } from 'src/@core/layouts/types'
// import { UsersType } from 'src/types/apps/userTypes'
import { CardStatsHorizontalWithDetailsProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/UserDrawer'

// interface UserRoleType {
//   [key: string]: { icon: string; color: string }
// }

// interface UserStatusType {
//   [key: string]: ThemeColor
// }

interface CellType {
  row: User
}

// ** renders client column
// const userRoleObj: UserRoleType = {
//   admin: { icon: 'tabler:device-laptop', color: 'secondary' },
//   author: { icon: 'tabler:circle-check', color: 'success' },
//   editor: { icon: 'tabler:edit', color: 'info' },
//   maintainer: { icon: 'tabler:chart-pie-2', color: 'primary' },
//   subscriber: { icon: 'tabler:user', color: 'warning' }
// }

// const userStatusObj: UserStatusType = {
//   active: 'success',
//   pending: 'warning',
//   inactive: 'secondary'
// }

// ** renders client column
// const renderClient = (row: UsersType) => {
//   if (row.avatar.length) {
//     return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
//   } else {
//     return (
//       <CustomAvatar
//         skin='light'
//         color={row.avatarColor}
//         sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
//       >
//         {getInitials(row.fullName ? row.fullName : 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }

// const RowOptions = ({ id }: { id: number | string }) => {
//   // ** Hooks
//   const dispatch = useDispatch<AppDispatch>()

//   // ** State
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

//   const rowOptionsOpen = Boolean(anchorEl)

//   const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }
//   const handleRowOptionsClose = () => {
//     setAnchorEl(null)
//   }

//   const handleDelete = () => {
//     dispatch(deleteUser(id))
//     handleRowOptionsClose()
//   }

//   return (
//     <>
//       <IconButton size='small' onClick={handleRowOptionsClick}>
//         <Icon icon='tabler:dots-vertical' />
//       </IconButton>
//       <Menu
//         keepMounted
//         anchorEl={anchorEl}
//         open={rowOptionsOpen}
//         onClose={handleRowOptionsClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right'
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right'
//         }}
//         PaperProps={{ style: { minWidth: '8rem' } }}
//       >
//         <MenuItem
//           component={Link}
//           sx={{ '& svg': { mr: 2 } }}
//           href='/apps/user/view/account'
//           onClick={handleRowOptionsClose}
//         >
//           <Icon icon='tabler:eye' fontSize={20} />
//           View
//         </MenuItem>
//         <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
//           <Icon icon='tabler:edit' fontSize={20} />
//           Edit
//         </MenuItem>
//         <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
//           <Icon icon='tabler:trash' fontSize={20} />
//           Delete
//         </MenuItem>
//       </Menu>
//     </>
//   )
// }

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

const UserList = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontalWithDetails.map((item: CardStatsHorizontalWithDetailsProps, index: number) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Role'
                  SelectProps={{
                    value: role,
                    displayEmpty: true,
                    onChange: e => handleRoleChange(e)
                  }}
                >
                  <MenuItem value=''>Select Role</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='author'>Author</MenuItem>
                  <MenuItem value='editor'>Editor</MenuItem>
                  <MenuItem value='maintainer'>Maintainer</MenuItem>
                  <MenuItem value='subscriber'>Subscriber</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Plan'
                  SelectProps={{
                    value: plan,
                    displayEmpty: true,
                    onChange: e => handlePlanChange(e)
                  }}
                >
                  <MenuItem value=''>Select Plan</MenuItem>
                  <MenuItem value='basic'>Basic</MenuItem>
                  <MenuItem value='company'>Company</MenuItem>
                  <MenuItem value='enterprise'>Enterprise</MenuItem>
                  <MenuItem value='team'>Team</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Status'
                  SelectProps={{
                    value: status,
                    displayEmpty: true,
                    onChange: e => handleStatusChange(e)
                  }}
                >
                  <MenuItem value=''>Select Status</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='inactive'>Inactive</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} /> */}
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
