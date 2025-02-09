import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/reducer/cart"; // Ensure correct path
import ProductList from "../data/ProductList"; // Ensure correct path

export default function Product() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.cart.list); // ✅ Hook is at the top level

  const props = ProductList.find(
    (element) => element.id === parseInt(params.id)
  );

  const [alert, setAlert] = useState(false);

  if (!props) {
    return <h2 className="text-center mt-5">Product not found</h2>;
  }

  const element = list.find((item) => item.id === props.id);

  const addToCart = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 2000);
    dispatch(addItem(props));
  };

  return (
    <div className="card mt-5">
      {/* Display alert message */}
      {alert && <div className="alert alert-success">Item added to cart</div>}

      <div>
        <img
          src={props.image}
          height={250}
          width={300}
          alt={props.name}
          className="mt-2 rounded"
        />
      </div>

      <div className="card-body mt-5">
        <h5 className="card-title">{props.name}</h5>
        <h6>Price: {`$${props.price}`}</h6>
        <h6 className="card-size">{props.size}</h6>

        {/* Always show "Buy Now" and "Add to Cart" buttons */}
        <button className="btn btn-success"onClick={()=> navigate(`/checkout/${props.id}`)}>Buy Now</button>

        {/* Show either "Go To Cart" or "Add To Cart" based on availability */}
        {element?.count > 0 ? (
          <button
            className="ms-3 btn btn-warning"
            onClick={() => navigate("/cart")}
          >
            Go To Cart
          </button>
        ) : (
          <button className="ms-3 btn btn-success" onClick={addToCart}>
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}
