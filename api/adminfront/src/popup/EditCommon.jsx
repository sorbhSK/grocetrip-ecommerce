import React, { useEffect, useState } from "react";

const EditCommon = ({ option, dataId }) => {
  const [editFormInput, setEditFormInput] = useState({
    nametoEdit: "",
    imagetoEdit: "",
  });
  const getData = async () => {
    if (dataId !== null) {
      const url =
        option === "Brands"
          ? `http://localhost:5000/brandinfo/${dataId}`
          : `http://localhost:5000/categoryinfo/${dataId}`;
      const res = await fetch(url);
      const result = await res.json();
      // console.log("result=", result);
      setEditFormInput({ nametoEdit: result.name, imagetoEdit: result.image });
    }
  };
  useEffect(() => {
    getData();
  }, [dataId]);

  const createEditData = async (e) => {
    e.preventDefault();
    const url =
      option === "Brands"
        ? `http://localhost:5000/editbrand/${dataId}`
        : `http://localhost:5000/editcategory/${dataId}`;
    const formData = new FormData();
    formData.append("name", editFormInput.nametoEdit);
    formData.append("image", editFormInput.imagetoEdit);
    console.log(editFormInput);
    const res = await fetch(url, {
      method: "PUT",
      body: formData,
    });
    const result = await res.json();
    window.location.reload();
    console.log(result);
  };

  return (
    <div>
      <div>
        {/* The Modal */}
        <div className="modal fade" id="myEditModal">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <form onSubmit={createEditData}>
                <div className="modal-header">
                  <h4 className="modal-title fw-bold">
                    Edit {option === "Brands" ? "Brand" : "Category"}
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
                        name="nametoEdit"
                        onChange={(e) => {
                          setEditFormInput((val) => ({
                            ...val,
                            nametoEdit: e.target.value,
                          }));
                        }}
                        value={editFormInput.nametoEdit}
                      />
                    </div>
                    <div className="mb-3 mt-3">
                      <div>
                        {option === "Brands"
                          ? " Big Logo Upload"
                          : "Image Upload"}
                      </div>
                      <div className="FileUploadsection position-relative">
                        {editFormInput.imagetoEdit != "" ? (
                          <img
                            className="w-100 h-100"
                            src={`http://localhost:5000/images/${editFormInput.imagetoEdit}`}
                          />
                        ) : (
                          ""
                        )}

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
                        name="imagetoEdit"
                        onChange={(e) => {
                          setEditFormInput((val) => ({
                            ...val,
                            imagetoEdit: e.target.files[0],
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

export default EditCommon;
