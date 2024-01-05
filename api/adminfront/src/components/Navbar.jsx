import React from "react";

const Navbar = ({ sideNavWidth }) => {
  return (
    <div style={{ marginLeft: sideNavWidth }} className="MainNav text-end me-5">
      <div className="bellIcon">
        <span></span>
        <i className="fa-solid fa-bell"></i>
      </div>
    </div>
  );
};

export default Navbar;
