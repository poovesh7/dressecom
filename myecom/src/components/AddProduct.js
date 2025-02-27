import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = ({ productId }) => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch product details when productId is available
    useEffect(() => {
        if (productId) {
            setIsUpdating(true); // We are updating the product
            axios.get(`http://localhost:8000/api/products/${productId}/`)
                .then((response) => {
                    const product = response.data;
                    setProductName(product.name);
                    setPrice(product.price);
                    setCategory(product.category);
                })
                .catch((error) => {
                    console.error('Error fetching product:', error);
                });
        } else {
            setIsUpdating(false); // We're adding a new product, not updating
        }
    }, [productId]);

    const handleNameChange = (e) => setProductName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleImageChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);

        const url = isUpdating
            ? `http://localhost:8000/api/products/${productId}/`
            : 'http://localhost:8000/api/products/';

        const method = isUpdating ? 'put' : 'post';

        axios({
            method,
            url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
            console.log('Product saved successfully:', response);
            alert(isUpdating ? 'Product updated successfully!' : 'Product added successfully!');
        })
        .catch((error) => {
            console.error('Error saving product:', error);
        });
    };

    const handleDelete = () => {
        if (productId) {
            axios.delete(`http://localhost:8000/api/products/${productId}/`)
                .then((response) => {
                    console.log('Product deleted successfully:', response);
                    alert('Product deleted successfully!');
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">{isUpdating ? 'Update Product' : 'Add a New Product'}</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <div className="mb-3">
                    <label className="form-label" htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={productName}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="price">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={handlePriceChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="category">Category:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="image">Image:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">{isUpdating ? 'Update Product' : 'Add Product'}</button>
                </div>
            </form>

            {/* Show delete button only when we are updating an existing product */}
            {isUpdating && (
                <div className="text-center mt-3">
                    <button onClick={handleDelete} className="btn btn-danger">Delete Product</button>
                </div>
            )}
        </div>
    );
};

export default AddProduct;
