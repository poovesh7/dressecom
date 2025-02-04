import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductListitem from "../components/ProductListitem";
import { useNavigate, useParams } from "react-router-dom";
import ProductList from "../data/ProductList";

export default function Checkout() {
  const params = useParams();
  const list = useSelector((state) => state.cart.list) || [];

  // Corrected state initialization logic
  const [state, setState] = useState(
    params.id
      ? [
          {
            ...ProductList.find((element) => element.id === parseInt(params.id)),
            count: 1,
          },
        ]
      : list // Use `list` as fallback
  );

  const navigate = useNavigate();

  // Increment item count
  const incrementItem = (item) => {
    const index = state.findIndex((product) => product.id === item.id);
    
    if (index !== -1) {
      setState((prevState) => [
        ...prevState.slice(0, index),
        { ...prevState[index], count: prevState[index].count + 1 }, // Update the count
        ...prevState.slice(index + 1),
      ]);
    }
  };

  // Decrement item count
  const decrementItem = (item) => {
    if ((item.count || 1) === 1) {
      removeItemFromCart(item);
    } else {
      const index = state.findIndex((product) => product.id === item.id);

      if (index !== -1) {
        setState((prevState) => [
          ...prevState.slice(0, index),
          { ...prevState[index], count: prevState[index].count - 1 }, // Decrement the count
          ...prevState.slice(index + 1),
        ]);
      }
    }
  };

  // Remove item from cart
  const removeItemFromCart = (item) => {
    const index = state.findIndex((product) => product.id === item.id);

    if (index !== -1) {
      setState((prevState) => [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1),
      ]);
    }
  };

  return (
    <>
      {state.length > 0 ? (
        <>
          {state.map((item) => (
            <ProductListitem
              {...item}
              key={item.id}
              incrementItem={() => incrementItem(item)}
              decrementItem={() => decrementItem(item)}
              removeItem={() => removeItemFromCart(item)}
            />
          ))}
          <button className="btn btn-success mt-3" onClick={() => navigate("/success")}>
            Place Order
          </button>
        </>
      ) : (
        <h3 className="mt-5 text-center text-danger">Your cart is empty</h3>
      )}
    </>
  );
}
