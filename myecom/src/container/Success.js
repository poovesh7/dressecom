import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentGateway = ({ price }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(price); // Set the initial value to the price
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // If price prop changes, update amount state
  useEffect(() => {
    setAmount(price);
  }, [price]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Assuming you have a function to handle Stripe payment
    try {
      const paymentResult = await processPayment(
        cardNumber,
        expiryDate,
        cvv,
        amount
      );
      setMessage(paymentResult.success ? "Payment Successful!" : "Payment Failed");

      // Optionally, navigate to a success page or dashboard after payment success
      if (paymentResult.success) {
        navigate("/success"); // Redirect to success page after successful payment
      }
    } catch (error) {
      setMessage("An error occurred during payment");
    }
    setLoading(false);
  };

  // Dummy payment processing function
  const processPayment = async (cardNumber, expiryDate, cvv, amount) => {
    // Call Stripe API here or mock the payment
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center text-primary">Payments</h2>
          <form onSubmit={handlePaymentSubmit}>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                maxLength="16"
                className="form-control"
                placeholder="Enter your card number"
              />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  maxLength="5"
                  className="form-control"
                  placeholder="MM/YY"
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  maxLength="3"
                  className="form-control"
                  placeholder="CVV"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                value={amount} // Use the amount state for the input field
                onChange={(e) => setAmount(e.target.value)}
                required
                className="form-control"
                placeholder="Enter Amount" // Show placeholder with the initial product price
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success w-100"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
           
            <button
              type="submit"
              disabled={loading}
              className="btn btn-warning w-100 mt-4 "
              onClick={() => navigate("/dashboard")}
            >
              {loading ? "Processing..." : "Cancel Order"}
            </button>
          </form>
          {message && (
            <div
              className={`mt-3 text-center ${message === "Payment Successful!" ? "text-success" : "text-danger"}`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
