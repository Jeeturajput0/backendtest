import React, { useEffect, useState } from "react";
import { API_URI } from "../../config";

const Mainhome = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch(`${API_URI}/product?is_active=true`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      const resData = await res.json();
      setProducts(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return <>{products}</>;
};

export default Mainhome;
