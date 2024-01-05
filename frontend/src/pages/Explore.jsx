import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Explore = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:5000/getcategories`);
      const result = await res.json();
      setCategories(result.data);
    };
    getData();
  }, []);
  return (
    <div className="MainCategory">
      <Navbar />
      <div className="container">
        <div className="w-75 ">
          <h2 className="my-5 fw-bold">Explore</h2>
          <div className="ms-2">
            {categories.map((val, key) => (
              <div key={key} className="categoryInner categoryInnerBg my-4">
                <div className="d-flex align-items-center gap-4">
                  <div className="cursorPointer">
                    <img src={`http://localhost:5000/images/${val.image}`} />
                  </div>
                  <div>
                    <h3 className="fw-bold cursorPointer">{val.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
