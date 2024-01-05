import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import CommonPopup from "../popup/CommonPopup";
import StoreAddPopup from "../popup/StoreAddPopup";
const BreadCrumb = ({ sideNavWidth, option}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [ElementToRender, setElementToRender] = useState(null);

  const editPath = location.pathname.split('/'); 
  useEffect(() => {
    if (pathName === "/storelocator") {
      setElementToRender(<StoreAddPopup option={option} />);
    } else if (pathName === "/brand" || pathName === "/category") {
      setElementToRender(<CommonPopup option={option} />);
    }
  }, []);
  return (
    <div style={{ marginLeft: sideNavWidth }} className="addTransition">
      <div className="mx-4 my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb align-items-center">
            <li className="breadcrumb-item">
              <a className="BreadCrumbOptions text-decoration-none fw-bold cursorPointer">
                {pathName === "/add-product" ? "Add Product" : option}
              </a>
            </li>
            <li className="breadcrumb-item">
              <a className="BreadCrumbOptions text-decoration-none fw-bold cursorPointer">
                {option === "Dashboard" || option === "Log out" ? (
                  ""
                ) : (
                  <div className="d-flex gap-2">
                    <span style={{ color: "#0000003d" }}>|</span>
                    <div className="breadCrumb-smallText">
                      <span
                        onClick={() => navigate("/")}
                        className="cursorPointer"
                      >
                        Home
                      </span>
                      -
                      <div>
                        {pathName === "/storelocator" ||
                        pathName === "/add-product" ? (
                          <p>
                            {" "}
                            <span>
                              {pathName === "/storelocator" ? (
                                <span onClick={() => navigate("/brand")}>
                                  Brand
                                </span>
                              ) : (
                                <span onClick={() => navigate("/products")}>
                                  Product
                                </span>
                              )}
                            </span>{" "}
                            <span className="ps-2">
                              {pathName === "/storelocator" ? (
                                <span style={{ color: "#000000a6" }}>
                                  Aldi sue
                                </span>
                              ) : (
                                <span style={{ color: "#000000a6" }}>
                                  Add Product
                                </span>
                              )}
                            </span>
                          </p>
                        ) : (
                          option
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </a>
            </li>
            {pathName === "/add-product" ||
            pathName === "/users" ||
            pathName === "/suggestions" ? null : (
              <li className="breadcrumb-item">
                {option === "Users" ||
                option === "Dashboard" ||
                option === "Notification" ||
                option === "Suggestion" ||
                pathName === "/add-product"|| editPath[1] === "edit-product" ? null : option === "Products" ? (
                  <Link
                    className="btn btn-success btn-sm addBtn"
                    to="/add-product"
                  >
                    Add {option}
                  </Link>
                ) : (
                  <a
                    className="btn btn-success btn-sm addBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  >
                    Add {pathName === "/storelocator" ? "Store" : option}
                  </a>
                )}
                {ElementToRender}
              </li>
            )}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadCrumb;
