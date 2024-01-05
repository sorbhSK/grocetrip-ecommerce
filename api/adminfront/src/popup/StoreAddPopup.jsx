import React, { useState, useEffect } from "react";
import MapContainer from "./MapContainer";

const StoreAddPopup = () => {
  const [searchValue, setSearchValue] = useState("");
  const blankData = {
    name: "",
    address: "",
    city: "",
    countrystate: "",
    zipcode: "",
    country: "",
  };
  const [formData, setFormData] = useState(blankData);
  const updateFormFields = async (values) => {
    // console.log("fields=", values);
    const addressComponents = values.place.address_components;
    let city, state, zipcode, country;
    setFormData((prev) => ({
      ...prev,
      address: values.place.formatted_address,
    }));
    for (const component of addressComponents) {
      if (component.types.includes("locality")) {
        city = component.long_name;
        setFormData((prev) => ({
          ...prev,
          city: city,
        }));
      } else if (component.types.includes("administrative_area_level_1")) {
        state = component.long_name;
        setFormData((prev) => ({
          ...prev,
          state: state,
        }));
      } else if (component.types.includes("country")) {
        country = component.long_name;
        setFormData((prev) => ({
          ...prev,
          country: country,
        }));
      }
    }
  };
  const HandleFormData = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(formData);
    const res = await fetch("http://localhost:5000/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const result = await res.json();
    console.log(result);
    window.location.reload();
  };

  return (
    <div>
      <div className="StoreAddPopup-PopUp">
        {/* The Modal */}
        <div className="modal fade" id="myModal">
          <div className="modal-dialog  modal-xl">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title fw-bold">Add Store</h4>
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

export default StoreAddPopup;
