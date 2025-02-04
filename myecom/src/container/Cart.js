import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListitem from "../components/ProductListitem";
import { modifyItem, removeItem } from "../redux/reducer/cart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const list = useSelector((state) => state.cart.list) || []; // Default to empty array
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const incrementItem = (item) => {
    dispatch(modifyItem({ ...item, count: (item.count || 1) + 1 })); // Ensure count exists
  };

  const decrementItem = (item) => {
    if ((item.count || 1) === 1) {
      dispatch(removeItem(item));
    } else {
      dispatch(modifyItem({ ...item, count: item.count - 1 }));
    }
  };

  const removeItemFromCart = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <>
      {list.length > 0 ? (
        <>
          {list.map((item) => ( // ✅ Fixed syntax: Wrapped map in `{}` inside JSX
            <ProductListitem
              {...item}
              key={item.id}
              incrementItem={() => incrementItem(item)}
              decrementItem={() => decrementItem(item)}
              removeItem={() => removeItemFromCart(item)}
            />
          ))}
          <button className="btn btn-success mt-3"onClick={()=>navigate('/checkout')}>Go to Checkout</button>
        </>
      ) : (
        <h3 className="mt-5 text-center text-danger">Your cart is empty</h3>
      )}
    </>
  );
}
