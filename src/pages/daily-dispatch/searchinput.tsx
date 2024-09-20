/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Stores Imports
import { Action } from '@/globalState'

// ** Stores Imports
import stores from '@/stores/index'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { useQuery } from '@apollo/client'
import { CUSTOMER_SELECTION } from '@/lib/query'
import { Customer } from '@/__generated__/graphql'
import { CustomerSelectDataType } from 'src/types/customerType'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
  refetch: () => void
  handleCustomerChange: (event: React.ChangeEvent<{}>, value: CustomerSelectDataType | null) => void
}

const Searchinput = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, handleCustomerChange, value, refetch } = props

  const { data: customerData } = useQuery(CUSTOMER_SELECTION)
  const customers = customerData?.customerSelections ? customerData.customerSelections : []

  // // ** Stores
  // const { setUserAction } = stores.useUser()

  return (
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
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CustomAutocomplete
            sx={{ ml: 2 }}
            id='autocomplete-custom'
            options={customers}
            getOptionLabel={option => option?.name || ''}
            renderInput={params => (
              <CustomTextField {...params} label='Choose Power source' placeholder='Power source' />
            )}
            onChange={handleCustomerChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextField
            label='Search Daily (DD)'
            value={value}
            sx={{ mr: 4 }}
            placeholder='Search Daily (DD)'
            onChange={e => handleFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 18, height: 52 }}>
          {/* <Button variant='outlined' onClick={() => refetch()}>
            Outlined
          </Button> */}
          <Tooltip title='Refetch'>
            <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => refetch()}>
              <Icon icon='ic:baseline-refresh' color='red' />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Searchinput
