import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  const categories = [
    "Men's Shoes",
    "Men's Shirt",
    "Men's Band",
    "Ladies' Clothes",
    "Ladies' Slippers",
    "Ladies' Shoes",
  ];

  // Fetch products
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle form change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle add/update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (selectedProduct) {
        await axios.put(
          `http://127.0.0.1:8000/api/products/${selectedProduct.id}/`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Product updated!");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/products/",
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Product added!");
      }

      // Fetch updated product list
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
      setSelectedProduct(null);
      setFormData({ name: "", price: "", category: "", image: null });
    } catch (error) {
      console.error(error);
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`);
      alert("Product deleted!");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Handle select product for editing
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: null,
    });
  };

  return (
    <div className="d-flex justify-content-center p-3">
      <div className="container mt-3">
        <h2>Manage Products</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {selectedProduct ? "Update Product" : "Add Product"}
          </button>
        </form>

        <h3>Product List</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.image ? (
                    <img
                      src={`http://127.0.0.1:8000${product.image}`}
                      alt={product.name}
                      width="100"
                      height="100"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
