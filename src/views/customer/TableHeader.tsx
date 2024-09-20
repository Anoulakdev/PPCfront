/* eslint-disable react/jsx-no-undef */
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Stores Imports
import { Action } from '@/globalState'

// ** Stores Imports
import stores from '@/stores/index'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Translations from 'src/layouts/components/Translations'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value } = props

  // ** Stores
  const { setCustomerAction } = stores.useCustomer()

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
      {/* <Button color='secondary' variant='tonal' startIcon={<Icon icon='tabler:upload' />}>
        Export
      </Button> */}
      <div></div>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4 }}
          placeholder='Search power source'
          onChange={e => handleFilter(e.target.value)}
        />

        <Button
          onClick={() => setCustomerAction(Action.add)}
          variant='contained'
          sx={{ '& svg': { mr: 2 }, fontFamily: 'Noto Sans Lao' }}
        >
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          <Translations text={'Add power source'} />
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
