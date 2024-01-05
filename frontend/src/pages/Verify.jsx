import { useNavigate,useLocation } from "react-router";
import LogoImg from "../assets/images/logo.png";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="d-table vh-100 LoginMain-Upper mx-auto">
      <div className=" d-table-cell align-middle">
        <div className="LoginMain">
          <div className="text-center mb-5">
            <img src={LogoImg} className="w-50" />
          </div>
          <div>
            <h3 className="my-3 fw-bold"></h3>
            <div className="my-4">
              <h4 className="d-block fw-bold text-dark mb-3">
                Verification code
              </h4>
              <p className="color_grey w-75">
                We have to sent the code verification to your mobile number
              </p>
            </div>
            <div className="my-5">
              <div className="">
                <div className="d-flex NumberContentMain">
                  <span className="NumberContent text-center bgcolor_grey">
                    0
                  </span>
                  <span className="NumberContent text-center bgcolor_grey">
                    0
                  </span>
                  <span className="NumberContent text-center bgcolor_grey">
                    0
                  </span>
                  <span className="NumberContent text-center bgcolor_grey">
                    0
                  </span>
                  <span className="NumberContent text-center bgcolor_grey">
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button
              className="w-100 btn LoginBtn"
              onClick={() => navigate("/",{state:location.state})}
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="text-center my-5">
            <p className="d-inline-block ms-2 Accept-Text">
              <span className="color_grey">Didn’t recieve OTP? </span>
              <a className="color_Theme text-decoration-none cursorPointer fw-bold SendAgainBtn">
                Send again
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
