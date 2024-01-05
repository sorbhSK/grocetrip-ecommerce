import React, { useEffect, useState } from "react";
import emptycart from "../assets/images/emptycart.png";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const ShoppingList = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [product, setProduct] = useState([]);
  const [TotalProducts, setTotalProducts] = useState(0);
  const getData = async () => {
    //........... get cart ...................
    const checkProRes = await fetch(`http://localhost:5000/getcart`);
    const productResult = await checkProRes.json();
    const products = productResult.data;
    setProduct(products);

    const uniqueBrands = [];
    const uniqueBrandMain = products.reduce((acc, productOption) => {
      if (!uniqueBrands.includes(productOption.brandId._id)) {
        uniqueBrands.push(productOption.brandId._id);
        return [...acc, productOption];
      }
      return acc;
    }, []);

    setBrands([]);
    let OverAllProducts = 0;
    uniqueBrandMain.map((val,i) => {
      let priceCount = 0;
      const filteredProducts = products.filter((product) => {
        if (val.brandId.name === product.brandId.name) {
          priceCount += product.price * product.quantity;
          return product.price;
        }
      });
      setBrands((prev) => [
        ...prev,
        {
          brandInfo: val.brandId,
          totalPrice: priceCount,
          totalProducts: filteredProducts.length,
        },
      ]);
      OverAllProducts += filteredProducts.length
      setTotalProducts(OverAllProducts)
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const ChangesToCart = async (CartproductId, action) => {
    const productQuanToChange = product.find((val) => val._id == CartproductId);
    let QuanToChng = productQuanToChange.quantity;
    let changesInQuantity;
    if (action === "increment") {
      changesInQuantity = QuanToChng + 1;
    } else if (action === "decrement" && QuanToChng > 1) {
      changesInQuantity = QuanToChng - 1;
    } else {
      await fetch(`http://localhost:5000/removecart/${CartproductId}`, {
        method: "DELETE",
      });
    }
    const body = JSON.stringify({ quantity: changesInQuantity });
    const res = await fetch(`http://localhost:5000/editcart/${CartproductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    getData();
  };

  const CalculateTotal = () => {
    let totalAmountToCalculate = 0;
    product.forEach(
      (val) => (totalAmountToCalculate += val.quantity * val.price)
    );
    return totalAmountToCalculate.toFixed(2);
  };


  return (
    <div className="ShoppingList">
      <Navbar />

      <div className="container">
        <div className="d-flex justify-content-between mt-5  align-items-center">
        <h2 className="fw-bold ">Shopping List</h2>
        <h5 className="fw-bold">5/{TotalProducts}</h5>
        </div>
        <div className="SuperketsMain">
          <div className="">
            <div className="">
              {brands.length === 0 ? (
                <div> No Items in shopping List </div>
              ) : (
                brands.map((val, key) => (
                  <div
                    className="Supermarkets d-flex justify-content-between p-4 mx-auto my-4 py-4 cursorPointer"
                    key={key}
                  >
                    <div className="Supermarkets_Inner w-50">
                      <img
                        src={`http://localhost:5000/images/${val.brandInfo.image}`}
                      />
                    </div>
                    <div className="Supermarkets_Inner">${val.totalPrice}</div>
                    <div className="Supermarkets_Inner text-center">2/{val.totalProducts}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div>
          <button
            className="px-5 btn LoginBtn mt-3 w-50 cursorPointer"
            onClick={() => navigate("/shoppinglist")}
          >
            Start Navigation
          </button>
        </div>
        <div className="productList my-5">
          <div className="d-flex justify-content-between">
            <h3 className="fw-bold">All Products</h3>
            <h3 className="color_green fw-bold">${CalculateTotal()}</h3>
          </div>
          {product.length === 0 ? (
            <div className="text-center">
              <img src={emptycart} className="my-5" />
            </div>
          ) : (
            product.map((val, key) => (
              <div className="CartInner my-4 p-4 " key={key}>
                <div className="d-flex align-items-center gap-4">
                  <div className="cartImage text-center">
                    <img
                      src={`http://localhost:5000/images/${val.productId.image}`}
                    />
                  </div>
                  <div>
                    <h4 className="fw-bold">{val.productId.title}</h4>
                    <p className="color_grey py-3 w-75">
                      Lorem ipsum dolor sit met consectetur adipiscing elit sed
                      do eiusmod tempor incididunt ut labore
                    </p>
                    <div className="d-flex align-items-center w-75 justify-content-between gap-2">
                      <img
                        src={`http://localhost:5000/images/${val.brandId.image}`}
                      />
                      <span className="fw-bold color_green ProductsPrice">
                        ${val.price}
                      </span>
                      <div className="addBtnMain w-50">
                        <a
                          className="btn addBtn"
                          onClick={() => ChangesToCart(val._id, "decrement")}
                        >
                          -
                        </a>
                        <span className="mx-2 cartCount">{val.quantity}</span>
                        <a
                          className="btn addBtn"
                          onClick={() => ChangesToCart(val._id, "increment")}
                        >
                          +
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
