import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/reducer/product";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.cart.list) || [];
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    dispatch(setCategory(value));
  };

  return (
    <div className="p-3 bg-primary text-white">
      <h3 className="text-center">Kevin Shops</h3>
      <div className="row justify-content-center pt-2 pb-1">
        <div className="col-sm-12 col-md-8 col-lg-7 col-xl-6 d-flex align-items-center">
          {/* Home Button */}
          <button
            className="btn btn-success me-3"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </button>

          {/* Search Bar */}
          <div className="input-group flex-grow-1" style={{ height: "45px" }}>
            <input
              className="form-control"
              type="search"
              placeholder="Search for Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="input-group-text bg-light border-0">
              <i className="bi bi-search"></i> {/* Bootstrap search icon */}
            </span>
          </div>

          {/* Cart Button */}
          <button
            className="btn btn-success ms-3 d-flex align-items-center"
            onClick={() => navigate("/cart")}
            style={{ height: "45px" }}
          >
            <div className="position-relative">
              <FaCartPlus className="me-2" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {list.length}
                <span className="visually-hidden">items in cart</span>
              </span>
            </div>
            <span className="ms-2">Cart</span>
          </button>

          {/* Category Dropdown */}
          <select
            onChange={handleChange}
            value={selectedOption}
            className="form-select ms-2 w-auto"
            style={{ height: "45px", minWidth: "140px" }}
          >
            <option value="">Category</option>
            <option value="Tops">Tops</option>
            <option value="Shirts">Shirts</option>
            <option value="Menshirts">Men Shirts</option>
            <option value="T-shirts">T-shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Men Shoes">Men Shoes</option>
          </select>
        </div>
      </div>
    </div>
  );
}
