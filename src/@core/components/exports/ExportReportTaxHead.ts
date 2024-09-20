import { ExcelPowerType, ExcelType } from '@/globalState'
import Excel from 'exceljs'
import { saveAs } from 'file-saver'

const columns = [
  {
    header: '',
    key: 'a'
  },
  { header: '', key: 'b' },
  { header: '', key: 'c' },
  { header: '', key: 'd' },
  { header: '', key: 'e' },
  { header: '', key: 'f' },
  { header: '', key: 'g' },
  { header: '', key: 'h' },
  { header: '', key: 'i' },
  { header: '', key: 'j' },
  { header: '', key: 'k' },
  { header: '', key: 'l' },
  { header: '', key: 'm' },
  { header: '', key: 'n' },
  { header: '', key: 'o' },
  { header: '', key: 'p' },
  { header: '', key: 'q' },
  { header: '', key: 'r' },
  { header: '', key: 's' }
]
const columns2 = [
  {
    header: '',
    key: 'a'
  },
  { header: '', key: 'b' },
  { header: '', key: 'c' },
  { header: '', key: 'd' },
  { header: '', key: 'e' },
  { header: '', key: 'f' },
  { header: '', key: 'g' },
  { header: '', key: 'h' },
  { header: '', key: 'i' },
  { header: '', key: 'j' },
  { header: '', key: 'k' },
  { header: '', key: 'l' },
  { header: '', key: 'm' },
  { header: '', key: 'n' },
  { header: '', key: 'o' },
  { header: '', key: 'p' },
  { header: '', key: 'q' },
  { header: '', key: 'r' },
  { header: '', key: 's' },
  { header: '', key: 't' },
  { header: '', key: 'u' },
  { header: '', key: 'v' },
  { header: '', key: 'w' },
  { header: '', key: 'x' },
  { header: '', key: 'y' },
  { header: '', key: 'z' },
  { header: '', key: 'aa' }
]

const workSheetName = 'Worksheet1-1'

