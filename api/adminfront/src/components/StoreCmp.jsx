import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import EditStore from "../popup/EditStore";

const StoreCmp = ({ sideNavWidth, dataId, columns }) => {
  const [data, setData] = useState([]);
  const getAllStores = async () => {
    const res = await fetch("http://localhost:5000/getstores");
    const result = await res.json();
    setData(result.data);
    console.log(result);
  };
  useEffect(() => {
    getAllStores();
  }, [dataId]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  return (
    <div className="Main-Container StoreMain ">
    <EditStore dataId={dataId}/>
      <div style={{ marginLeft: sideNavWidth }} className="addTransition">
        <div className="container-fluid Main_Inner">
          <div className="mx-auto">
            <table {...getTableProps()} id="myTable" className="m-0">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
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
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCmp;
