// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Utils Import
import { getDateRange } from 'src/@core/utils/get-daterange'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

const now = new Date()
const currentMonth = now.toLocaleString('default', { month: 'short' })

const data: { invoices: InvoiceType[] } = {
  invoices: [
    {
      id: 'A0001-NN1-23',
      issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
      address: '7777 Mendez Plains',
      company: 'Hall-Robbins PLC',
      companyEmail: 'don85@johnson.com',
      country: 'USA',
      contact: '(616) 865-4180',
      name: 'NN1 - MAD for May 2023',
      service: 'Software Development',
      total: 'Nam Ngum 1.',
      avatar: '',
      avatarColor: 'primary',
      invoiceStatus: 'Paid',
      balance: '$724',
      dueDate: `23 ${currentMonth} ${now.getFullYear()}`
    },
    {
      id: 'A0002-NN1-23',
      issuedDate: `17 ${currentMonth} ${now.getFullYear()}`,
      address: '04033 Wesley Wall Apt. 961',
      company: 'Mccann LLC and Sons',
      companyEmail: 'brenda49@taylor.info',
      country: 'Haiti',
      contact: '(226) 204-8287',
      name: 'NN1 - WAD for Week 21 ',
      service: 'UI/UX Design & Development',
      total: 'Nam Ngum 1.',
      avatar: '/images/avatars/1.png',
      invoiceStatus: 'Downloaded',
      balance: 0,
      dueDate: `15 ${currentMonth} ${now.getFullYear()}`
    },
    {
      id: 'A0004-NN1-23 ',
      issuedDate: `19 ${currentMonth} ${now.getFullYear()}`,
      address: '5345 Robert Squares',
      company: 'Leonard-Garcia and Sons',
      companyEmail: 'smithtiffany@powers.com',
      country: 'Denmark',
      contact: '(955) 676-1076',
      name: 'NN1 - DAD for 01/05/2023  ',
      service: 'Unlimited Extended License',
      total: 'Nam Ngum 1.',
      avatar: '/images/avatars/2.png',
      invoiceStatus: 'Paid',
      balance: 0,
      dueDate: `03 ${currentMonth} ${now.getFullYear()}`
    },
    {
      id: 'D0001-EDL-23',
      issuedDate: `06 ${currentMonth} ${now.getFullYear()}`,
      address: '19022 Clark Parks Suite 149',
      company: 'Smith, Miller and Henry LLC',
      companyEmail: 'mejiageorge@lee-perez.com',
      country: 'Cambodia',
      contact: '(832) 323-6914',
      name: 'EDL - NN1 - MD for May 2023  ',
      service: 'Software Development',
      total: 'Khampheng V. ',
      avatar: '/images/avatars/3.png',
      invoiceStatus: 'Sent',
      balance: 0,
      dueDate: `11 ${currentMonth} ${now.getFullYear()}`
    },
    {
      id: 'D0002-EDL-23',
      issuedDate: `08 ${currentMonth} ${now.getFullYear()}`,
      address: '8534 Saunders Hill Apt. 583',
      company: 'Garcia-Cameron and Sons',
      companyEmail: 'brandon07@pierce.com',
      country: 'Martinique',
      contact: '(970) 982-3353',
      name: 'EDL - NN1 - WD for Week 21  ',
      service: 'UI/UX Design & Development',
      total: 'Khampheng V. ',
      avatar: '/images/avatars/4.png',
      invoiceStatus: 'Draft',
      balance: '$815',
      dueDate: `30 ${currentMonth} ${now.getFullYear()}`
    },
    {
      id: 'A0001-NL-23',
      issuedDate: `26 ${currentMonth} ${now.getFullYear()}`,
      address: '661 Perez Run Apt. 778',
      company: 'Burnett-Young PLC',
      companyEmail: 'guerrerobrandy@beasley-harper.com',
      country: 'Botswana',
      contact: '(511) 938-9617',
      name: 'NL - MAD for May 2023  ',
      service: 'UI/UX Design & Development',
      total: 'Nam Leuk .',
      avatar: '',
      avatarColor: 'secondary',
      invoiceStatus: 'Paid',
      balance: 0,
      dueDate: `24 ${currentMonth} ${now.getFullYear()}`
    },
    {
      id: 'D0003-EDL-23',
      issuedDate: `17 ${currentMonth} ${now.getFullYear()}`,
      address: '074 Long Union',
      company: 'Wilson-Lee LLC',
      companyEmail: 'williamshenry@moon-smith.com',
      country: 'Montserrat',
      contact: '(504) 859-2893',
      name: 'EDL - NL - MD for May 2023  ',
      service: 'UI/UX Design & Development',
      total: 'Khampheng V.',
      avatar: '',
      avatarColor: 'success',
      invoiceStatus: 'Draft',
      balance: '$407',
      dueDate: `22 ${currentMonth} ${now.getFullYear()}`
    },
    {
      id: 'D0004-EDL-23',
      issuedDate: `11 ${currentMonth} ${now.getFullYear()}`,
      address: '5225 Ford Cape Apt. 840',
      company: 'Schwartz, Henry and Rhodes Group',
      companyEmail: 'margaretharvey@russell-murray.com',
      country: 'Oman',
      contact: '(758) 403-7718',
      name: 'EDL - NN1 - DD for 01/05/2023',
      service: 'Template Customization',
      total: 'Khampheng V.',
      avatar: '/images/avatars/5.png',
      invoiceStatus: 'Paid',
      balance: '-$205',
      dueDate: `10 ${currentMonth} ${now.getFullYear()}`
    }
  ]
}

