import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    const FindpathIndex = pathArr.indexOf(pathName);
    setPathIndex(FindpathIndex);
    const newArr = SideNavOptions;
    newArr.forEach((val) => (val.optionBg = BgPrev));
    newArr[FindpathIndex].optionBg = BgToChng;
    setSideNavOptions(newArr);
  }, [pathName]);

  const [SideNavOptions, setSideNavOptions] = useState(SideNavOptionToPut);
  const navigate = useNavigate();

  const SetOptionProperties = (index) => {
    const selectedOption = SideNavOptions[index];
    setOption(selectedOption.optionText);

    switch (selectedOption.optionText) {
      case "Dashboard":
        navigate("/");
        setPathName("/");
        break;
      case "Brands":
        navigate("/brand");
        setPathName("/brand");
        break;
      case "Category":
        navigate("/category");
        setPathName("/category");
        break;
      case "Products":
        navigate("/products");
        setPathName("/products");
        break;
      case "Users":
        navigate("/users");
        setPathName("/users");
        break;
      case "Suggestion":
        navigate("/suggestions");
        setPathName("/suggestions");
        break;
      case "Log out":
        navigate("/logout");
        setPathName("/logout");
        break;
      default:
        navigate("/");
        setPathName("/");
    }
  };

  return (
    <div>
      <div id="mySidenav" className="sidenav" style={{ width: sideNavWidth }}>
        <h1 className="GroceLogo" style={{ visibility: sideNavText }}>
          GroceTrip
        </h1>
        <span className="NavToggle" onClick={openNav}>
          <i className="fa-solid fa-angle-left"></i>
        </span>
        {SideNavOptions?.map((option, index) => (
          <a
            style={option.optionBg}
            className=""
            key={index}
            onClick={() => SetOptionProperties(index)}
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
