import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import profileImg from "../assets/images/profileimg.png";
import shoppingListIcon from "../assets/images/shoppingListIcon.png";
import ProfileIcon from "../assets/images/ProfileIcon.png";
import privacyIcon from "../assets/images/privacyIcon.png";
import notificationIcon from "../assets/images/notificationIcon.png";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userc"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("userc");
    navigate("/login");
  };
  return (
    <div className="ProfileMain">
      <Navbar />
      <div className="container">
        <section>
          <div className="ProfileInner mx-auto">
            <div className="d-flex justify-content-between align-items-baseline my-5">
              <div className="text-center">
                <div className="">
                  <img src={profileImg} />
                </div>
                <h3 className="fw-bold mt-3">Donald Sawyer</h3>
              </div>
              <div className="cursorPointer text-center" onClick={LogOut}>
                <i className="fa-solid fa-power-off color_Theme powerIcon"></i>
                <h3 className="fw-bold">Logout</h3>
              </div>
            </div>
            <div>
              <div
                className="d-flex justify-content-between my-3 cursorPointer profileOptions"
                onClick={() => navigate("/myprofile")}
              >
                <div className="d-flex gap-4 align-items-center">
                  <p>
                    <img src={ProfileIcon} className="smallIcons" />
                  </p>
                  <h3>My Profile</h3>
                </div>
                <i className="fa-solid fa-angle-right color_grey p-2"></i>
              </div>
              <div
                className="d-flex justify-content-between my-3 cursorPointer profileOptions"
                onClick={() => navigate("/shoppinglist")}
              >
                <div className="d-flex gap-4 align-items-center">
                  <p>
                    <img src={shoppingListIcon} className="smallIcons" />
                  </p>
                  <h3>Shopping List</h3>
                </div>
                <i className="fa-solid fa-angle-right color_grey p-2"></i>
              </div>
              <div
                className="d-flex justify-content-between my-3 cursorPointer profileOptions"
                onClick={() => navigate("/privacypolicy")}
              >
                <div className="d-flex gap-4 align-items-center">
                  <p>
                    <img src={privacyIcon} className="smallIcons" />
                  </p>
                  <h3>Privacy Policy</h3>
                </div>
                <i className="fa-solid fa-angle-right color_grey p-2"></i>
              </div>
              <div
                className="d-flex justify-content-between my-3 cursorPointer profileOptions"
                onClick={() => navigate("/termscondition")}
              >
                <div className="d-flex gap-4 align-items-center">
                  <p>
                    <img src={privacyIcon} className="smallIcons" />
                  </p>
                  <h3>Terms & Condition</h3>
                </div>
                <i className="fa-solid fa-angle-right color_grey p-2"></i>
              </div>
              <div
                className="d-flex justify-content-between my-3 cursorPointer profileOptions"
                onClick={() => navigate("/notification")}
              >
                <div className="d-flex gap-4 align-items-center">
                  <p>
                    <img src={notificationIcon} className="smallIcons" />
                  </p>
                  <h3>Notification</h3>
                </div>
                <i className="fa-solid fa-angle-right color_grey p-2"></i>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
