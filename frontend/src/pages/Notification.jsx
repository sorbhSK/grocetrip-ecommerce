import React from "react";
import notification from "../assets/images/notification.png";

const Notification = () => {
  return (
    <div>
      <div className="container">
        <h1 className="mt-5 mb-4 fw-bold">Notifications</h1>
        <div className="NotificationMain">
          <div className="notificationBlocks">
            <div className="d-flex align-items-center">
              <div className="">
                <div className="notificatioIcon">
                  <img src={notification} />
                </div>
              </div>
              <div>
                <h2 className="fw-bold cursorPointer">Lorem ipsum dolor</h2>
                <h4 className="py-2">
                  Lorem ipsum dolor sit amet consectetur...
                </h4>
                <p className="color_grey">10 min ago</p>
              </div>
            </div>
          </div>
          <div className="notificationBlocks">
            <div className="d-flex align-items-center">
              <div className="">
                <div className="notificatioIcon">
                  <img src={notification} />
                </div>
              </div>
              <div>
                <h2 className="fw-bold cursorPointer">Lorem ipsum dolor</h2>
                <h4 className="py-2">
                  Lorem ipsum dolor sit amet consectetur...
                </h4>
                <p className="color_grey">23 min ago</p>
              </div>
            </div>
          </div>
          <div className="notificationBlocks">
            <div className="d-flex align-items-center">
              <div className="">
                <div className="notificatioIcon">
                  <img src={notification} />
                </div>
              </div>
              <div>
                <h2 className="fw-bold cursorPointer">Lorem ipsum dolor</h2>
                <h4 className="py-2">
                  Lorem ipsum dolor sit amet consectetur...
                </h4>
                <p className="color_grey">15 min ago</p>
              </div>
            </div>
          </div>
          <div className="notificationBlocks">
            <div className="d-flex align-items-center">
              <div className="">
                <div className="notificatioIcon">
                  <img src={notification} />
                </div>
              </div>
              <div>
                <h2 className="fw-bold cursorPointer">Lorem ipsum dolor</h2>
                <h4 className="py-2">
                  Lorem ipsum dolor sit amet consectetur...
                </h4>
                <p className="color_grey">20 min ago</p>
              </div>
            </div>
          </div>
          <div className="notificationBlocks">
            <div className="d-flex align-items-center">
              <div className="">
                <div className="notificatioIcon">
                  <img src={notification} />
                </div>
              </div>
              <div>
                <h2 className="fw-bold cursorPointer">Lorem ipsum dolor</h2>
                <h4 className="py-2">
                  Lorem ipsum dolor sit amet consectetur...
                </h4>
                <p className="color_grey">34 min ago</p>
              </div>
            </div>
          </div>
          <div className="notificationBlocks">
            <div className="d-flex align-items-center">
              <div className="">
                <div className="notificatioIcon">
                  <img src={notification} />
                </div>
              </div>
              <div>
                <h2 className="fw-bold cursorPointer">Lorem ipsum dolor</h2>
                <h4 className="py-2">
                  Lorem ipsum dolor sit amet consectetur...
                </h4>
                <p className="color_grey">22 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
