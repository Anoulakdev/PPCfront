/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import stores from '@/stores/index'
import { imgData } from 'src/image'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { DAILYDECLARATIONS, DAILY_POWER_PURCHASE } from '@/lib/query'
import { CREATE_DAILY_DECLARATION, ACKNOWLEDGED_DAY_DISPATCH } from '@/lib/mutation'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DayPowerPurchase } from '@/__generated__/graphql'

type Props = {
  data: DayPowerPurchase
}

const rolesArr: string[] = Array.from(Array(24), (_, i) => {
  const startHour = i.toString().padStart(2, '0')
  const endHour = ((i + 1) % 24).toString().padStart(2, '0')

  return `${startHour}:00-${endHour}:00`
})

pdfMake.vfs = pdfFonts.pdfMake.vfs

interface InfoData {
  upstreamLevel: string
  downstreamLevel: string
  amountStorageReservoir: string
  averageStoreReservoir: string
  totalActiveReservoir: string
  averageActiveReservoir: string
  tdAmount: string // Turbine Discharge
  tdAverage: string
  sdAmount: string // Spillway Discharge
  sdAverage: string
  edAmount: string // Ecological Discharge
  edAverage: string
}
const initialInfoData: InfoData = {
  upstreamLevel: '0',
  downstreamLevel: '0',
  amountStorageReservoir: '0',
  averageStoreReservoir: '0',
  totalActiveReservoir: '0',
  averageActiveReservoir: '0',
  tdAmount: '0',
  tdAverage: '0',
  sdAmount: '0',
  sdAverage: '0',
  edAmount: '0',
  edAverage: '0'
}

