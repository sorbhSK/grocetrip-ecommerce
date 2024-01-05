import React from "react";

const DashboardCmp = ({ sideNavWidth }) => {
  return (
    <div className="DashboardMain">
      <div style={{ marginLeft: sideNavWidth }} className="addTransition">
        <div className="container-fluid Main_Inner">
          <div className="row">
            <div className="col-4">
              <div className="dashboard-headings p-3">
                <h2 className="fw-bold">1924</h2>
                <p className="dashboard-options fw-bold">Total Products</p>
              </div>
            </div>
            <div className="col-4">
              <div className="dashboard-headings p-3">
                <h2 className="fw-bold">14</h2>
                <p className="dashboard-options fw-bold">Total Brands</p>
              </div>
            </div>
            <div className="col-4">
              <div className="dashboard-headings p-3">
                <h2 className="fw-bold">2</h2>
                <p className="dashboard-options fw-bold">Total Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCmp;
