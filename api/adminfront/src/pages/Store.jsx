import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import StoreCmp from "../components/StoreCmp";

const Store = () => {
  const [StoreId, setStoreId] = useState(null);
  const delStore = async (StoreId) => {
    await fetch(`http://localhost:5000/removestore/${StoreId}`, {
      method: "DELETE",
    });
    window.location.reload();
  };
  const actionIcons = (ReceivedStoreId) => (
    <div className="Action_Icons d-flex align-items-center justify-content-end">
      <a
        className="d-inline-block"
        data-bs-toggle="modal"
        data-bs-target="#myEditModal"
        onClick={() => setStoreId(ReceivedStoreId)}
      >
        <i className="fa-solid fa-pen cursorPointer"></i>
      </a>
      <a className="d-inline-block" onClick={() => delStore(ReceivedStoreId)}>
        <i className="fa-solid fa-trash cursorPointer"></i>
      </a>
    </div>
  );
  const columns = [
    {
      Header: "#",
      accessor: (row, index) => index + 1,
    },
    {
      Header: "Store Name",
      accessor: "name",
    },
    {
      Header: "Address",
      accessor: "address",
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
      <StoreCmp sideNavWidth={sideNavWidth} option={option} columns={columns} dataId={StoreId}/>
    </div>
  );
};

export default Store;