export const ExportReportHeader = async (data: ExcelType[], data2: ExcelPowerType[]) => {
  // console.log("Data2===>", data);
  const workbook = new Excel.Workbook()
  try {
    const fileName = `${Date.now()}-Daily`

    // creating one worksheet1 in workbook
    const worksheet1 = workbook.addWorksheet('Daily Report')
    const worksheet2 = workbook.addWorksheet('Operation Report')

    // add worksheet1 columns
    // each columns contains header and its mapping key from data
    worksheet1.columns = columns

    worksheet1.properties.defaultRowHeight = 15

    // const headerRow = worksheet1.getRow(1)
    // headerRow.eachCell(cell => {
    //   cell.alignment = { vertical: 'middle', horizontal: 'center' }
    //   headerRow.height = 18 // Set header row height
    // })

    //   worksheet1.mergeCells("A1:B1");
    worksheet1.mergeCells('A1:A2')
    worksheet1.mergeCells('B1:B2')
    worksheet1.mergeCells('G1:H1')
    worksheet1.mergeCells('I1:J1')
    worksheet1.mergeCells('K1:L1')
    worksheet1.mergeCells('M1:N1')
    worksheet1.mergeCells('O1:P1')

    // updated the font for first row.
    worksheet1.getCell('A1').value = `Date`
    worksheet1.getCell('B1').value = `Customer`
    worksheet1.getCell('C1').value = `Water Level`
    worksheet1.getCell('D1').value = `Diff with Yesterday`
    worksheet1.getCell('E1').value = `Diff with Full`
    worksheet1.getCell('F1').value = `Potential Water Storage`
    worksheet1.getCell('H1').value = `Active Storage`
    worksheet1.getCell('J1').value = `Inflow`
    worksheet1.getCell('L1').value = `OutFlow`
    worksheet1.getCell('N1').value = `Spill Way`
    worksheet1.getCell('P1').value = `Other Water Released`
    worksheet1.getCell('Q1').value = `Rain fall`
    worksheet1.getCell('R1').value = `Net Energy Output (NEO)`
    worksheet1.getCell('S1').value = `Water Rate`

    // worksheet1.getCell('B2').value = `masl`
    worksheet1.getCell('C2').value = `masl`
    worksheet1.getCell('D2').value = `m`
    worksheet1.getCell('E2').value = `m`
    worksheet1.getCell('F2').value = `MCM`
    worksheet1.getCell('G2').value = `MCM`
    worksheet1.getCell('H2').value = `%`
    worksheet1.getCell('I2').value = `m3/s`
    worksheet1.getCell('J2').value = `MCM`
    worksheet1.getCell('K2').value = `m3/s`
    worksheet1.getCell('L2').value = `MCM`
    worksheet1.getCell('M2').value = `m3/s`
    worksheet1.getCell('N2').value = `MCM`
    worksheet1.getCell('O2').value = `m3/s`
    worksheet1.getCell('P2').value = `MCM`
    worksheet1.getCell('Q2').value = `mm`
    worksheet1.getCell('R2').value = `kWh`
    worksheet1.getCell('S2').value = `m3/kwh`

    // worksheet1.getRow(1).height = 20

    // loop through all of the columns and set the alignment with width.
    worksheet1.columns.forEach(column => {
      column.width = 15
      column.alignment = { horizontal: 'center', vertical: 'middle' }
    })

    //   worksheet1.columns('O')

    // loop through data and add each one to worksheet1
    data.forEach(singleData => {
      worksheet1.addRow(singleData)
    })

    worksheet1.getColumn('A').width = 20
    worksheet1.getColumn('B').width = 20

    // loop through all of the rows and set the outline style.
    worksheet1.eachRow(row => {
      // console.log(row.number);

      // store each cell to currentCell
      // const currentCell = row.getCellEx

      // loop through currentCell to apply border only for the non-empty cell of excel
      row.eachCell(singleCell => {
        // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
        const cellAddress = singleCell.address
        worksheet1.getRow(1).height = 30

        //   console.log(cellAddress);
        if (row.number <= 2) {
          worksheet1.getCell(cellAddress).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'ABDDE6' }
          }
          worksheet1.getRow(row.number).font = {
            size: 14,
            bold: true,
            name: 'Phetsarath OT'
          }
        }
        worksheet1.getCell(cellAddress).font = {
          size: 12,
          name: 'Phetsarath OT'
        }

        // apply border
        worksheet1.getCell(cellAddress).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
    })

    // --------------------------------//--------------------------
    worksheet2.columns = columns2

    worksheet2.properties.defaultRowHeight = 15

    //   worksheet2.mergeCells("A1:B1");
    worksheet2.mergeCells('A1:A2')
    worksheet2.mergeCells('B1:B2')

    // updated the font for first row.
    // worksheet2.getCell('A1').value = 'Name of Source'
    worksheet2.getCell('A1').value = 'Date'
    worksheet2.getCell('B1').value = 'Customer'
    worksheet2.getCell('C1').value = '00:00'
    worksheet2.getCell('D1').value = '01:00'
    worksheet2.getCell('E1').value = '02:00'
    worksheet2.getCell('F1').value = '03:00'
    worksheet2.getCell('G1').value = '04:00'
    worksheet2.getCell('H1').value = '05:00'
    worksheet2.getCell('I1').value = '06:00'
    worksheet2.getCell('J1').value = '07:00'
    worksheet2.getCell('K1').value = '08:00'
    worksheet2.getCell('L1').value = '09:00'
    worksheet2.getCell('M1').value = '10:00'
    worksheet2.getCell('N1').value = '11:00'
    worksheet2.getCell('O1').value = '12:00'
    worksheet2.getCell('່P1').value = '13:00'
    worksheet2.getCell('Q1').value = '14:00'
    worksheet2.getCell('R1').value = '15:00'
    worksheet2.getCell('S1').value = '16:00'
    worksheet2.getCell('T1').value = '17:00'
    worksheet2.getCell('U1').value = '18:00'
    worksheet2.getCell('V1').value = '19:00'
    worksheet2.getCell('W1').value = '20:00'
    worksheet2.getCell('X1').value = '21:00'
    worksheet2.getCell('Y1').value = '22:00'
    worksheet2.getCell('Z1').value = '23:00'
    worksheet2.getCell('AA1').value = 'Event Remarks'

    // worksheet2.getCell('B2').value = 'MW'
    worksheet2.getCell('C2').value = 'MW'
    worksheet2.getCell('D2').value = 'MW'
    worksheet2.getCell('E2').value = 'MW'
    worksheet2.getCell('F2').value = 'MW'
    worksheet2.getCell('G2').value = 'MW'
    worksheet2.getCell('H2').value = 'MW'
    worksheet2.getCell('I2').value = 'MW'
    worksheet2.getCell('J2').value = 'MW'
    worksheet2.getCell('K2').value = 'MW'
    worksheet2.getCell('L2').value = 'MW'
    worksheet2.getCell('M2').value = 'MW'
    worksheet2.getCell('N2').value = 'MW'
    worksheet2.getCell('່O2').value = 'MW'
    worksheet2.getCell('P2').value = 'MW'
    worksheet2.getCell('Q2').value = 'MW'
    worksheet2.getCell('R2').value = 'MW'
    worksheet2.getCell('S2').value = 'MW'
    worksheet2.getCell('T2').value = 'MW'
    worksheet2.getCell('U2').value = 'MW'
    worksheet2.getCell('V2').value = 'MW'
    worksheet2.getCell('W2').value = 'MW'
    worksheet2.getCell('X2').value = 'MW'
    worksheet2.getCell('Y2').value = 'MW'
    worksheet2.getCell('Z2').value = 'MW'
    worksheet2.getCell('AA2').value = ''

    worksheet2.getRow(1).height = 20

    // loop through all of the columns and set the alignment with width.
    worksheet2.columns.forEach(column => {
      column.width = 12
      column.alignment = { horizontal: 'center', vertical: 'middle' }
    })

    //   worksheet2.columns('O')

    // loop through data and add each one to worksheet2
    data2.forEach(singleData => {
      worksheet2.addRow(singleData)
    })

    worksheet2.getColumn('A').width = 25
    worksheet2.getColumn('B').width = 25
    worksheet2.getColumn('Z').width = 20
    worksheet2.getColumn('AA').width = 25

    // loop through all of the rows and set the outline style.
    worksheet2.eachRow(row => {
      // console.log(row.number);

      // store each cell to currentCell
      // const currentCell = row.getCellEx

      // loop through currentCell to apply border only for the non-empty cell of excel
      row.eachCell(singleCell => {
        // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
        const cellAddress = singleCell.address

        //   console.log(cellAddress);
        if (row.number <= 2) {
          worksheet2.getCell(cellAddress).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'ABDDE6' }
          }
          worksheet2.getRow(row.number).font = {
            size: 14,
            bold: true,
            name: 'Phetsarath OT'
          }
        }
        worksheet2.getCell(cellAddress).font = {
          size: 12,
          name: 'Phetsarath OT'
        }

        // apply border
        worksheet2.getCell(cellAddress).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
    })

    // write the content using writeBuffer
    const buf = await workbook.xlsx.writeBuffer()

    // download the processed file
    saveAs(new Blob([buf]), `${fileName}.xlsx`)
  } catch (error) {
    // console.error('<<<ERRROR>>>', error)
    console.error('Something Went Wrong', error)
  } finally {
    // removing worksheet1's instance to create new one
    workbook.removeWorksheet(workSheetName)
  }
}
