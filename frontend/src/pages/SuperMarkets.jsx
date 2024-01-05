import  { useEffect, useState } from "react";

const SuperMarkets = () => {
  const [brands, setBrands] = useState([]);
  const getData = async () => {
    //.............get Brands..........
    const BrandsResponse = await fetch("http://localhost:5000/getbrands");
    const resultedBrands = await BrandsResponse.json();
    setBrands(resultedBrands.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="SuperketsMain">
      <div className="container">
        <div className="">
          <div className="w-75 mx-auto my-4">
            <h3 className="w-50 mx-auto fw-bold">Supermarkets</h3>
            {brands.map((val, key) => (
              <div className="Supermarkets text-center mx-auto w-50 my-4 py-4 cursorPointer" key={key}>
                <img src={`http://localhost:5000/images/${val.image}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperMarkets;
