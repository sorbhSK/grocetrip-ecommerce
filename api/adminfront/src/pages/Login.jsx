import React, { useState } from "react";
import { useNavigate } from "react-router";
import LogoImg from "../assets/images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const blankData = { email: "", password: "" };
  const [adminData, setAdminData] = useState(blankData);
  const changedata = (e) => {
    setAdminData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const LoginAdmin = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(adminData);
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const result = await res.json();
    if (result.status) navigate("/");
    console.log(result);
  };

  return (
    <div className="d-table vh-100 LoginMain-Upper mx-auto">
      <div className=" d-table-cell align-middle">
        <div className="LoginMain">
          <form onSubmit={LoginAdmin}>
            <div className="text-center">
              <img src={LogoImg} className="w-50" />
            </div>
            <div>
              <h3 className="my-3 fw-bold"></h3>

              <div className="my-4">
                <label className="d-block fw-bold text-dark mb-2">Email</label>
                <input
                  className="loginInputs w-100"
                  type="text"
                  onChange={changedata}
                  name="email"
                  value={adminData.email}
                />
              </div>
              <div className="my-4">
                <div className="d-flex justify-content-between">
                  <label className="d-block fw-bold text-dark mb-2">
                    Password
                  </label>
                  <a className="forgotpassword fw-bold text-decoration-none">
                    Forgot Password?
                  </a>
                </div>
                <input
                  className="loginInputs w-100"
                  type="text"
                  onChange={changedata}
                  name="password"
                  value={adminData.password}
                />
              </div>
            </div>
            <div className="mt-5">
              <button className="w-100 btn LoginBtn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
