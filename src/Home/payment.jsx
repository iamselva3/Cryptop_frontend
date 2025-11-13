import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { QRCodeCanvas }  from "qrcode.react";
import "./payment.css";

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalPrice = queryParams.get("total") || 0;
  const [upiID, setUpiID] = useState("");

  useEffect(() => {
    // Generate a random UPI ID (this is just for demonstration)
    const randomUPI = `user${Math.floor(Math.random() * 10000)}@upi`;
    setUpiID(randomUPI);
  }, []);

  const upiURL = `upi://pay?pa=${upiID}&pn=CryptoPay&mc=1234&tid=TXN123456&tr=ORDER123&tn=Payment&am=${totalPrice}&cu=INR`;

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      <h2>Total Amount: ${parseFloat(totalPrice).toFixed(2)}</h2>
      <p>Scan the QR code or enter your UPI ID to complete the payment.</p>
      
      <div className="qr-container">
        <QRCodeCanvas value={upiURL} size={200} />
        <p>UPI ID: <strong>{upiID}</strong></p>
      </div>

      <button className="confirm-payment">Proceed to Pay</button>
      <Link to="/wallet">Go to Wallet</Link>
    </div>
  );
};

export default Payment;
