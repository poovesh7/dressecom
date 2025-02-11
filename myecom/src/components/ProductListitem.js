import React from "react";

export default function ProductListItem({ image, name, price, size, count, incrementItem, decrementItem, removeItem }) {
  return (
    <div className="mt-5 d-flex justify-content-center align-items-center">
      {/* Product Image */}
      <div>
        <img
          src={image}
          height={150}
          width={180}
          alt={name} // Alt text for accessibility
          className="mt-3 rounded"
        />
      </div>

      {/* Product Details & Actions */}
      <div className="ms-4">
        <h5 className="mt-4">{name}</h5>
        <h6>Price: {`$${(price * count).toFixed(2)}`}</h6> {/* Update price dynamically */}
        <h6 className="size">{size}</h6>

        <div className="mt-3 d-flex align-items-center">
          {/* Increment Button */}
          <button className="btn btn-success" onClick={incrementItem}>
            +
          </button>

          {/* Quantity Display */}
          <span className="mx-3">Quantity: {count}</span>

          {/* Decrement Button */}
          <button className="btn btn-success" onClick={decrementItem} disabled={count <= 1}>
            -
          </button>
        </div>

        {/* Remove Button */}
        <button className="btn btn-danger mt-3" onClick={removeItem}>
          Remove
        </button>
      </div>
    </div>
  );
}
