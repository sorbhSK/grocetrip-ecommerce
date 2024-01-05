import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import favourite from "../assets/images/favourite.png";
import Navbar from "../components/Navbar";

const Favourite = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userc"));
  const favProducts = user.favourites;
  const userId = user._id;
  const [favouriteProducts, setfavouriteProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  //.............get Favourite Products..........
  const getData = async () => {
    //.............get Brands..........
    const BrandsResponse = await fetch("http://localhost:5000/getbrands");
    const resultedBrands = await BrandsResponse.json();
    setBrands(resultedBrands.data);

    //.............get User ..........
    const userRes = await fetch(`http://localhost:5000/getuser/${userId}`);
    const userResult = await userRes.json();
    localStorage.setItem("userc", JSON.stringify(userResult.data));

    const favouritesQueryString = favProducts
      .map((id) => `favourites=${id}`)
      .join("&");
      const url =
      favProducts.length === 0
      ? "http://localhost:5000/getproducts/?favourites"
      : `http://localhost:5000/getproducts/?${favouritesQueryString}`;
      const res = await fetch(url); 
      const result = await res.json();
    setfavouriteProducts(result.data);

  };
  useEffect(() => {
    getData();
  }, [favouriteProducts]);
  const addToFavourite = async (productId) => {
    let favArr = [...user.favourites];
    const favAlteredArr = favArr.filter((val)=>val !== productId)
    const body = JSON.stringify({ favourites: favAlteredArr });
    const res = await fetch(`http://localhost:5000/addfavourite/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    const result = await res.json();
    // getData()
  };

  const getbrandImg = (brandName) => {
    return brands.find((val) => val.name === brandName).image;
  };

  return (
    <div className="MainHome">
      <Navbar />
      <div className="container">
        <section>
          <div className="ExclusiveOffer my-5">
            <div className="d-flex justify-content-between my-3">
              <span className="fw-bold sectionsHeading my-3">Favourite</span>
            </div>
            <div className="ProductMain">
              <div className="d-flex flex-wrap">
                {favouriteProducts.length == 0 ? (
                  <h2 className="mx-auto text-secondary">
                    No Products available
                  </h2>
                ) : (
                  favouriteProducts.map((val, key) => (
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
                      <img
                        src={favourite}
                        className="cursorPointer LikeImg position-absolute"
                        onClick={() => addToFavourite(val._id)}
                      />
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

export default Favourite;
