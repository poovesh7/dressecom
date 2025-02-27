import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  const [categories, setCategories] = useState([
    "Electronics",
    "Clothing",
    "Furniture",
    "Books",
    "Accessories",
  ]); // Example categories, fetch from API if dynamic

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProductData({ ...productData, image: e.target.files[0] });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    if (productData.image) {
      formData.append("image", productData.image);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/products/add/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            
          },
        }
      );
      setSuccessMessage("Product added successfully!");
      setProductData({ name: "", price: "", category: "", image: null });
    } catch (error) {
      setErrorMessage("Error adding product. Please try again.");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Product</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Card className="shadow p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" value={productData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} accept="image/*" />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Add Product"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;
