import React from "react";
import { useTable, useGlobalFilter } from "react-table";
import MyImg from "../assets/images/banner.png";
// Example data
const actionIcons = (
  <div className="Action_Icons CheckIcons d-flex align-items-center justify-content-end">
    <i className="fa-solid fa-check cursorPointer"></i>
    <i className="fa-solid fa-xmark cursorPointer"></i>
  </div>
);
const data = [
  {
    id: 1,
    image: (
      <div className="BigLogo">
        <img src={MyImg} />
      </div>
    ),
    suggestion: "suggestion",
    userDetail: "John@gmail.com",
    date: "12345345654",
    action: actionIcons,
  },
  {
    id: 2,
    image: (
      <div className="BigLogo">
        <img src={MyImg} />
      </div>
    ),
    suggestion: "suggestion",
    userDetail: "John@gmail.com",
    date: "12345345654",
    action: actionIcons,
  },
  // Add more data as needed
];
const columns = [
  {
    Header: "#",
    accessor: "id",
  },
  {
    Header: "Image",
    accessor: "image",
  },
  {
    Header: "Suggestion",
    accessor: "suggestion",
  },
  {
    Header: "User Detail",
    accessor: "userDetail",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "ACTIONS",
    accessor: "action",
  },
  // Add more columns as needed
];

const SuggestionCmp = ({ sideNavWidth, option }) => {
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
    <div className="Main-Container SuggestionMain">
      <div style={{ marginLeft: sideNavWidth }} className="addTransition">
        <div className="container-fluid Main_Inner">
          <div>
            {option === 'Notification' ? null:
            <div className="InputMainContainer">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder={`Search ${option}`}
                value={globalFilter || ""}
                onChange={handleSearchChange}
                id="myInput"
              />
              <a className="ClearBtn ms-3 text-decoration-none fw-bold cursorPointer" onClick={()=>setGlobalFilter("")}>Clear Search</a>
            </div>
            }
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

export default SuggestionCmp;
