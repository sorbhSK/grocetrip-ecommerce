import React from "react";
import { useTable, useGlobalFilter } from "react-table";
import UserImg from "../assets/images/userN.webp";
// Example data
const actionIcons = (
  <div className="Action_Icons d-flex align-items-center justify-content-end">
    <i className="fa-solid fa-trash cursorPointer"></i>
  </div>
);
const data = [
  {
    id: 1,
    userDetails: (
      <div className="UserImg d-flex gap-3 align-items-center">
        <img src={UserImg} />
        <div className="UserDetails text-start">
          <p className="fw-bold">Raj</p>
          <p className="color_grey">User id:#12345</p>
          <p className="color_grey"><i className="fa-solid fa-phone"></i> 9875243210</p>
        </div>
      </div>
    ),
    email: "raj123@gmail.com",
    action: actionIcons,
  },
  {
    id: 2,
    userDetails: (
      <div className="UserImg d-flex gap-3 align-items-center">
        <img src={UserImg} />
        <div className="UserDetails text-start">
          <p className="fw-bold">Raj</p>
          <p className="color_grey">User id:#12345</p>
          <p className="color_grey"><i className="fa-solid fa-phone"></i> 9875243210</p>
        </div>
      </div>
    ),
    email: "raj123@gmail.com",
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
    Header: "User Details",
    accessor: "userDetails",
  },
  {
    Header: "Email Id",
    accessor: "email",
  },
  {
    Header: "ACTIONS",
    accessor: "action",
  },
  // Add more columns as needed
];

const UsersCmp = ({ sideNavWidth, option }) => {
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
    <div className="Main-Container UserMain">
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
              <a className="ClearBtn ms-3 text-decoration-none fw-bold cursorPointer" onClick={()=>setGlobalFilter("")}>Clear Search</a>
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

export default UsersCmp;
