import React, { useState } from "react";
import BrandCmp from "../components/BrandCmp";
import BreadCrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import { Link } from "react-router-dom";


const Brand = () => {
const [BrandId, setBrandId] = useState(null);
const delBrand = async (BrandId) => {
  await fetch(`http://localhost:5000/removebrand/${BrandId}`, {
    method: "DELETE",
  });
  window.location.reload();
};
const actionIcons = (BrandId) => (
  <span className="Action_Icons">
    <Link className="text-decoration-none" to="/storelocator">
      <i className="fa-solid fa-location-dot cursorPointer"></i>
    </Link>
    <i className="fa-solid fa-pen cursorPointer"></i>
    <a
      className="d-inline-block"
      data-bs-toggle="modal"
      data-bs-target="#myEditModal"
      onClick={() => setBrandId(BrandId)}
    >
      <i className="fa-solid fa-pen cursorPointer"></i>
    </a>
    <a className="d-inline-block" onClick={() => delBrand(BrandId)}>
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
    Header: "Brand Name",
    accessor: "name",
  },
  {
    Header: "Big Logo",
    accessor: "bigLogo",
    Cell: ({ row }) => (
      <img
        src={`http://localhost:5000/images/${row.original.image}`}
        alt="Big Logo"
        width="50"
        height="50"
      />
    ),
  },
  {
    Header: "Small Logo",
    accessor: "smallLogo",
    Cell: ({ row }) => (
      <img
        src={`http://localhost:5000/images/${row.original.image}`}
        alt="Small Logo"
        width="30"
        height="30"
      />
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
  const [option, setOption] = useState("Brands");
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
      <BrandCmp sideNavWidth={sideNavWidth} option={option} columns={columns} dataId={BrandId}/>
    </div>
  );
};

export default Brand;
