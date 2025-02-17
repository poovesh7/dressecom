import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Profile() {
  const navigate = useNavigate();
  const userList = useSelector((state) => state.user.userList) || [];
  const [userData, setUserData] = useState({
    name: userList?.username || "",
    email: userList?.email|| "",
    contact: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    // Use GET request to fetch user data
    axios
      .get("http://127.0.0.1:8000/api/user/profile/", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        if (err.response && err.response.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
        }
      });
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    axios
      .put("http://127.0.0.1:8000/api/user/profile/", userData, {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        if (err.response) {
          alert(`Update failed: ${err.response.data.detail}`);
        } else {
          alert("Update failed. Please try again.");
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Profile</h2>
      <form onSubmit={handleSave} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            className="form-control"
            id="contact"
            name="contact"
            value={userData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            rows="3"
            value={userData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
