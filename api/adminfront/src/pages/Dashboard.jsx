import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import DashboardCmp from "../components/DashboardCmp";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";

const Dashboard = () => {
  const [sideNavWidth, setSideNavWidth] = useState("280px");
  const [sideNavText, setSideNavText] = useState("visible");
  const [option, setOption] = useState("Dashboard");
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
      <DashboardCmp sideNavWidth={sideNavWidth} />
    </div>
  );
};

export default Dashboard;
