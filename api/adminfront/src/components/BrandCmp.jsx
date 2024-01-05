import React, { useEffect, useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import EditCommon from "../popup/EditCommon";

const BrandCmp = ({ sideNavWidth, option ,columns, dataId }) => {
  const [data, setData] = useState([]);
  const getAllBrands = async () => {
    const res = await fetch("http://localhost:5000/getbrands");
    const result = await res.json();
    setData(result.data);
    console.log(result);
  };
  useEffect(() => {
    getAllBrands();
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

  const { globalFilter } = state;
  const handleSearchChange = (e) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
  };

  return (
    <div className="Main-Container BrandMain">
    <EditCommon option={option} dataId={dataId}/>
      <div style={{ marginLeft: sideNavWidth }} className="addTransition">
        <div className="container-fluid Main_Inner">
          <div>
            <div className="InputMainContainer">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder={`Search ${option}`}
                value={globalFilter || ""}
                onChange={handleSearchChange}
                id="myInput"
              />
              <a
                className="ClearBtn ms-3 text-decoration-none fw-bold cursorPointer"
                onClick={() => setGlobalFilter("")}
              >
                Clear Search
              </a>
            </div>
            <table {...getTableProps()} id="myTable">
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

export default BrandCmp;
