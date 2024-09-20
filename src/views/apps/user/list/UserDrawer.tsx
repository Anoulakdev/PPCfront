/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'

import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import SaveIcon from '@mui/icons-material/Save'
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { Action, Pagegination } from '@/globalState'

// ** Stores Imports
import stores from '@/stores/index'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { CUSTOMERS, ROLES, USERS } from '@/lib/query'
import { CREATE_USER, UPDATE_USER } from '@/lib/mutation'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { UserDataType, UserInputType } from 'src/types/userType'
import { Customer, Role } from '@/__generated__/graphql'

import { RoleDataType } from 'src/types/roleType'
import { CustomerDataType } from 'src/types/customerType'

interface SidebarType {
  pageginate: Pagegination
  open: boolean
  toggle: () => void
}

interface UserData {
  email: string
  company: string
  billing: string
  country: string
  contact: number
  fullName: string
  username: string
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  fName: yup.string().required(),
  lName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .typeError('Phone number field is required')
    .min(8, obj => showErrors('Phone number', obj.value.length, obj.min))
    .required(),
  password: yup
    .string()
    .min(6, obj => showErrors('Password', obj.value.length, obj.min))
    .required(),
  conFirmPassword: yup
    .string()
    .min(6, obj => showErrors('Password', obj.value.length, obj.min))
    .oneOf([yup.ref('password')], 'Passwords does not match')
})

const Editschema = yup.object().shape({
  fName: yup.string().required(),
  lName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .typeError('Phone number field is required')
    .min(8, obj => showErrors('Phone number', obj.value.length, obj.min))
    .required(),
  roleId: yup.object().required(),
  customerId: yup.object().required(),

  customers: yup.array().min(1).required()
})

const defaultValues = {
  email: '',
  fName: '',
  lName: '',
  phone: '',
  password: '',
  conFirmPassword: '',
  customerId: null,
  roleId: null,
  customers: []
}

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

