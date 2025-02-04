import "./App.css";
import Router from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap Icons are correctly imported
import { Provider } from "react-redux"; // Corrected import for Provider
import store from "./redux/store"; // Ensure correct import for the Redux store

function App() {
  return (
    <Provider store={store}> {/* Wrap the app with Redux Provider to pass down the store */}
      <div className="App">
        <Router /> {/* Router component for routing between pages */}
      </div>
    </Provider>
  );
}

export default App;



// django
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [PRODUCTS, setProducts] = useState([]);

//     useEffect(() => {
//         axios.get("http://127.0.0.1:8000/api/products/")
//             .then(response => setProducts(response.data))
//             .catch(error => console.error("Error fetching products:", error));
//     }, []);

//     return (
//         <div>
//             <h1>Product List</h1>
//             <ul>
//                 {PRODUCTS.map((PRODUCTS) => (
//                     <li key={PRODUCTS.id}>{PRODUCTS.name} - ₹{PRODUCTS.price}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;





// Login & signup

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import "bootstrap/dist/css/bootstrap.min.css";

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;
