import React, { useEffect, useState } from "react";

const AddProductCmp = ({ sideNavWidth }) => {
  const [productCategory, setProductCategory] = useState([]);
  const [productBrand, setProductBrand] = useState([]);
  const [brandsMainArr, setBrandsMainArr] = useState([]);
  const blankBrandsData = { brandname: "", price: "" };
  const [addBrandInput, setAddBrandInput] = useState(blankBrandsData);
  const [displayAddBrand, setDisplayAddBrand] = useState("none");
  const fetchData = async () => {
    //.......get Categories............
    const categoryRes = await fetch("http://localhost:5000/getcategories");
    const categoryResult = await categoryRes.json();
    setProductCategory(categoryResult.data);
    //.......get Brands............
    const BrandRes = await fetch("http://localhost:5000/getbrands");
    const BrandResult = await BrandRes.json();
    setProductBrand(BrandResult.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const createBrandArr = () => {
    if (addBrandInput.brandname !== "" && addBrandInput.price !== "") {
      setAddBrandInput((prev) => ({ ...prev, price: "" }));
      const arrToCreate = [...brandsMainArr];
      arrToCreate.push(addBrandInput);
      setBrandsMainArr(arrToCreate);
    } else {
      alert("Fill the required fields");
    }
  };
  const blankData = {
    title: "",
    category: "",
    bestSelling: false,
    exclusiveOffer: false,
    image: "",
    brands: [],
  };
  const [formInput, setFormInput] = useState(blankData);
  const ProductAdd = async (e) => {
    e.preventDefault();
    formInput.brands = brandsMainArr;
    console.log("formInput=", formInput);
    const formData = new FormData();
    formData.append("title", formInput.title);
    formData.append("category", formInput.category);
    formData.append("bestSelling", formInput.bestSelling);
    formData.append("exclusiveOffer", formInput.exclusiveOffer);
    formData.append("image", formInput.image);
    formData.append("brands", JSON.stringify(formInput.brands));
    const res = await fetch("http://localhost:5000/product", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="Main-Container Add-Product">
      <div
        className="Product-PopUp addTransition d-block"
        style={{ marginLeft: sideNavWidth }}
      >
        <div className="container-fluid Main_Inner">
          <div className="">
            <form onSubmit={ProductAdd}>
              <div className="">
                <div className="">
                  <div>
                    <div className="d-flex gap-4">
                      <div className="mb-3 mt-3 w-50">
                        <label htmlFor="title" className="form-label">
                          Title
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
                          id="title"
                          placeholder={`Enter Product Title`}
                          name="title"
                          value={formInput.title}
                          onChange={(e) =>
                            setFormInput((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="mb-3 mt-3 w-50">
                        <label htmlFor="category" className="form-label">
                          Select Category
                          <span
                            className="fw-bold px-1"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </label>
                        <select
                          className="form-select formHandle"
                          id="category"
                          name="category"
                          onChange={(e) =>
                            setFormInput((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                        >
                          <option value="">--Select Category--</option>
                          {productCategory.map((val, i) => (
                            <option key={i} value={val.name}>
                              {val.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="d-flex gap-4 my-2">
                      <div className="form-check w-50 p-0">
                        <label
                          htmlFor="bestSelling"
                          className="form-check-label"
                        >
                          Best Selling
                          <span
                            className="fw-bold px-1"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          className="form-check-input ms-3"
                          type="checkbox"
                          id="bestSelling"
                          name="bestSelling"
                          value="true"
                          onChange={(e) =>
                            setFormInput((prev) => ({
                              ...prev,
                              bestSelling: e.target.checked,
                            }))
                          }
                        />
                      </div>
                      <div className="form-check w-50 p-0">
                        <label
                          htmlFor="exclusiveOffer"
                          className="form-check-label"
                        >
                          Exclusive Offer
                          <span
                            className="fw-bold px-1"
                            style={{ color: "red" }}
                          >
                            *
                          </span>
                        </label>
                        <input
                          className="form-check-input ms-3"
                          type="checkbox"
                          id="exclusiveOffer"
                          name="exclusiveOffer"
                          value="true"
                          onChange={(e) =>
                            setFormInput((prev) => ({
                              ...prev,
                              exclusiveOffer: e.target.checked,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3 mt-3 position-relative">
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
                    <div className="mt-4 mb-1">
                      <a
                        className="btn btn-success addBtn"
                        onClick={() => setDisplayAddBrand("block")}
                      >
                        Add Brand
                      </a>
                    </div>
                    <div style={{ display: displayAddBrand }}>
                      <div className="d-flex gap-5 align-items-end">
                        <div className="mb-3 mt-3 w-25">
                          <label htmlFor="category" className="form-label">
                            Select Brand
                            <span
                              className="fw-bold px-1"
                              style={{ color: "red" }}
                            >
                              *
                            </span>
                          </label>
                          <select
                            className="form-select formHandle"
                            id="category"
                            name="category"
                            onChange={(e) =>
                              setAddBrandInput((prev) => ({
                                ...prev,
                                brandname: e.target.value,
                              }))
                            }
                          >
                            <option value="" defaultValue>
                              --Select Brand--
                            </option>
                            {productBrand.map((val, i) => (
                              <option key={i} value={val.name}>
                                {val.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 mt-3 w-25">
                          <input
                            type="text"
                            className="form-control formHandle"
                            id="Price"
                            placeholder={`Price`}
                            name="Price"
                            value={addBrandInput.price}
                            onChange={(e) =>
                              setAddBrandInput((prev) => ({
                                ...prev,
                                price: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mb-3 mt-3 w-25">
                          <a
                            onClick={createBrandArr}
                            className="btn btn-light CloseBtn"
                          >
                            Save
                          </a>
                        </div>
                      </div>

                      <div className="Added-Brands-Table mt-3 mx-0 w-50">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Brands</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {brandsMainArr.map((val, i) => (
                              <tr key={i}>
                                <td>{val.brandname}</td>
                                <td>{val.price} </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="my-3 d-flex gap-3">
                    <button type="button" className="btn btn-light CloseBtn">
                      Close
                    </button>
                    <button className="btn btn-success addBtn">Save</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductCmp;
