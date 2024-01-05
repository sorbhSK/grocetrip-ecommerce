import React, { useState } from "react";
import ProductCmp from "../components/ProductCmp";
import BreadCrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";

const Product = () => {
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
      <ProductCmp sideNavWidth={sideNavWidth} option={option} />
    </div>
  );
};

export default Product;
