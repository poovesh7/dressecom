import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api"; // Ensure you have the signup function in api.js

const Adminsignup = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        role: "", // Added role to state
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(userData);
            navigate("/"); // Redirect to login page after successful signup
        } catch (error) {
            setError("Signup failed! Try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Create User Account</h3>
                            {error && <p className="text-danger text-center">{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        name="username"
                                        value={userData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="role">Role</label>
                                    <select
                                        className="form-select"
                                        id="role"
                                        name="role"
                                        value={userData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Retailers">Retailers</option>
                                        <option value="Customer">Customer</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Create Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adminsignup;
