import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter } from "react-table";

const delProduct = async (ProductId) => {
  console.log(ProductId);
  await fetch(`http://localhost:5000/removeproduct/${ProductId}`, {
    method: "DELETE",
  });
  window.location.reload();
};

const actionIcons = (ProductId) => (
  <div className="Action_Icons d-flex align-items-center justify-content-end">
    <div className="form-check form-switch">
      <input
        className="form-check-input cursorPointer"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
      />
    </div>
    <Link
      className="d-inline-block"
      onClick={() => editProduct(ProductId)}
      to={`/edit-product/${ProductId}`}
    >
      <i className="fa-solid fa-pen cursorPointer"></i>
    </Link>
    <a className="d-inline-block" onClick={() => delProduct(ProductId)}>
      <i className="fa-solid fa-trash cursorPointer"></i>
    </a>
  </div>
);
const columns = [
  {
    Header: "Id",
    accessor: (row, index) => index + 1,
  },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ row }) => (
      <img
        src={`http://localhost:5000/images/${row.original.image}`}
        width="50"
        height="50"
      />
    ),
  },
  {
    Header: "Product",
    accessor: "title",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "ACTIONS",
    accessor: "action",
    Cell: ({ row }) => actionIcons(row.original._id),
  },
  // Add more columns as needed
];

const ProductCmp = ({ sideNavWidth, option }) => {
  const [data, setData] = useState([]);
  const getAllBrands = async () => {
    const res = await fetch("http://localhost:5000/getproducts");
    const result = await res.json();
    setData(result.data);
    // console.log("result=", result);
  };

  useEffect(() => {
    getAllBrands();
  }, []);
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
    <div className="Main-Container ProductMain">
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

export default ProductCmp;
