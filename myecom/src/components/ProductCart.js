import React from "react";
import { useNavigate } from "react-router-dom";



export default function ProductCart({ id, image, name, price, size }) {
  const navigate = useNavigate();

  return (
    <div
      className="card m-3 border border-2 border-success shadow-sm transition mt-5"
      style={{
        width: "200",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      role="button"
      onClick={() => navigate(`/product/${id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Product Image */}
      <img
        src={image}
        height={150}
        width={180}
        alt={name} // Alt text for accessibility
        className="m-2 rounded"
      />

      {/* Product Details */}
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
        <h6>Price: {`$${price}`}</h6>
        <h6 className="card-size">{size}</h6>
      </div>
    </div>
  );
}
