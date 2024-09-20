/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

interface Role {
  path: string
  title?: string
  permissions?: string[]
  sectionTitle?: string
}

const routes = [
  {
    title: 'Dashboard',
    icon: 'clarity:dashboard-line',

    path: '/dashboards'
  },
  {
    sectionTitle: 'Declaration & Dispatch'
  },
  {
    title: 'All document',
    path: '/alldocument',
    icon: 'jam:document'
  },
  {
    title: 'Declaration',
    icon: 'mdi:invoice-send-outline',
    children: [
      {
        title: 'Daily (DAD)',
        path: '/declaration/day',
        icon: 'pepicons-pencil:electricity'
      },
      {
        title: 'Weekly (WAD)',
        path: '/declaration/week',
        icon: 'pepicons-pencil:electricity'
      },

      {
        title: 'Monthly (MAD)',
        path: '/declaration/month',
        icon: 'pepicons-pencil:electricity'
      }
    ]
  },
  {
    title: 'Dispatch',
    icon: 'material-symbols:order-approve-sharp',
    children: [
      {
        title: 'Daily (DD)',
        path: '/daily-dispatch',
        icon: 'fluent:building-32-regular'
      },

      {
        title: 'Weekly (WD)',
        path: '/weekly-dispatch',
        icon: 'fluent:building-32-regular'
      },
      {
        title: 'Monthly (MD)',
        path: '/monthly-dispatch',
        icon: 'fluent:building-32-regular'
      }
    ]
  },

  {
    title: 'Report',
    icon: 'mdi:file-chart-outline',
    path: '/apps/calendar',
    children: [
      {
        title: 'Daily report',
        path: '/daily-report',
        icon: 'mdi-light:clipboard-check'
      }

      // {
      //   title: 'weekly report',
      //   path: '/weekly-report',
      //   icon: 'mdi-light:clipboard-check'
      // },
      // {
      //   title: 'monthly report',
      //   path: '/monthly-report',
      //   icon: 'mdi-light:clipboard-check'
      // }
    ]
  },
  {
    title: 'User',
    icon: 'tabler:user',
    path: '/user/list'
  },
  {
    title: 'Power source',
    icon: 'icon-park-outline:every-user',
    path: '/customer'
  }
]
const navigation = (paths: string[]): VerticalNavItemsType => {
  const results: VerticalNavItemsType = []
  routes?.map((e, index) => {
    if (e.sectionTitle) {
      const findObj = routes[index + 1]
      if (findObj?.children) {
        findObj.children.map(res => {
          const sectionTitle = paths?.find(r => r === res.path)
          if (sectionTitle) {
            results.push(e)
          }
        })
        results.push(e)
      }
      const sectionTitle = paths?.find(r => r === findObj.path)
      if (sectionTitle) {
        if (findObj.children && findObj.children.length) {
          findObj.children.map(c => {
            const roleC = paths?.find(r => r === c.path)
            if (roleC) {
              results.push(e)
            }
          })
        }
        results.push(e)
      }
    } else {
      if (e.children && e.children.length) {
        const childrens: any[] = []
        e.children.map(c => {
          const roleC = paths?.find(r => r === c.path)
          if (roleC) {
            childrens.push(c)
          }
        })
        if (childrens.length) {
          results.push({ ...e, children: childrens })
        }
      } else {
        const role = paths?.find(r => r === e.path)
        if (role) {
          results.push(e)
        }
      }
    }
  })

  const data: VerticalNavItemsType = []
  results.map((d, index) => {
    const select = d as Role
    if (select.sectionTitle) {
      const rowData = results[index + 1] as Role
      if (rowData?.title) {
        return data.push(d)
      }
    } else {
      return data.push(d)
    }
  })

  return data
}

export default navigation
