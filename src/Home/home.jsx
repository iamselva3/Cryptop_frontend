import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import "./responsive.css";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import { Context } from "../App";

const Home = () => {
  const { user, setPage, setCart } = useContext(Context);
  const [index, setIndex] = useState(0);
  const images = [img1, img2, img3, img4];
  const carouselRef = useRef(null);
  const [products, setProducts] = useState([]);

  const navigate=useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]); // Add product to the cart array
        navigate("/wallet"); 
       };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header_section">
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
      </header>

      {/* Slider Section */}
      <section className="slider_section">
        <div className="carousel">
          <div ref={carouselRef}>
            <img id="carimg" src={images[index]} alt={`Slide ${index + 1}`} />
          </div>
        </div>
      </section>

      {/* Product List Section (Under Carousel) */}
      <section className="product-list-section">
        <div className="container">
          <h1 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>TOP CRYPTOS</h1>
          <hr style={{
            width: "10vw",
            margin: "auto",
            color: "green",
            border: "5px solid rgba(22, 213, 41, 0.8)"
          }} />
          <div className="product-container">
            {products.map((product) => (
              <div key={product._id} className="product">
                <img src={`${process.env.REACT_APP_API_URL}${product.image}`} alt={product.name} className="image" />
                <h3>{product.name}</h3>
                <p>Current Price: ${product.price}</p>

                <button onClick={() => handleAddToCart(product)} id="btnstyle3">
        BUY STOCK  
       </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

