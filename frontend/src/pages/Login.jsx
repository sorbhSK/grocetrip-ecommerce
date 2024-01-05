import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import LogoImg from "../assets/images/logo.png";
import Flag from "../assets/images/ellipse.png";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../Store/Slice/Authentication";
import axios from "axios";
axios.defaults.withCredentials = true;

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [accept, setAccept] = useState(false);
  const LoginUser = async (e) => {
    e.preventDefault();
    // dispatch(UserLogin({phone,accept}))
    if (accept && phone !== "") {
      if (phone.length !== 10) {
        alert("Phone Number must be of 10 Digits");
      } else if (isNaN(phone)) {
        alert("Enter a valid Number !");
      } else {
        const body = JSON.stringify({ phone: phone, acceptStatus: accept });
        const res = await fetch("http://localhost:5000/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });
        const result = await res.json();
        // if (result) navigate("/verify",{
        //   state:{
        //     userId:result._id
        //   }
        // });
        if (result.status) {
          // dispatch({ type: "INIT_USER", payload: result.data });
          localStorage.setItem("userc", JSON.stringify(result.data));
          // localStorage.removeItem("userc");
          navigate("/");
        }
      }
    } else {
      if (!accept && phone === "") {
        alert("Fill the Required fields....");
      } else {
        !accept
          ? alert("Accept Terms and Condition")
          : alert("Enter the phone number");
      }
    }
  };

  return (
    <div className="d-table vh-100 LoginMain-Upper mx-auto">
      <div className=" d-table-cell align-middle">
        <div className="LoginMain">
          <form onSubmit={LoginUser}>
            <div className="text-center mb-5">
              <img src={LogoImg} className="w-50" />
            </div>
            <div>
              <h3 className="my-3 fw-bold"></h3>
              <div className="my-4">
                <h4 className="d-block fw-bold text-dark mb-2">Login</h4>
                <p className="color_grey">Hello, Welcome back to Grocetrip!</p>
              </div>
              <div className="my-5">
                <div className="d-flex justify-content-between">
                  <label
                    className="d-block fw-bold text-dark mb-2"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="d-flex bgcolor_grey">
                  <div className="flagBox text-center cursorPointer">
                    <img src={Flag} className="w-50" />
                    <i className="fa-solid fa-angle-down color_Theme p-1"></i>
                  </div>
                  <input
                    className="loginInputs w-100"
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                    value={phone}
                  />
                </div>
                <div className="mt-3">
                  <input
                    className="loginInputs"
                    type="checkbox"
                    onChange={(e) => setAccept(e.target.checked)}
                    name="accept"
                    value={accept}
                  />
                  <p className="d-inline-block ms-2 Accept-Text">
                    Accept the <span className="color_green">Privacy</span> and{" "}
                    <span className="color_green">Terms</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button className="w-100 btn LoginBtn" type="submit">
                Send Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