// ------------------------------------------------
// GET: Return Invoice List
// ------------------------------------------------
mock.onGet('/apps/invoice/invoices').reply(config => {
  const { q = '', status = '', dates = [] } = config.params ?? ''
  const queryLowered = q.toLowerCase()
  const filteredData = data.invoices.filter(invoice => {
    if (dates.length) {
      const [start, end] = dates
      const filtered: number[] = []
      const range = getDateRange(start, end)
      const invoiceDate = new Date(invoice.issuedDate)

      range.filter(date => {
        const rangeDate = new Date(date)
        if (
          invoiceDate.getFullYear() === rangeDate.getFullYear() &&
          invoiceDate.getDate() === rangeDate.getDate() &&
          invoiceDate.getMonth() === rangeDate.getMonth()
        ) {
          filtered.push(invoice.id)
        }
      })

      if (filtered.length && filtered.includes(invoice.id)) {
        return (
          (invoice.companyEmail.toLowerCase().includes(queryLowered) ||
            invoice.name.toLowerCase().includes(queryLowered) ||
            String(invoice.id).toLowerCase().includes(queryLowered) ||
            String(invoice.total).toLowerCase().includes(queryLowered) ||
            String(invoice.balance).toLowerCase().includes(queryLowered) ||
            invoice.dueDate.toLowerCase().includes(queryLowered)) &&
          invoice.invoiceStatus.toLowerCase() === (status.toLowerCase() || invoice.invoiceStatus.toLowerCase())
        )
      }
    } else {
      return (
        (invoice.companyEmail.toLowerCase().includes(queryLowered) ||
          invoice.name.toLowerCase().includes(queryLowered) ||
          String(invoice.id).toLowerCase().includes(queryLowered) ||
          String(invoice.total).toLowerCase().includes(queryLowered) ||
          String(invoice.balance).toLowerCase().includes(queryLowered) ||
          invoice.dueDate.toLowerCase().includes(queryLowered)) &&
        invoice.invoiceStatus.toLowerCase() === (status.toLowerCase() || invoice.invoiceStatus.toLowerCase())
      )
    }
  })

  return [
    200,
    {
      params: config.params,
      allData: data.invoices,
      invoices: filteredData,
      total: filteredData.length
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Invoice
// ------------------------------------------------
mock.onGet('apps/invoice/single-invoice').reply(config => {
  const { id } = config.params

  const invoiceData = data.invoices.filter(invoice => invoice.id === parseInt(id, 10))
  if (invoiceData.length) {
    const responseData = {
      invoice: invoiceData[0],
      paymentDetails: {
        totalDue: '$12,110.55',
        bankName: 'American Bank',
        country: 'United States',
        iban: 'ETD95476213874685',
        swiftCode: 'BR91905'
      }
    }

    return [200, responseData]
  } else {
    return [404, { message: 'Unable to find the requested invoice!' }]
  }
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/apps/invoice/clients').reply(() => {
  const clients = data.invoices.map(invoice => {
    const { address, company, companyEmail, country, contact, name } = invoice

    return {
      name,
      address,
      company,
      country,
      contact,
      companyEmail
    }
  })

  return [200, clients.slice(0, 5)]
})

// ------------------------------------------------
// DELETE: Deletes Invoice
// ------------------------------------------------
mock.onDelete('/apps/invoice/delete').reply(config => {
  // Get invoice id from URL
  const invoiceId = Number(config.data)
  const invoiceIndex = data.invoices.findIndex(t => t.id === invoiceId)
  data.invoices.splice(invoiceIndex, 1)

  return [200]
})
