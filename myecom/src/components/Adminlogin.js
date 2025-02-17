import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { useDispatch } from "react-redux";
import { setUserList } from "../redux/reducer/user";

const Adminlogin = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role:"",
  });
  const [selectedRole, setSelectedRole] = useState(""); // State for selected role
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value); // Store selected role
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({...credentials})
    try {
      const response = await login({...credentials,role:selectedRole});
      if (response.data) {
        const user = response.data.user;

        dispatch(setUserList(user));
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("username", credentials.username);
        // Navigate based on role
        if (user.role === "Admin") {
          navigate("/Admindashboard");
        } else if (user.role === "Retailers") {
          navigate("/Retailerdashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setError("Invalid Username or Password! Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg rounded-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center text-primary mb-4">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn border-0 bg-transparent rounded"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <i
                  className={`bi ${
                    passwordVisible ? "bi-eye-fill" : "bi-eye-slash-fill"
                  }`}
                ></i>
              </button>
            </div>
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label fw-bold">Role</label>
            <select
              className="form-select"
              name="role"
              value={selectedRole}
              onChange={handleRoleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Retailers">Retailers</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3"></div>
      
      </div>
    </div>
  );
};

export default Adminlogin;
