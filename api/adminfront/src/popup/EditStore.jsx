import React, { useEffect, useState } from "react";
import MapContainer from "./MapContainer";

const EditStore = ({dataId}) => {
  const [searchValue, setSearchValue] = useState("");
  const blankData = {
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  };
  const [formData, setFormData] = useState(blankData);
  const getData = async()=>{
    if (dataId !== null) {
      const res = await fetch(`http://localhost:5000/storeinfo/${dataId}`);
      const result = await res.json();
      setFormData({
        name: result.name,
        address: result.address,
        city: result.city,
        state: result.state,
        zipcode: result.zipcode,
        country: result.country,
      })
    }
  }
  useEffect(()=>{
    getData();
  },[dataId])
  const updateFormFields = (values) => {
    // Update the form fields with the provided values
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
  };
  const HandleFormData = async(e) => {
    e.preventDefault();
    console.log(formData)
    const body = JSON.stringify(formData)
    const res = await fetch(`http://localhost:5000/editstore/${dataId}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:body
    })
    const result = await res.json();
    console.log(result)
    window.location.reload();

  };
  return (
    <div>
      <div className="StoreAddPopup-PopUp">
        {/* The Modal */}
        <div className="modal fade" id="myEditModal">
          <div className="modal-dialog  modal-xl">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title fw-bold">Edit Store</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <div>
                  <div className="row">
                    <div className="col-4">
                      <form onSubmit={HandleFormData}>
                        <div className="mb-3 mt-3 w-100">
                          <label htmlFor="name" className="form-label">
                            Store Name
                            <span
                              className="fw-bold px-1"
                              style={{ color: "red" }}
                            >
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control formHandle"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mb-3 mt-3 w-100">
                          <label htmlFor="address" className="form-label">
                            Address
                            <span
                              className="fw-bold px-1"
                              style={{ color: "red" }}
                            >
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control formHandle"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mb-3 mt-3 w-100">
                          <label htmlFor="city" className="form-label">
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control formHandle"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                city: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mb-3 mt-3 w-100">
                          <label htmlFor="state" className="form-label">
                            State
                          </label>
                          <input
                            type="text"
                            className="form-control formHandle"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                state: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mb-3 mt-3 w-100">
                          <label htmlFor="zipcode" className="form-label">
                            Zipcode
                          </label>
                          <input
                            type="text"
                            className="form-control formHandle"
                            id="zipcode"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                zipcode: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mb-3 mt-3 w-100">
                          <label htmlFor="country" className="form-label">
                            Country
                          </label>
                          <input
                            type="text"
                            className="form-control formHandle"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                country: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="">
                          <button
                            className="btn btn-success addBtn SubmitBtn"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-8">
                      <MapContainer
                        updateFormFields={updateFormFields}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}
                      />

                    </div>
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStore;
