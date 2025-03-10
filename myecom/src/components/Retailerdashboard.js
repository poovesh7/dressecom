
import React, { useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Retailerdashboard = () => {
  const navigate = useNavigate();
  const [totalSales, setTotalSales] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    axios
      .get("http://127.0.0.1:8000/api/customers-retailers")
      .then((res) => {
        // setTotalSales(res.data.totalSales);
        setTotalCustomers(res.data.total_customers);
        // setTopProducts(res.data.topProducts);
        // setTopCategories(res.data.topCategories);
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  return (
    <div className="d-flex justify-content-center p-3">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Retailer Dashboard</h2>
         
          <Button variant="primary" onClick={() => navigate("/manageproduct")}>
            + Add Product
          </Button>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Card className="text-center shadow-sm mb-4 transition hover-shadow-lg">
              <Card.Body>
                <Card.Title>Total Sales</Card.Title>
                <Card.Text>{totalSales}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card className="text-center shadow-sm mb-4 transition hover-shadow-lg">
              <Card.Body>
                <Card.Title>Total Customers</Card.Title>
                <Card.Text>{totalCustomers}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <Card className="shadow-sm transition hover-shadow-lg">
              <Card.Body>
                <Card.Title>Top 5 Sales by Product</Card.Title>
                <Table striped bordered hover responsive>
                  <thead className="table-primary">
                    <tr>
                      <th>Product</th>
                      <th>Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card className="shadow-sm transition hover-shadow-lg">
              <Card.Body>
                <Card.Title>Top 5 Sales by Category</Card.Title>
                <Table striped bordered hover responsive>
                  <thead className="table-primary">
                    <tr>
                      <th>Category</th>
                      <th>Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCategories.map((category, index) => (
                      <tr key={index}>
                        <td>{category.name}</td>
                        <td>{category.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Retailerdashboard;
