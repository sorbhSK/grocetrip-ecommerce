import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LogoImg from "../assets/images/logo.png";
import likeImg from "../assets/images/like.png";
import favourite from "../assets/images/favourite.png";
import Navbar from "../components/Navbar";
import MapContainer from "../components/MapContainer";

const Home = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedInfo, setSearchedInfo] = useState({
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });
  const [categories, setCategories] = useState([]);
  const [exclusiveProducts, setExclusiveProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("userc"));
  const userId = user ? user._id : "";
  const userFav = user ? user?.favourites : "";
  const [favouriteProductsId, setFavouriteProductsId] = useState(userFav);

  const getData = async () => {
    //.............get User ..........
    const userRes = await fetch(`http://localhost:5000/getuser/${userId}`);
    const userResult = await userRes.json();
    localStorage.setItem("userc", JSON.stringify(userResult.data));

    //.............get Brands..........
    const BrandsResponse = await fetch("http://localhost:5000/getbrands");
    const resultedBrands = await BrandsResponse.json();
    setBrands(resultedBrands.data);

    //.............get Categories..........
    const CategoriesResponse = await fetch(
      "http://localhost:5000/getcategories"
    );
    const resultedCategories = await CategoriesResponse.json();
    setCategories(resultedCategories.data);

    //.............get exclusiveOffer Products..........
    const exclusiveRes = await fetch(
      "http://localhost:5000/getproducts?exclusiveOffer=true"
    );
    const exclusiveOfferProducts = await exclusiveRes.json();
    setExclusiveProducts(exclusiveOfferProducts.data);

    //.............get BestSelling Products..........
    const bestSellRes = await fetch(
      "http://localhost:5000/getproducts?bestSelling=true"
    );
    const bestSellProducts = await bestSellRes.json();
    setBestSellerProducts(bestSellProducts.data);
  };
  // console.log("ex=",exclusiveProducts)
  useEffect(() => {
    if (user) {
      getData();
    } else {
      navigate("/login");
    }
  }, []);

  const addToFavourite = async (productId) => {
    let favArr = favouriteProductsId;
    const favArrCopy = [...favArr];
    const arrItem = favArrCopy.find((val) => productId === val);
    if (arrItem) {
      const favAlteredArr = favArr.filter((val) => val !== productId);
      setFavouriteProductsId(favAlteredArr);
    } else {
      favArr.push(productId);
      setFavouriteProductsId(favArr);
    }
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
    getData();
  };

  const isProductInFavourites = (favIdToCheck) => {
    return favouriteProductsId.includes(favIdToCheck);
  };
  const getbrandImg = (brandName) => {
    return brands.find((val) => val.name === brandName).image;
  };

  return (
    <div className="MainHome">
      <Navbar />
      <div className="container">
        <header>
          <div className="text-center">
            <img src={LogoImg} />
            <p className="my-2">
              <i className="fa-solid fa-location-dot color_Theme p-2"></i>
              <span className="fw-bold">
                {searchedInfo.city ? `${searchedInfo.city},` : ""}
                {searchedInfo.state ? `${searchedInfo.state},` : ""}
                {searchedInfo.country}
                {/* {console.log("object", searchedInfo)} */}
              </span>
              <i className="fa-solid fa-angle-down color_Theme p-2"></i>
            </p>
          </div>
        </header>
        <div className="text-center mb-5">
          <div className="MapClass bgcolor_grey mt-4">
            <MapContainer
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              setSearchedInfo={setSearchedInfo}
            />
          </div>
        </div>
        <section>
          <div className="SuperMarkets mb-5">
            <div className="d-flex justify-content-between my-3">
              <span className="fw-bold sectionsHeading my-3">Supermarkets</span>
            </div>
            <div className="text-nowrap">
              <div className="d-flex flex-wrap gap-4">
                {brands.map((val, key) => (
                  <div className="d-table" key={key}>
                    <div className="BrandsMain align-middle d-table-cell">
                      <img src={`http://localhost:5000/images/${val.image}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="Categories my-5">
            <div className="d-flex justify-content-between my-3">
              <span className="fw-bold sectionsHeading my-3">Categories</span>
            </div>
            <div className="categoryMain">
              <div className="d-flex flex-wrap">
                {categories.map((val, key) => (
                  <div key={key}>
                    <div className="categoryInner">
                      <img src={`http://localhost:5000/images/${val.image}`} />
                      <span className="ms-4">{val.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="ExclusiveOffer my-5">
            <div className="d-flex justify-content-between my-3">
              <span className="fw-bold sectionsHeading my-3">
                Exclusive offer
              </span>
            </div>
            <div className="ProductMain">
              <div className="d-flex flex-wrap">
                {exclusiveProducts.length == 0 ? (
                  <h2 className="mx-auto text-secondary">
                    No Products available
                  </h2>
                ) : (
                  exclusiveProducts.map((val, key) => (
                    <div
                      className="productInner addTransition position-relative cursorPointer"
                      key={key}
                    >
                      <div
                        onClick={() =>
                          navigate("/productdetails", {
                            state: { productId: val._id },
                          })
                        }
                      >
                        <div>
                          <div className="product-Imgs d-table mx-auto mb-4">
                            <div className="d-table-cell align-middle">
                              <img
                                src={`http://localhost:5000/images/${val.image}`}
                              />
                            </div>
                          </div>
                          <div>
                            <span className="fw-bold">{val.title}</span>
                            <p className="color_grey product_desc my-2">
                              Lorem ipsum dolor sit amet consectetur adipiscing
                              elit sed
                            </p>
                            <div className="d-flex align-items-center gap-4">
                              <img
                                src={`http://localhost:5000/images/${getbrandImg(
                                  JSON.parse(val.brands)[0].brandname
                                )}`}
                              />
                              <span className="fw-bold color_green">
                                ${JSON.parse(val.brands)[0].price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isProductInFavourites(val._id) ? (
                        <img
                          src={favourite}
                          className="cursorPointer LikeImg position-absolute"
                          onClick={() => addToFavourite(val._id)}
                        />
                      ) : (
                        <img
                          src={likeImg}
                          className="cursorPointer LikeImg position-absolute"
                          onClick={() => addToFavourite(val._id)}
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="ExclusiveOffer my-5">
            <div className="d-flex justify-content-between my-3">
              <span className="fw-bold sectionsHeading my-3">Best selling</span>
            </div>
            <div className="ProductMain">
              <div className="d-flex flex-wrap">
                {bestSellerProducts.length == 0 ? (
                  <h2 className="mx-auto text-secondary">
                    No Products available
                  </h2>
                ) : (
                  bestSellerProducts.map((val, key) => (
                    <div
                      className="productInner addTransition position-relative cursorPointer"
                      key={key}
                    >
                      <div
                        onClick={() =>
                          navigate("/productdetails", {
                            state: { productId: val._id },
                          })
                        }
                      >
                        <div>
                          <div className="product-Imgs d-table mx-auto mb-4">
                            <div className="d-table-cell align-middle">
                              <img
                                src={`http://localhost:5000/images/${val.image}`}
                              />
                            </div>
                          </div>
                          <div>
                            <span className="fw-bold">{val.title}</span>
                            <p className="color_grey product_desc my-2">
                              Lorem ipsum dolor sit amet consectetur adipiscing
                              elit sed
                            </p>
                            <div className="d-flex align-items-center gap-4">
                              <img
                                src={`http://localhost:5000/images/${getbrandImg(
                                  JSON.parse(val.brands)[0].brandname
                                )}`}
                              />
                              <span className="fw-bold color_green">
                                ${JSON.parse(val.brands)[0].price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isProductInFavourites(val._id) ? (
                        <img
                          src={favourite}
                          className="cursorPointer LikeImg position-absolute"
                          onClick={() => addToFavourite(val._id)}
                        />
                      ) : (
                        <img
                          src={likeImg}
                          className="cursorPointer LikeImg position-absolute"
                          onClick={() => addToFavourite(val._id)}
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