const Exportpdf = ({ data }: Props) => {
  const handleUnitChange = (index: number, value: string) => {
    // console.log(`index: ${index}, value: ${value}`)

    const parsedValue = Math.abs(Number(value))

    // console.log('Data===>', data)

    const updatedUnitValues = [...unitValues]
    updatedUnitValues[index] = String(parsedValue)
    const roles: number[] = []
    Array.from(Array(24), (_, i) => {
      roles.push(index + unit * i)
    })

    const curr: number[] = []
    roles.map(r => {
      if (r < rolesArr.length * unit) {
        curr.push(r)
      }
    })
    curr.map(e => {
      updatedUnitValues[e] = String(parsedValue)
    })

    // console.log('updatedUnitValues===>', updatedUnitValues)

    setUnitValues(updatedUnitValues)
  }

  useEffect(() => {
    if (result) {
      const { powers, remark, remarks, machinesAvailability, reservoirSituation, waterDischarge, originalDetail } =
        result
      const info: InfoData = {
        upstreamLevel: String(reservoirSituation.upstreamLevel),
        downstreamLevel: String(reservoirSituation.downstreamLevel),
        amountStorageReservoir: String(reservoirSituation.totalStorage.amount),
        averageStoreReservoir: String(reservoirSituation.totalStorage.average),
        totalActiveReservoir: String(reservoirSituation.activeStorage.amount),
        averageActiveReservoir: String(reservoirSituation.activeStorage.average),
        tdAmount: String(waterDischarge.turbineDischarge.amount),
        tdAverage: String(waterDischarge.turbineDischarge.average),
        sdAmount: String(waterDischarge.spillwayDischarge.amount),
        sdAverage: String(waterDischarge.spillwayDischarge.amount),
        edAmount: String(waterDischarge.ecologicalDischarge.amount),
        edAverage: String(waterDischarge.ecologicalDischarge.amount)
      }
      setOriginalValues(originalDetail.powers)
      setUnitValues(powers)
      setRemark(remarks)
      setMax(machinesAvailability.maxs)
      setMin(machinesAvailability.mins)
    }
  })

  const total = () => {
    const valueData: string[][] = []
    let roles: number[] = []
    Array.from(Array(unit), (d, dIndex) => {
      Array.from(Array(24), (_, i) => {
        if (roles.length < 24) {
          roles.push(dIndex + unit * i)
        }
      })
      const dd: string[] = []
      roles.map(r => {
        dd.push(unitValues[r])
      })
      valueData.push(dd)
      roles = []
    })
    const total = valueData.map(r => {
      return r.reduce((a, b) => {
        return Number(a) + Number(b)
      }, 0)
    })

    return total
  }

  // stores

  const router = useRouter()
  const id = router?.query?.id

  const [maxs, setMax] = useState<number[]>([])
  const [mins, setMin] = useState<number[]>([])
  const [unitValues, setUnitValues] = useState<string[]>([])
  const [originalValues, setOriginalValues] = useState<string[]>([])
  const [remark, setRemark] = useState(Array(rolesArr.length).fill(''))
  const currentDate = new Date().toLocaleDateString('en-GB')

  // ** Query
  // const { data, loading: dataLoading } = useQuery(DAILY_POWER_PURCHASE, {
  //   variables: {
  //     dayPowerPurchaseId: id as string
  //   }
  // })

  const result = data
  const unit = result?.totalUnit || 1

  //export pdf
  const handleExportPDF = () => {
    // Define the table data
    const tableDataMaxs = maxs.map(i => {
      return {
        text: i || ''
      }
    })
    const tableDataMin = mins.map(i => {
      return {
        text: i || ''
      }
    })
    const tableData = rolesArr.map((i, rowIndex) => {
      const rowData = [
        { text: i, style: 'tableCell' },
        ...[...Array(unit)].map((_, colIndex) => ({
          text: originalValues[rowIndex * unit + colIndex],
          style: 'tableCell'
        })),
        { text: remark[rowIndex], style: 'tableCell' }
      ]

      return rowData
    })

    console.log('tableData===>', tableData)

    // Define the table data
    const tableData2 = rolesArr.map((i, rowIndex) => {
      const rowData = [
        { text: i, style: 'tableCell' },
        ...[...Array(unit)].map((_, colIndex) => ({
          text: unitValues[rowIndex * unit + colIndex],
          style: 'tableCell'
        })),
        { text: remark[rowIndex], style: 'tableCell' }
      ]

      return rowData
    })

    // Define the document definition
    const docDefinition = {
      pageSize: 'A4',
      alignment: 'center',

      content: [
        // {
        //   image: imgData,
        //   width: 30,
        //   margin: [400, 0, 0, 0]
        // },
        {
          text: 'Nam Ou Power Co.,LTD',
          style: 'header'
        },
        {
          text: 'Daily Availability and Declaration',
          style: 'header'
        },
        {
          text: currentDate,
          style: 'header'
        },
        {
          columns: [
            {
              table: {
                widths: ['50%', '23%', '22%'],
                headerRows: 2,

                // keepWithHeaderRows: 1,
                body: [
                  [
                    { text: 'Reservoir Situation at 00:00AM', style: 'tableHeader', colSpan: 3, alignment: 'center' },
                    {},
                    {}
                  ],
                  [{ text: 'Upstream Level:' }, { text: '262,82' }, { text: 'masl' }],
                  [{ text: 'Downstream Level:' }, { text: '111' }, { text: 'masl' }],
                  [
                    {
                      rowSpan: 2,
                      text: 'Total Storage:'
                    },
                    { text: '1.365,14' },
                    { text: 'MCM' }
                  ],
                  [{}, { text: '45,36%' }, { text: '%' }],
                  [
                    {
                      rowSpan: 2,
                      text: 'Active Storage:'
                    },
                    { text: '1.365,14' },
                    { text: 'MCM' }
                  ],
                  [{}, { text: '45,36%' }, { text: '%' }]
                ]
              }
            },

            {
              style: 'tableExample',
              color: '#444',
              table: {
                widths: ['50%', '23%', '22%'],
                headerRows: 2,

                // keepWithHeaderRows: 1,
                body: [
                  [
                    { text: 'Daily Water Discharge Plan', style: 'tableHeader', colSpan: 3, alignment: 'center' },
                    {},
                    {}
                  ],

                  [
                    {
                      rowSpan: 2,
                      text: 'Descriptions'
                    },
                    'Amount',
                    'Average'
                  ],
                  ['', '', 'm3/s'],
                  ['Turbine Discharge:', '0,00', '0,00'],
                  ['Spillway Discharge:', '0,00', '0,00'],
                  ['Ecological Discharge:', '0,00', '0,00'],
                  ['Total Discharge:', '0,00', '0,00']
                ]
              }
            }
          ]
        },

        {
          style: 'tableExample',
          table: {
            widths: [50, 50, 50, 50],
            body: [
              [
                { text: 'Machines Availability', style: 'tableHeader', colSpan: 4, alignment: 'center' },
                {},
                { text: 'Header 3', style: 'tableHeader', alignment: 'center' },
                { text: 'Header 3', style: 'tableHeader', alignment: 'center' }
              ],
              [
                { text: 'Units', style: 'tableHeader', alignment: 'center', rowSpan: 2 },
                ...[...Array(unit)].map((_, index) => ({
                  text: `Unit-${index}`,
                  style: 'tableHeader'
                }))
              ],
              [
                { text: 'Units', style: 'tableHeader', alignment: 'center' },
                ...[...Array(unit)].map(_ => ({
                  text: `Mw`
                }))
              ],
              [{ text: 'Max', style: 'tableHeader', alignment: 'center' }, ...tableDataMaxs],
              [{ text: 'Min', style: 'tableHeader', alignment: 'center' }, ...tableDataMin]

              // [
              //   'Units',
              //   { text: 'unit1', italics: true, color: 'gray' },
              //   { text: 'unit2', italics: true, color: 'gray' },
              //   { text: 'unit3', italics: true, color: 'gray' }
              // ]
            ]
          },

          margin: [0, 10, 0, 10]
        },

        {
          columns: [
            { text: 'Declaration Program', style: 'header1' },
            { text: 'NCC Dispatch Program', style: 'header2' }
          ]
        },

        {
          columns: [
            {
              table: {
                headerRows: 1,
                widths: ['1000', ...Array(unit + 1)].fill('auto'),
                body: [
                  [
                    { text: 'Time', style: 'tableHeader' },
                    ...[...Array(unit)].map((_, colIndex) => ({
                      text: `Unit-${colIndex + 1}`,
                      style: 'tableHeader'
                    })),
                    { text: 'Remark', style: 'tableHeader' }
                  ],
                  ...tableData
                ],
                fit: 'auto'
              }
            },

            {
              table: {
                headerRows: 1,
                widths: ['1000', ...Array(unit + 1)].fill('auto'),
                body: [
                  [
                    { text: 'Time', style: 'tableHeader' },
                    ...[...Array(unit)].map((_, colIndex) => ({
                      text: `Unit-${colIndex + 1}`,
                      style: 'tableHeader'
                    })),
                    { text: 'Remark', style: 'tableHeader' }
                  ],
                  ...tableData2
                ],
                fit: 'auto'
              }
            }
          ]
        },
        {
          columns: [
            {
              text: 'Remark:'
            }
          ]
        },
        {
          columns: [
            {
              text: 'Acknowledge by NCC'
            },
            {
              text: 'Issued By Nam Theun'
            }
          ]
        },
        {
          columns: [
            {
              text: 'Name:   Kiattikhoun C.'
            },
            {
              text: 'Name:   Mr. Kerngkham Davilaihong'
            }
          ]
        },
        {
          columns: [
            {
              text: 'Position:    PEC2'
            },
            {
              text: 'Position:   PPA Section'
            }
          ]
        },
        {
          columns: [
            {
              text: 'Date:   02/05/2023'
            },
            {
              text: 'Date:   02/05/2023'
            }
          ]
        }
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black',
          fillColor: '#f2f2f2'
        },
        tableCell: {
          fontSize: 8
        },
        alignment: 'center'

        // header: {
        //   margin: [350, 0, 0, 20]
        // },
        // header1: {
        //   margin: [150, 0, 40, 5]
        // },
        // header2: {
        //   margin: [150, 0, 40, 5]
        // }
      }
    } as unknown as TDocumentDefinitions

    // Generate the PDF
    const pdfDocGenerator = pdfMake.createPdf(docDefinition)
    pdfDocGenerator.download('daily_dispatch.pdf')
  }

  return (
    <Button type='submit' sx={{ mb: 5 }} variant='contained' onClick={handleExportPDF}>
      <Icon fontSize='1.125rem' icon='foundation:page-export-pdf' />
      &nbsp; PDF
    </Button>
  )
}

export default Exportpdf
