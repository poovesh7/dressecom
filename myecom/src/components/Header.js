import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/reducer/product";
import { Navbar, Nav, Dropdown, ButtonGroup, Container } from "react-bootstrap";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.cart.list) || [];
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");

  // Check if the user is logged in and get the username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    dispatch(setCategory(value));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <>
      {/* Fixed Navbar */}
      <div className="bg-primary text-white fixed-top">
        {/* Centered Title */}
        <div className="container text-center py-2">
          <h3 className="fw-bold m-0">
            <img
              src="/images/image.jpg"
              className="rounded-circle"
              height={50}
              width={80}
              alt="Logo"
            />
            Kevin Shops
          </h3>
        </div>

        {/* Navbar Section */}
        <Navbar expand="lg" className="bg-primary text-white" variant="dark">
          <Container>
            {/* Home Button (Visible only on lg and above) */}
            <div className="d-none d-lg-block">
              <button className="btn btn-success" onClick={() => navigate("/dashboard")}>
                Home
              </button>
            </div>

            {/* Navbar Toggle Button */}
            <Navbar.Toggle aria-controls="navbar-content" className="ms-auto" />

            <Navbar.Collapse id="navbar-content">
              <Nav className="mx-auto align-items-center">
                {/* Search Bar for Large Screens */}
                <Nav.Item className="d-none d-md-block flex-grow-1 mx-3">
                  <div className="input-group">
                    <input
                      className="form-control"
                      style={{ minWidth: "410px" }}
                      type="search"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-light" type="button">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </Nav.Item>

                {/* Cart Button */}
                <Nav.Item>
                  <button
                    className="btn btn-success d-flex align-items-center position-relative"
                    onClick={() => navigate("/cart")}
                  >
                    <FaCartPlus className="me-2" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {list.length}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                    <span>Cart</span>
                  </button>
                </Nav.Item>

                {/* Category Dropdown */}
                <Nav.Item>
                  <select
                    onChange={handleChange}
                    value={selectedOption}
                    className="form-select bg-transparent border-0 text-white ms-5 me-5"
                    style={{ minWidth: "50px", appearance: "none" }}
                  >
                    <option style={{ backgroundColor: "white", color: "black" }} value="">
                      Category
                    </option>
                    <option style={{ backgroundColor: "white", color: "black" }} value="Tops">
                      Tops
                    </option>
                    <option style={{ backgroundColor: "white", color: "black" }} value="Shirts">
                      Shirts
                    </option>
                    <option style={{ backgroundColor: "white", color: "black" }} value="Menshirts">
                      Men Shirts
                    </option>
                    <option style={{ backgroundColor: "white", color: "black" }} value="T-shirts">
                      T-shirts
                    </option>
                    <option style={{ backgroundColor: "white", color: "black" }} value="Jeans">
                      Jeans
                    </option>
                    <option style={{ backgroundColor: "white", color: "black" }} value="Men Shoes">
                      Men Shoes
                    </option>
                  </select>
                </Nav.Item>

                {/* Profile Dropdown */}
                <Nav.Item>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle className="ms-5" variant="primary" id="dropdownMenuButton1">
                      <i className="bi bi-person-circle"></i>{" "}
                      {username ? username : "My Profile"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {username ? (
                        <>
                          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </>
                      ) : (
                        <>
                          <Dropdown.Item href="/">Login</Dropdown.Item>
                          <Dropdown.Item href="/signup">SignUp</Dropdown.Item>
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Search Bar for Small Screens */}
        <div className="d-md-none p-2">
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-light" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content overlap */}
      <div style={{ marginTop: "100px" }}></div>
    </>
  );
}
