import React, { useEffect, useState } from "react";
import ProductList from "../data/ProductList";
import ProductCart from "../components/ProductCart";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [product, setProduct] = useState([]);
  const list = useSelector((state) => state.product?.category) || "";

  useEffect(() => {
    if (!Array.isArray(ProductList)) return; // Ensure ProductList is an array

    const filteredProducts =
      list === "" ? ProductList : ProductList.filter((item) => item.category === list);
    
    setProduct(filteredProducts);
  }, [list]); // Depend on `list` to update the product list when category changes.

  return (
    <div className="d-flex flex-wrap justify-content-center p-3">
      {product.length > 0 ? (
        product.map((item) => <ProductCart {...item} key={item.id} />)
      ) : (
        <p className="text-center">No products found.</p>
      )}
    </div>
  );
}
