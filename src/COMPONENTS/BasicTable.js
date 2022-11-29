import React, { useMemo, useState } from "react";
import { useColumnOrder, useTable } from "react-table";
import Dropdown from 'react-bootstrap/Dropdown';
import currentData from "./AmockData.json";
import currentData2 from "./AMOCKDATA2.json";
import { COLUMNS } from "./columns";
import { Checkbox } from "./Checkbox";
import './BasicTable.css'
let counter = 0
const BasicTable = () => {

  const [state, setstate] = useState(currentData)
   let ref = state
  for (let j of ref) {
   
    
    j['subtotal'] = j["Sum of Order Quantity"] + j["Sum of Sales Amount"] + j["Sum of Product Standard Cost"]
  
    j['grand total']=ref.reduce((pre,pre2)=>{return(pre+pre2["Sum of Order Quantity"])},0)
  }
  // ref.push(ref.reduce((pre,pre2)=>{return(pre+pre2["Sum of Order Quantity"])},0))
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => state, [state]);
  const [themesChange, setthemes] = useState(" ")
  function selectDarkTheme() {
    if (counter % 2 === 0) {
      setthemes('darkThemes')
      counter++

    }
    else {
      setthemes('lightThemes')
      counter++
    }
  }



  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    setColumnOrder,
    allColumns,
    getToggleHideAllColumnsProps
  } = useTable({
    columns,
    data
  }, useColumnOrder)

  const changepoistion = () => {
    setColumnOrder([
      "Product",
      "Reseller",
      "Year",
      "subtotal",
      "Quarter",
      "Month",
      "Sum of Order Quantity",
      "Sum of Product Standard Cost",
      "Sum of Sales Amount"])
  }

  const Backchangepoistion = () => {
    setColumnOrder([
      "Product",
      "Reseller",
      "Year",
      "Quarter",
      "Month",
      "Sum of Order Quantity",
      "Sum of Product Standard Cost",
      "Sum of Sales Amount",
      "subtotal"])
  }

  return (
    <>
      <body className={themesChange}>
        <div className="header">
          <h1>customize matrix</h1>
          <h4>please confiure your view and  <span>add data field(s)</span></h4>
        </div>
        <div className="split">
          <div>

          <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        performance file
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setstate(currentData)}>data 1</Dropdown.Item>
        <Dropdown.Item onClick={() => setstate(currentData2)}>data 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
        subtotal postion
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={changepoistion}>left</Dropdown.Item>
        <Dropdown.Item onClick={Backchangepoistion}>right</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

            <div>
            <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
        fliter vizual 
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <Checkbox {...getToggleHideAllColumnsProps()} />Toggle All
        {/* <Dropdown.Item onClick={Backchangepoistion}>right</Dropdown.Item> */}
        {
              allColumns.map(column => (
                <div key={column.id}>
                  <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />
                    {column.Header}
                  </label>
                </div>
              ))}
      </Dropdown.Menu>
    </Dropdown>
            </div>
            <div>
              <label htmlFor="">theme</label>
              <label className='switch'>
                <input type="checkbox"
                  onClick={selectDarkTheme} />
                <span className='slider round'></span>
              </label>

            </div>
          </div>
          <div className="tablesize">
            < table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroups) => (
                  <tr {...headerGroups.getHeaderGroupProps()}>
                    {headerGroups.headers.map((column) => (
                      <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>

                {footerGroups.map((footerGroup) => (

                  <tr {...footerGroup.getFooterGroupProps()}>

                    {footerGroup.headers.map((column) => (

                      <td {...column.getFooterProps}>{column.render("Footer")}</td>

                    ))}

                  </tr>

                ))}

              </tfoot>
            </table>
          </div>

        </div>
      </body>
    </>
  );
};

export default BasicTable;

