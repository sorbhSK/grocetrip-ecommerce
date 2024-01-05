import React, { useEffect, useState } from "react";

const CommonPopup = ({ option }) => {
  const blankData = { name: "", image: "" };
  const [formInput, setFormInput] = useState(blankData);
  const createData = async (e) => {
    e.preventDefault();
    const url =
      option === "Brands"
        ? "http://localhost:5000/brand"
        : "http://localhost:5000/category";
    const formData = new FormData();
    formData.append("name", formInput.name);
    formData.append("image", formInput.image);
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    window.location.reload();
    // console.log(result);
  };

  return (
    <div>
      <div>
        {/* The Modal */}
        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <form onSubmit={createData}>
                <div className="modal-header">
                  <h4 className="modal-title fw-bold">
                    Add {option === "Brands" ? "Brand" : "Category"}
                  </h4>
                </div>
                {/* Modal body */}
                <div className="modal-body">
                  <div>
                    <div className="mb-3 mt-3">
                      <label htmlFor="brand" className="form-label">
                        {option === "Brands" ? "Brand" : "Category"} Name{" "}
                        <span className="fw-bold" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control formHandle"
                        id="brand"
                        placeholder={`${
                          option === "Brands" ? "Brand" : "Category"
                        } Name`}
                        name="name"
                        onChange={(e) => {
                          setFormInput((val) => ({
                            ...val,
                            name: e.target.value,
                          }));
                        }}
                        value={formInput.name}
                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <div>
                        {option === "Brands"
                          ? " Big Logo Upload"
                          : "Image Upload"}
                      </div>
                      <div className="FileUploadsection position-relative">
                        <label htmlFor="fileUpload" className="form-label">
                          <span className="EditIcon d-inline-block position-absolute cursorPointer">
                            <i className="fa-solid fa-pen"></i>
                          </span>
                        </label>
                      </div>
                      <input
                        type="file"
                        className="form-control "
                        id="fileUpload"
                        name="image"
                        onChange={(e) => {
                          setFormInput((val) => ({
                            ...val,
                            image: e.target.files[0],
                          }));
                        }}
                      />
                    </div>
                    <div className="">
                      <p className="color_Theme">
                        Please Select the image less than 2mb
                      </p>
                      <p className="color_grey">
                        Set the brand thumbnail image. Only *png,*jpg and *jpeg
                        image files are accepted
                      </p>
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light CloseBtn"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-success addBtn ">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPopup;
