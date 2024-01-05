import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import CategoryCmp from "../components/CategoryCmp";

const Category = () => {
  const [CateId, setCateId] = useState(null);
  const delCategory = async (CategoryId) => {
    await fetch(`http://localhost:5000/removecategory/${CategoryId}`, {
      method: "DELETE",
    });
    window.location.reload();
  };
  const actionIcons = (CategoryId) => (
    <span className="Action_Icons">
      <a
        className="d-inline-block"
        data-bs-toggle="modal"
        data-bs-target="#myEditModal"
        onClick={() => setCateId(CategoryId)}
      >
        <i className="fa-solid fa-pen cursorPointer"></i>
      </a>
      <a className="d-inline-block" onClick={() => delCategory(CategoryId)}>
        <i className="fa-solid fa-trash cursorPointer"></i>
      </a>
    </span>
  );
  const columns = [
    {
      Header: "#",
      accessor: (row, index) => index + 1,
    },
    {
      Header: "Category",
      accessor: "name",
      Cell: ({ row }) => (
        <div>
          {row.original.image != "" ? (
            <img
              src={`http://localhost:5000/images/${row.original.image}`}
              width="50"
              height="50"
            />
          ) : (
            ""
          )}
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      Header: "ACTIONS",
      accessor: "action",
      Cell: ({ row }) => actionIcons(row.original._id),
    },
    // Add more columns as needed
  ];

  const [sideNavWidth, setSideNavWidth] = useState("280px");
  const [sideNavText, setSideNavText] = useState("visible");
  const [option, setOption] = useState("Category");
  function openNav() {
    if (sideNavWidth === "280px") {
      setSideNavWidth("75px");
      setSideNavText("hidden");
    } else {
      setSideNavWidth("280px");
      setSideNavText("visible");
    }
  }

  return (
    <div>
      <SideNav
        sideNavWidth={sideNavWidth}
        sideNavText={sideNavText}
        openNav={openNav}
        setOption={setOption}
      />
      <Navbar sideNavWidth={sideNavWidth} />
      <BreadCrumb sideNavWidth={sideNavWidth} option={option} />
      <CategoryCmp
        sideNavWidth={sideNavWidth}
        option={option}
        columns={columns}
        dataId={CateId}
      />
    </div>
  );
};

export default Category;
