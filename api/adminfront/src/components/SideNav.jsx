import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoImg from "../assets/images/logo.png";
const SideNav = ({ openNav, sideNavText, sideNavWidth, setOption }) => {
  const location = useLocation();
  const [pathIndex, setPathIndex] = useState(0);
  const [pathName, setPathName] = useState("/");
  const pathArr = [
    "/",
    "/brand",
    "/category",
    "/products",
    "/users",
    "/suggestions",
    "/logout",
  ];
  // console.log("location=",location.pathname);
  // console.log("pathName=",pathName);
  const BgPrev = {
    background: "#fff",
    color: "#2e2c2c",
  };
  const BgToChng = {
    background: "#f75435",
    color: "#fff",
  };
  const SideNavOptionToPut = [
    {
      optionClass: "fa-solid fa-gauge",
      optionText: "Dashboard",
      optionBg: BgToChng,
    },
    {
      optionClass: "fa-solid fa-trash",
      optionText: "Brands",
      optionBg: BgPrev,
    },
    {
      optionClass: "fa-solid fa-tag",
      optionText: "Category",
      optionBg: BgPrev,
    },
    {
      optionClass: "fa-solid fa-cube",
      optionText: "Products",
      optionBg: BgPrev,
    },
    {
      optionClass: "fa-solid fa-user-group",
      optionText: "Users",
      optionBg: BgPrev,
    },
    {
      optionClass: "fa-solid fa-bell",
      optionText: "Suggestion",
      optionBg: BgPrev,
    },
    {
      optionClass: "fa-solid fa-arrow-right-from-bracket",
      optionText: "Log out",
      optionBg: BgPrev,
    },
  ];
  useEffect(() => {
    const editPath = location.pathname.split("/");
    const FindpathIndex = pathArr.indexOf(pathName);
    setPathIndex(FindpathIndex);
    const newArr = SideNavOptions;
    newArr.forEach((val) => (val.optionBg = BgPrev));
    if (location.pathname !== "/add-product") {
      newArr[FindpathIndex].optionBg = BgToChng;
    }

    setSideNavOptions(newArr);

    if (
      location.pathname === "/add-product" ||
      editPath[1] === "edit-product"
    ) {
      setPathName("/products");
    } else if (location.pathname === "/storelocator") {
      setPathName("/brand");
    } else {
      setPathName(location.pathname);
    }
  });
  const [SideNavOptions, setSideNavOptions] = useState(SideNavOptionToPut);
  const navigate = useNavigate();
  const SetOptionPropertis = (index) => {
    SideNavOptions[index].optionText === "Suggestion"
      ? setOption("Notification")
      : setOption(SideNavOptions[index].optionText);

    switch (index) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/brand");
        break;
      case 2:
        navigate("/category");
        break;
      case 3:
        navigate("/products");
        break;
      case 4:
        navigate("/users");
        break;
      case 5:
        navigate("/suggestions");
        break;
      case 6:
        navigate("/login");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ width: sideNavWidth }}>
        <h1
          className="GroceLogo addTransition"
          style={{ visibility: sideNavText }}
        >
          <img src={LogoImg} className="w-75" />
        </h1>
        <span className="NavToggle" onClick={openNav}>
          <i className="fa-solid fa-angle-left"></i>
        </span>
        {SideNavOptions?.map((option, index) => (
          <a
            style={option.optionBg}
            className=""
            key={index}
            onClick={() => SetOptionPropertis(index)}
          >
            <i className={option.optionClass}></i>
            <span style={{ visibility: sideNavText }}>{option.optionText}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
