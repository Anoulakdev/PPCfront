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

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import SaveIcon from '@mui/icons-material/Save'
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { Action, Pagegination } from '@/globalState'

// ** Stores Imports
import stores from '@/stores/index'

// ** Graphql
import { useMutation } from '@apollo/client'
import { CUSTOMERS } from '@/lib/query'
import { CREATE_CUSTOMER, UPDATE_CUSTOMER } from '@/lib/mutation'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { CustomerDataType } from 'src/types/customerType'
import Translations from 'src/layouts/components/Translations'

interface SidebarType {
  pageginate: Pagegination
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
  name: yup.string().required(),
  abbreviation: yup.string().required(),
  company: yup.string().required(),
  unit: yup.number().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  phone: yup
    .string()
    .typeError('Phone number field is required')
    .min(8, obj => showErrors('Phone number', obj.value.length, obj.min))
    .required(),
  floodLevel: yup.number().required(),
  fullLevel: yup.number().required(),
  minimumLevel: yup.number().required(),
  deadLevel: yup.number().required(),
  totalActiveStorage: yup.number().required()
})

const defaultValues = {
  abbreviation: '',
  company: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  unit: 1,
  floodLevel: 0,
  fullLevel: 0,
  minimumLevel: 0,
  deadLevel: 0,
  totalActiveStorage: 0
}

const SidebarCustomer = (props: SidebarType) => {
  // ** Props
  const { pageginate } = props

  // ** State
  const [customerId, setCustomerId] = useState<string>('')
  const [roleId, setRoleId] = useState<string>('')

  // ** Stores
  const { action, customer, resetCustomer } = stores.useCustomer()

  // ** Mutation
  const [createCustomer, { loading: createLoading }] = useMutation(CREATE_CUSTOMER, {
    onCompleted: data => {
      handleClose()

      // console.log(data)
    },
    refetchQueries: [
      {
        query: CUSTOMERS,
        variables: {
          queryInput: {
            pageginate: { limit: pageginate.pageSize, page: pageginate.page },
            search: {
              q: '',
              searchField: ['name', 'company', 'phone']
            }
          }
        }
      }
    ]
  })
  const [updateCustomer, { loading: updateLoading }] = useMutation(UPDATE_CUSTOMER, {
    onCompleted: data => {
      handleClose()
      console.log(data)
    },
    refetchQueries: [
      {
        query: CUSTOMERS,
        variables: {
          queryInput: {
            pageginate: { limit: pageginate.pageSize, page: pageginate.page },
            search: {
              q: '',
              searchField: ['name', 'company', 'phone']
            }
          }
        }
      }
    ]
  })

  const loading = createLoading || updateLoading

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data: CustomerDataType) => {
    try {
      // console.log('data===>', data)

      if (action === Action.edit && customer?._id) {
        const newData = {
          name: data.name,
          abbreviation: data.abbreviation,
          company: data.company,
          phone: data.phone,
          email: data.email,
          address: data.address,
          unit: Number(data.unit),
          floodLevel: data.floodLevel || 0,
          fullLevel: data.fullLevel || 0,
          minimumLevel: data.minimumLevel || 0,
          deadLevel: data.deadLevel || 0,
          totalActiveStorage: data.totalActiveStorage || 0,
          id: customer?._id
        }

        // console.log('newData===>', newData)

        return await updateCustomer({ variables: { updateCustomerInput: newData } })
      }
      await createCustomer({ variables: { createCustomerInput: data } })
    } catch (error) {
      console.log(error)
    }
  }

  // Effect
  useEffect(() => {
    if (customer) {
      setValue('abbreviation', customer?.abbreviation || '')
      setValue('company', customer?.company || '')
      setValue('name', customer?.name || '')
      setValue('phone', customer?.phone || '')
      setValue('email', customer?.email || '')
      setValue('address', customer?.address || '')
      setValue('unit', customer?.unit ? Number(customer?.unit) : 1)
      setValue('floodLevel', customer?.floodLevel ? Number(customer?.floodLevel) : 0)
      setValue('fullLevel', customer?.fullLevel ? Number(customer?.fullLevel) : 0)
      setValue('minimumLevel', customer?.minimumLevel ? Number(customer?.minimumLevel) : 0)
      setValue('deadLevel', customer?.deadLevel ? Number(customer?.deadLevel) : 0)
      setValue('totalActiveStorage', customer?.totalActiveStorage ? Number(customer?.totalActiveStorage) : 0)
    }
  }, [action])

  const handleClose = () => {
    setCustomerId('')
    setRoleId('')
    reset()
    resetCustomer()
  }

  return (
    <Drawer
      open={action ? true : false}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 380, sm: 600 }, zIndex: 1300 } }}
    >
      <Header>
        <Typography sx={{ fontFamily: 'Noto Sans Lao' }} variant='h5'>
          {action === Action.add ? <Translations text={'Power source'} /> : <Translations text={'Edit Customer'} />}
        </Typography>
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
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={<Translations text={'Name'} />}
                onChange={onChange}
                placeholder='Name'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name='abbreviation'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Abbreviation'
                onChange={onChange}
                placeholder='Abbreviation'
                error={Boolean(errors.abbreviation)}
                {...(errors.abbreviation && { helperText: errors.abbreviation.message })}
              />
            )}
          />
          <Controller
            name='company'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Company'
                onChange={onChange}
                placeholder='Company'
                error={Boolean(errors.abbreviation)}
                {...(errors.abbreviation && { helperText: errors.abbreviation.message })}
              />
            )}
          />
          <Controller
            name='unit'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={value}
                sx={{ mb: 4 }}
                label='Unit'
                onChange={onChange}
                placeholder='Unit'
                error={Boolean(errors.unit)}
                {...(errors.unit && { helperText: errors.unit.message })}
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

          <Controller
            name='address'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Address'
                onChange={onChange}
                placeholder='Address'
                error={Boolean(errors.address)}
                {...(errors.address && { helperText: errors.address.message })}
              />
            )}
          />
          <Controller
            name='fullLevel'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={value}
                sx={{ mb: 4 }}
                label='Full Level'
                onChange={onChange}
                placeholder='Full Level'
                error={Boolean(errors.fullLevel)}
                {...(errors.fullLevel && { helperText: errors.fullLevel.message })}
              />
            )}
          />
          <Controller
            name='minimumLevel'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={value}
                sx={{ mb: 4 }}
                label='Minimum Level'
                onChange={onChange}
                placeholder='Minimum Level'
                error={Boolean(errors.minimumLevel)}
                {...(errors.minimumLevel && { helperText: errors.minimumLevel.message })}
              />
            )}
          />
          <Controller
            name='deadLevel'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={value}
                sx={{ mb: 4 }}
                label='Dead Level'
                onChange={onChange}
                placeholder='Dead Level'
                error={Boolean(errors.deadLevel)}
                {...(errors.deadLevel && { helperText: errors.deadLevel.message })}
              />
            )}
          />
          <Controller
            name='floodLevel'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={value}
                sx={{ mb: 4 }}
                label='Flood Level'
                onChange={onChange}
                placeholder='Flood Level'
                error={Boolean(errors.floodLevel)}
                {...(errors.floodLevel && { helperText: errors.floodLevel.message })}
              />
            )}
          />
          <Controller
            name='totalActiveStorage'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='number'
                value={value}
                sx={{ mb: 4 }}
                label='Total Active Storage'
                onChange={onChange}
                placeholder='Total Active Storage'
                error={Boolean(errors.totalActiveStorage)}
                {...(errors.totalActiveStorage && { helperText: errors.totalActiveStorage.message })}
              />
            )}
          />
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

export default SidebarCustomer
