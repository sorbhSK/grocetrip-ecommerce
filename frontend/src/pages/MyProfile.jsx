import React, { useEffect, useState } from "react";
import photocamera from "../assets/images/photocamera.png";
const MyProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const emptyDetails = {
    name: "",
    email: "",
    address: "",
    phone: "",
    image: "",
  };
  const [formInput, setFormInput] = useState(emptyDetails);
  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch(`http://localhost:5000/getuser/${user._id}`);
      const result = await res.json();
      console.log(result);
      setUserDetails(result.data);
      const data = result.data;
      setFormInput({
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        image: data.image,
      });
    };
    getUserData();
  }, []);
  const user = JSON.parse(localStorage.getItem("userc"));
  const addingUserDetails = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formInput.name);
    formData.append("email", formInput.email);
    formData.append("address", formInput.address);
    formData.append("phone", formInput.phone);
    formData.append("image", formInput.image);
    const res = await fetch(
      `http://localhost:5000/adduserdetails/${user._id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const result = await res.json();
    console.log(result);
  };
  return (
    <div className="ProfileMain">
      <div className="container">
        <section>
          <form onSubmit={addingUserDetails}>
            <div className="ProfileInner my-5 mx-auto">
              <div className="d-flex justify-content-between ImageContainer">
                <div>
                  <h1 className="fw-bold ProfileHeading">My Profile</h1>
                </div>
                <div className="ProfileInputsContainer">
                  <div className="form-group">
                    {userDetails.image ? (
                      <label
                        htmlFor="fileInput"
                        className="profileFileLabelsForImage cursorPointer"
                      >
                        <img
                          src={`http://localhost:5000/images/${userDetails.image}`}
                        />
                      </label>
                    ) : (
                      <label
                        htmlFor="fileInput"
                        className="profileFileLabels cursorPointer"
                      >
                        <img src={photocamera} />
                      </label>
                    )}
                    <input
                      type="file"
                      className="form-control d-none "
                      placeholder="Enter your name"
                      id="fileInput"
                      name="image"
                      onChange={(e) =>
                        setFormInput((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.files[0],
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="ProfileInputsContainer">
                <div className="form-group">
                  <label htmlFor="name" className="profileLabels">
                    Name
                  </label>
                  <input
                    type="textt"
                    className="form-control profileInputs "
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    value={formInput.name}
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="ProfileInputsContainer">
                <div className="form-group">
                  <label htmlFor="email" className="profileLabels">
                    Email
                  </label>
                  <input
                    type="textt"
                    className="form-control profileInputs "
                    placeholder="Enter your Email"
                    id="email"
                    name="email"
                    value={formInput.email}
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="ProfileInputsContainer">
                <div className="form-group">
                  <label htmlFor="number" className="profileLabels">
                    Mobile Number
                  </label>
                  <input
                    type="textt"
                    className="form-control profileInputs "
                    placeholder="Enter your Mobile Number"
                    id="number"
                    name="phone"
                    value={formInput.phone}
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-end">
                <div className="ProfileInputsContainer">
                  <div className="form-group">
                    <label htmlFor="address" className="profileLabels">
                      Address
                    </label>
                    <textarea
                      type="textt"
                      className="form-control profileInputs "
                      placeholder="Enter your Address"
                      id="address"
                      rows="5"
                      name="address"
                      value={formInput.address}
                      onChange={(e) =>
                        setFormInput((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="ProfileInputsContainer">
                  <div className="text-end">
                    <button className="px-5 btn LoginBtn cursorPointer">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
