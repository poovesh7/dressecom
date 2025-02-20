import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import axios from "axios";

const Admindashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRetailers, setTotalRetailers] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    axios
      .get("http://127.0.0.1:8000/api/customers-retailers")

      .then((res) => {
        console.log(res.data)
        // setTotalSales(res.data.totalSales);
        setTotalCustomers(res.data.total_customers);
        setTotalRetailers(res.data.total_retailers);
        // setTopProducts(res.data.topProducts);
        // setTopCategories(res.data.topCategories);
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  return (
    <div className="d-flex justify-content-center p-3 h-auto">
      <div className="container mt-15">
        <h2 className="text-center mt-5 mb-4">Admin Dashboard</h2>
        <div className="row">
          <div className="col-md-3">
            <Card className="text-center shadow-sm mb-4 hover-shadow">
              <Card.Body>
                <Card.Title>Total Sales</Card.Title>
                <Card.Text>{totalSales}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="text-center shadow-sm mb-4 hover-shadow">
              <Card.Body>
                <Card.Title>Total Customers</Card.Title>
                <Card.Text>{totalCustomers}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="text-center shadow-sm mb-4 hover-shadow">
              <Card.Body>
                <Card.Title>Total Retailers</Card.Title>
                <Card.Text>{totalRetailers}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="text-center shadow-sm mb-4 hover-shadow">
              <Card.Body>
                <Card.Title>User & Account Management</Card.Title>
                <Card.Text>
                  <a href="/craete-account" className="btn btn-primary btn-sm">
                    Manage
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <Card className="shadow-sm hover-shadow">
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
                      <tr key={index} className="table-row-hover">
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
            <Card className="shadow-sm hover-shadow">
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
                      <tr key={index} className="table-row-hover">
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

export default Admindashboard;
