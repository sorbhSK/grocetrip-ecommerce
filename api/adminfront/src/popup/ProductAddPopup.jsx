import React from "react";

const ProductAddPopup = ({ option }) => {
  return (
    <div>
      <div className="Product-PopUp">
        {/* The Modal */}
        <div className="modal fade" id="myModal">
          <div className="modal-dialog  modal-xl">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title fw-bold">Add Product</h4>
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <div>
                  <div className="d-flex gap-4">
                    <div className="mb-3 mt-3 w-50">
                      <label htmlFor="brand" className="form-label">
                        Title
                        <span className="fw-bold px-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control formHandle"
                        id="brand"
                        placeholder={`Enter Product Title`}
                        name="brand"
                      />
                    </div>
                    <div className="mb-3 mt-3 w-50">
                      <label htmlFor="brand" className="form-label">
                        Select Category
                        <span className="fw-bold px-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <select className="form-select formHandle">
                        <option value="">--Select Category--</option>
                        <option value="Apple">Apple</option>
                        <option value="Mango">Mango</option>
                        <option value="Banana">Banana</option>
                        <option value="Avocado">Avocado</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex gap-4 my-2">
                    <div className="form-check w-50 p-0">
                      <label htmlFor="brand" className="form-check-label">
                        Best Selling
                        <span className="fw-bold px-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <input
                        className="form-check-input ms-3"
                        type="checkbox"
                        id="check1"
                        name="option1"
                        defaultValue="something"
                      />
                    </div>
                    <div className="form-check w-50 p-0">
                      <label htmlFor="brand" className="form-check-label">
                        Exclusive Offer
                        <span className="fw-bold px-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <input
                        className="form-check-input ms-3"
                        type="checkbox"
                        id="check2"
                        name="option2"
                        defaultValue="something"
                      />
                    </div>
                  </div>
                  <div className="mb-3 mt-3">
                    <div>Image Upload</div>
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
                  <div className="mt-4 mb-1">
                    <a className="btn btn-success addBtn ">Add Brand</a>
                  </div>
                  <div className="d-flex gap-4">
                    <div className="mb-3 mt-3 w-25">
                      <input
                        type="text"
                        className="form-control formHandle"
                        id="brand"
                        placeholder={`Brand Name`}
                        name="brand"
                      />
                    </div>
                    <div className="mb-3 mt-3 w-25">
                      <input
                        type="text"
                        className="form-control formHandle"
                        id="Price"
                        placeholder={`Price`}
                        name="Price"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="modal-footer">
                <div className="my-3 d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-light CloseBtn"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <a className="btn btn-success addBtn ">Save</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddPopup;
