import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import EditProductCmp from "../components/EditProductCmp";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [sideNavWidth, setSideNavWidth] = useState("280px");
  const [sideNavText, setSideNavText] = useState("visible");
  const [option, setOption] = useState("Products");
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
      <EditProductCmp
        sideNavWidth={sideNavWidth}
        option={option}
        productId={id}
      />
    </div>
  );
};

export default EditProduct;
