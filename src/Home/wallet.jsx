import React, { useContext } from "react";
import { Context } from "../App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./wallet.css";
import { Link, useNavigate } from "react-router-dom";

const Wallet = () => {
  const { cart, setCart } = useContext(Context);
  const navigate = useNavigate();

  // Function to increase quantity
  const increaseQuantity = (index) => {
    setCart((prevCart) =>
      prevCart.map((stock, i) =>
        i === index ? { ...stock, quantity: (stock.quantity || 1) + 1 } : stock
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (index) => {
    setCart((prevCart) =>
      prevCart.map((stock, i) =>
        i === index && stock.quantity > 1
          ? { ...stock, quantity: stock.quantity - 1 }
          : stock
      )
    );
  };

  // Function to remove an item from cart
  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  // Calculate Total Price
  const totalPrice = cart.reduce((sum, stock) => sum + stock.price * (stock.quantity || 1), 0);

  // Navigate to Payment Page
  const handlePayNow = () => {
    navigate(`/payment?total=${totalPrice}`);
  };

  return (
    <div className="wallet-container">
      <div className="container-fluid">
        <nav className="navbar">
          <Link className="navbar-brand" to="/">Cryptop</Link>
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/wallet">Wallet <img src="./wallet.png" alt="Wallet" /></Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>
      </div>

      <div style={{ marginTop: "50px" }}>
        <h1>Your Crypto Wallet</h1>
        {cart.length === 0 ? (
          <p className="empty-wallet">No stocks purchased yet.</p>
        ) : (
          <>
            <div className="wallet-list">
              {cart.map((stock, index) => (
                <div key={index} className="wallet-card">
                  <img src={`${process.env.REACT_APP_API_URL}${stock.image}`} alt={stock.name} />
                  <h3>{stock.name}</h3>
                  <p>Price: ${stock.price.toFixed(2)}</p>

                  {/* Quantity Controls */}
                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <span>{stock.quantity || 1}</span>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </div>

                  <button className="delete-btn" onClick={() => handleRemoveFromCart(index)}>Remove</button>
                </div>
              ))}
            </div>
            
            {/* Total Price and Pay Now Button */}
            <div className="total-section">
              <h2>Total: ${totalPrice.toFixed(2)}</h2>
              <button className="pay-btn" onClick={handlePayNow}>Pay Now</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