const SidebarAddUser = (props: SidebarType) => {
  // ** Props
  const { open, toggle, pageginate } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** State
  // const [customerId, setCustomerId] = useState<string>('')
  // const [customers, setCustomers] = useState<Customer[] | []>([])

  // const [roleId, setRoleId] = useState<RoleDataType | null>(null)

  // ** Stores
  const { action, user, setUserAction, resetUser } = stores.useUser()

  // ** Query
  const { data: customerData } = useQuery(CUSTOMERS, { variables: { queryInput: null } })
  const { data: roleData } = useQuery(ROLES)

  // const Data
  const customerResult = customerData?.customers ? customerData.customers : []
  const roles = roleData?.roles ? roleData.roles : []

  // ** Mutation
  const [createUser, { loading: createLoading }] = useMutation(CREATE_USER, {
    onCompleted: data => {
      handleClose()

      // console.log(data)
    },
    refetchQueries: [
      {
        query: USERS,
        variables: {
          queryInput: {
            pageginate: { limit: pageginate.pageSize, page: pageginate.page },
            search: {
              q: '',
              searchField: ['fName', 'lName', 'phone']
            }
          }
        }
      }
    ]
  })
  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    onCompleted: data => {
      handleClose()

      // console.log(data)
    },
    refetchQueries: [
      {
        query: USERS,
        variables: {
          queryInput: {
            pageginate: { limit: pageginate.pageSize, page: pageginate.page },
            search: {
              q: '',
              searchField: ['fName', 'lName', 'phone']
            }
          }
        }
      }
    ]
  })

  const loading = createLoading || updateLoading

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.user)
  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<UserInputType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(action === Action.edit ? Editschema : schema)
  })

  // console.log(watch('customers'))

  const onSubmit = async (data: UserInputType) => {
    try {
      // console.log('data===>', data)

      const customerInput: string[] = data?.customers?.length
        ? data?.customers.map(r => (r._id ? r._id.toString() : ''))
        : []
      console.log('customerInput===>', customerInput)
      if (action === Action.edit && user?._id) {
        const newData = {
          fName: data.fName,
          lName: data.lName,
          phone: data.phone,
          email: data.email,
          id: user?._id,
          customerId: (data.customerId?._id as string) || '',
          roleId: (data.roleId?._id as string) || '',
          customers: customerInput
        }

        // console.log('newData===>', newData)

        return await updateUser({ variables: { updateUserInput: newData } })
      }

      await createUser({
        variables: {
          createUserInput: {
            ...data,
            customerId: (data.customerId?._id as string) || '',
            roleId: (data.roleId?._id as string) || '',
            customers: customerInput
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Effect
  useEffect(() => {
    if (user) {
      setValue('fName', user?.fName || '')
      setValue('lName', user?.lName || '')
      setValue('email', user?.email || '')
      setValue('phone', user?.phone || '')
      setValue('customerId', user.customerId || null)
      setValue('roleId', user?.roleId || null)

      // setCustomers((user?.customers as Customer[]) || [])

      setValue('customers', (user?.customers as CustomerDataType[]) || [])
    }
  }, [action])

  const handleClose = () => {
    // setCustomerId('')
    toggle()
    reset()
    resetUser()
  }

  // const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: any) => {
  //   // console.log('event====>', event)
  //   // console.log('value====>', value)
  //   setCustomers(value)
  // }

  return (
    <Drawer
      open={action ? true : false}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 380, sm: 600 }, zIndex: 1300 } }}
    >
      <Header>
        <Typography variant='h5'>{action === Action.add ? `Add User` : `Edit User`}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'red',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='fName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='First Name'
                onChange={onChange}
                placeholder='First Name'
                error={Boolean(errors.fName)}
                {...(errors.fName && { helperText: errors.fName.message })}
              />
            )}
          />
          <Controller
            name='lName'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Last Name'
                onChange={onChange}
                placeholder='Last Name'
                error={Boolean(errors.lName)}
                {...(errors.lName && { helperText: errors.lName.message })}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='email'
                label='Email'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder='edl@email.com'
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />
          <Controller
            name='phone'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Contact'
                onChange={onChange}
                placeholder='99999xxx'
                error={Boolean(errors.phone)}
                {...(errors.phone && { helperText: errors.phone.message })}
              />
            )}
          />
          {action !== Action.edit && (
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  type='password'
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label='Password'
                  onChange={onChange}
                  placeholder='Password'
                  error={Boolean(errors.password)}
                  {...(errors.password && { helperText: errors.password.message })}
                />
              )}
            />
          )}
          {action !== Action.edit && (
            <Controller
              name='conFirmPassword'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  type='password'
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label='ConFirm Password'
                  onChange={onChange}
                  placeholder='ConFirm Password'
                  error={Boolean(errors.conFirmPassword)}
                  {...(errors.conFirmPassword && { helperText: errors.conFirmPassword.message })}
                />
              )}
            />
          )}
          <Controller
            name='roleId'
            control={control}
            rules={{ required: true }}
            render={({ field: { ...field }, fieldState: { error } }) => (
              <CustomAutocomplete
                size='medium'
                id='autocomplete-custom'
                options={roles as RoleDataType[]}
                getOptionLabel={option => option?.name || ''}
                onChange={(event, value) => field.onChange(value)}
                value={(field.value as RoleDataType) || null}
                renderInput={params => (
                  <CustomTextField
                    required
                    sx={{ mb: 4 }}
                    {...params}
                    label='Select Role'
                    placeholder='Select Role'
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name='customerId'
            control={control}
            rules={{ required: true }}
            render={({ field: { ...field }, fieldState: { error } }) => (
              <CustomAutocomplete
                size='medium'
                id='autocomplete-custom'
                options={customerResult as CustomerDataType[]}
                getOptionLabel={option => option?.company || ''}
                onChange={(event, value) => field.onChange(value)}
                value={(field.value as CustomerDataType) || []}
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
          <Controller
            name='customers'
            control={control}
            rules={{ required: true }}
            render={({ field: { ...field }, fieldState: { error } }) => (
              <CustomAutocomplete
                multiple
                disableCloseOnSelect
                size='medium'
                id='checkboxes-tags-demo'
                options={customerResult as CustomerDataType[]}
                getOptionLabel={option => option?.company || ''}
                onChange={(event, value) => field.onChange(value)}
                isOptionEqualToValue={(option, val) => option?._id === val?._id}
                value={field.value as CustomerDataType[]}
                renderOption={(props, option, { selected }) => (
                  <li {...props} key={option?._id}>
                    {option?.company}
                  </li>
                )}
                renderInput={params => (
                  <CustomTextField
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
          {/* <CustomAutocomplete
            multiple
            id='checkboxes-tags-demo'
            options={customerResult}
            disableCloseOnSelect
            onChange={handleAutocompleteChange}
            value={customers}
            getOptionLabel={option => option?.company || ''}
            isOptionEqualToValue={(option, val) => option?._id === val?._id}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option?._id}>
                {option?.company}
              </li>
            )}
            renderInput={params => (
              <CustomTextField {...params} label='Select Powersource' placeholder='Select Powersource' />
            )}
            sx={{ mb: 6 }}
          /> */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LoadingButton
              startIcon={<SaveIcon />}
              loading={loading}
              size='large'
              type='submit'
              variant='contained'
              sx={{ mr: 3 }}
            >
              Save
            </LoadingButton>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
