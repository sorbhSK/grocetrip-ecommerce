import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import likeImg from "../assets/images/like.png";
import favourite from "../assets/images/favourite.png";
import cart from "../assets/images/cart.png";

const ProductDetails = () => {
  // const user = useSelector(state=>state.user)
  // const user = useSelector(state=>state.User.Auth)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userc"));
  const location = useLocation();
  const productId = location.state.productId;
  const userId = user._id;
  const [product, setProduct] = useState({});
  const [checkProduct, setCheckProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [originalBrandArr, setOriginalBrandArr] = useState([]);
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const [favouriteProductsId, setFavouriteProductsId] = useState(
    user.favourites
  );

  useEffect(() => {
    const getData = async () => {
      try {
        //........... Check Product In Cart ...................
        const checkProRes = await fetch(`http://localhost:5000/getcart`);
        const productResult = await checkProRes.json();
        const CheckProductResult = productResult.data.find(
          (val) => val.productId._id == productId
        );
        CheckProductResult ? setCheckProduct(true) : setCheckProduct(false);

        //.............get Products..........
        const res = await fetch(
          `http://localhost:5000/productinfo/${productId}`
        );
        const result = await res.json();
        setProduct(result.data);
        const productBrands = JSON.parse(result.data.brands);
        // console.log("productBrands=", productBrands);

        //.............get original Brands..........
        const Brandsres = await fetch(`http://localhost:5000/getbrands`);
        const Brandsresult = await Brandsres.json();
        const BrandsMain = Brandsresult.data;
          setOriginalBrandArr(BrandsMain)
        // Map and update the product brands array
        const newBrandsArray = productBrands.map((productBrand) => {
          const matchingBrand = BrandsMain.find(
            (originalBrand) => originalBrand.name === productBrand.brandname
          );
          return {
            ...productBrand,
            brandImg: matchingBrand ? matchingBrand.image : null,
          };
        });
        setBrands(newBrandsArray);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getData();
  }, [productId]);

  const addToCart = async () => {
    try {
      const ActivebrandName = originalBrandArr.find(val=>val.name=== brands[activeBrandIndex].brandname )
      const body = {
        productId: product._id,
        userId: userId,
        brandId:ActivebrandName._id,
        price: brands[activeBrandIndex].price,
        quantity: 1,
      };
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await res.json()
      console.log(result)
      if (res.status) setCheckProduct(true);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const addToFavourite = async () => {
    let favArr = favouriteProductsId;
    const favArrCopy = [...favArr];
    const arrItem = favArrCopy.find((val) => productId === val);
    arrItem ? favArr : favArr.push(productId);
    setFavouriteProductsId(favArr);
    const body = JSON.stringify({ favourites: favArr });
    const res = await fetch(`http://localhost:5000/addfavourite/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const result = await res.json();
    console.log("result=", result);
  };
  const isProductInFavourites = (favIdToCheck) => {
    return favouriteProductsId.includes(favIdToCheck);
  };

  return (
    <div className="SuperketsMain my-5">
      <div className="container">
        <div className="ProductDetails-Upper w-50 text-center">
          <div className="d-flex justify-content-between">
            <h2 className="fw-bold my-3">
              {brands.length === 0 ? "" : brands[activeBrandIndex].brandname}
            </h2>
            <img
              src={`http://localhost:5000/images/${product.image}`}
              style={{ width: "80px" }}
            />
            <div className="my-3">
              {/* <a onClick={addToFavourite}>
                <img src={Heart} className="cursorPointer" />
              </a> */}
              {isProductInFavourites(product._id) ? (
                <img
                  src={favourite}
                  className="cursorPointer"
                  onClick={() => addToFavourite(product._id)}
                />
              ) : (
                <img
                  src={likeImg}
                  className="cursorPointer"
                  onClick={() => addToFavourite(product._id)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="my-5">
          <h3 className="fw-bold">{product.title}</h3>
          <span className="fw-bold color_green">
            ${brands.length === 0 ? "" : brands[activeBrandIndex].price}
          </span>
          <p className="my-4 color_grey w-75 productDetail">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="w-50">
          {brands.length === 0
            ? ""
            : brands.map((val, i) => (
                <div
                  className="OtherSuperMarkets d-flex justify-content-between align-items-center cursorPointer py-3 px-2 "
                  key={i}
                  onClick={() => setActiveBrandIndex(i)}
                >
                  <img src={`http://localhost:5000/images/${val.brandImg}`} />
                  <span className="fw-bold color_green">${val.price}</span>
                </div>
              ))}
        </div>
        <div className="ProductLocation my-5">
          <h2 className="fw-bold">Location</h2>
          <div className="MapClass bgcolor_grey my-4"></div>
        </div>
        <div className="d-flex gap-5">
          <button
            className="px-5 btn LoginBtn cursorPointer"
            disabled={checkProduct}
            onClick={addToCart}
          >
            {!checkProduct ? "Add to cart" : "Added to Cart"}
          </button>
          <button
            className="px-5 btn LoginBtn GoToCartBtn cursorPointer"
            onClick={() => navigate("/cart")}
          >
            <img src={cart} className="cursorPointer pe-2" />
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
