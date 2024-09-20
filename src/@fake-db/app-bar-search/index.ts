// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { AppBarSearchType } from 'src/@fake-db/types'

const searchData: AppBarSearchType[] = [
  {
    id: 1,
    url: '/dashboard',
    icon: 'clarity:dashboard-line',
    title: ' Dashboard',
    category: 'dashboards'
  },
  {
    id: 2,
    url: '/alldocument',
    icon: 'jam:document',
    title: 'All documents',
    category: 'appsPages'
  },
  {
    id: 3,
    url: '/daily-declaration',
    icon: 'pepicons-pencil:electricity',
    title: 'Daily (DAD)',
    category: 'appsPages'
  },
  {
    id: 4,
    url: '/weekly-declaration',
    icon: 'pepicons-pencil:electricity',
    title: 'Weekly (WAD)',
    category: 'appsPages'
  },
  {
    id: 5,
    url: '/monthly-declaration',
    icon: 'pepicons-pencil:electricity',
    title: 'Monthly (MAD)',
    category: 'appsPages'
  },

  {
    id: 9,
    url: '/daily-dispatch',
    icon: 'tabler:file-pencil',
    title: 'Daily (DD)',
    category: 'appsPages'
  },
  {
    id: 10,
    url: '/weekly-dispatch',
    icon: 'fluent:building-32-regular',
    title: 'Weekly (WD)',
    category: 'appsPages'
  },
  {
    id: 11,
    url: '/monthly-dispatch',
    icon: 'fluent:building-32-regular',
    title: 'Monthly (MD)',
    category: 'appsPages'
  },

  {
    id: 93,
    url: '/forms/form-elements/input-mask',
    icon: 'tabler:forms',
    title: 'Input Mask',
    category: 'formsTables'
  },
  {
    id: 94,
    url: '/forms/form-layouts',
    icon: 'tabler:box',
    title: 'Form Layouts',
    category: 'formsTables'
  },
  {
    id: 95,
    url: '/forms/form-validation',
    icon: 'tabler:checkbox',
    title: 'Form Validation',
    category: 'formsTables'
  },
  {
    id: 96,
    url: '/forms/form-wizard',
    icon: 'tabler:text-wrap-disabled',
    title: 'Form Wizard',
    category: 'formsTables'
  },
  {
    id: 97,
    url: '/tables/mui',
    icon: 'tabler:table',
    title: 'Table',
    category: 'formsTables'
  },
  {
    id: 98,
    url: '/tables/data-grid',
    icon: 'tabler:layout-grid',
    title: 'Mui DataGrid',
    category: 'formsTables'
  },
  {
    id: 99,
    url: '/charts/apex-charts',
    icon: 'tabler:chart-sankey',
    title: 'Apex Charts',
    category: 'chartsMisc'
  },
  {
    id: 100,
    url: '/charts/recharts',
    icon: 'tabler:chart-ppf',
    title: 'Recharts',
    category: 'chartsMisc'
  },
  {
    id: 101,
    url: '/charts/chartjs',
    icon: 'tabler:chart-line',
    title: 'ChartJS',
    category: 'chartsMisc'
  },
  {
    id: 102,
    url: '/acl',
    icon: 'tabler:shield',
    title: 'Access Control (ACL)',
    category: 'chartsMisc'
  }
]

// ** GET Search Data
mock.onGet('/app-bar/search').reply(config => {
  const { q = '' } = config.params
  const queryLowered = q.toLowerCase()

  const exactData: { [k: string]: AppBarSearchType[] } = {
    dashboards: [],
    appsPages: [],
    userInterface: [],
    formsTables: [],
    chartsMisc: []
  }

  const includeData: { [k: string]: AppBarSearchType[] } = {
    dashboards: [],
    appsPages: [],
    userInterface: [],
    formsTables: [],
    chartsMisc: []
  }

  searchData.forEach(obj => {
    const isMatched = obj.title.toLowerCase().startsWith(queryLowered)
    if (isMatched && exactData[obj.category].length < 5) {
      exactData[obj.category].push(obj)
    }
  })

  searchData.forEach(obj => {
    const isMatched =
      !obj.title.toLowerCase().startsWith(queryLowered) && obj.title.toLowerCase().includes(queryLowered)
    if (isMatched && includeData[obj.category].length < 5) {
      includeData[obj.category].push(obj)
    }
  })

  const categoriesCheck: string[] = []

  Object.keys(exactData).forEach(category => {
    if (exactData[category].length > 0) {
      categoriesCheck.push(category)
    }
  })
  if (categoriesCheck.length === 0) {
    Object.keys(includeData).forEach(category => {
      if (includeData[category].length > 0) {
        categoriesCheck.push(category)
      }
    })
  }

  const resultsLength = categoriesCheck.length === 1 ? 5 : 3

  return [
    200,
    [
      ...exactData.dashboards.concat(includeData.dashboards).slice(0, resultsLength),
      ...exactData.appsPages.concat(includeData.appsPages).slice(0, resultsLength),
      ...exactData.userInterface.concat(includeData.userInterface).slice(0, resultsLength),
      ...exactData.formsTables.concat(includeData.formsTables).slice(0, resultsLength),
      ...exactData.chartsMisc.concat(includeData.chartsMisc).slice(0, resultsLength)
    ]
  ]
})
