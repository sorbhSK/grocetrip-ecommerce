import React, { useEffect, useState } from "react";
import cartImg from "../assets/images/toothpaste.png";
import smallLogo from "../assets/images/smallLogo.png";
import emptycart from "../assets/images/emptycart.png";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  // const [brands, setBrands] = useState([]);
  const [brandImages, setBrandImages] = useState([]);
  const getData = async () => {
    //........... get cart ...................
    const checkProRes = await fetch(`http://localhost:5000/getcart`);
    const productResult = await checkProRes.json();
    const products = productResult.data;
    setProduct(products);
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
    <div className="CartMain">
      <Navbar />
      <div className="container">
        <div className="productList my-4">
          <h3 className="fw-bold">Cart</h3>
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
        {product.length === 0 ? null : (
          <div className="my-5">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-capitalize mb-2">total amount</p>
                <h3 className="fw-bold my-3">${CalculateTotal()}</h3>
              </div>
              <div>
                <button
                  className="px-5 btn LoginBtn cursorPointer"
                  onClick={() => navigate("/shoppinglist")}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
