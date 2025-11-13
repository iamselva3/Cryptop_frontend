import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
// import "./responsive.css";
import { Context } from "../App";

const Admin = () => {
  const { user, setCart } = useContext(Context);  
  const navigate = useNavigate();
  // const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", price: "", image: null });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setEditedData({ ...editedData, image: e.target.files[0] });
    } else {
      setEditedData({ ...editedData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editedData.name);
      formData.append("price", editedData.price);
      if (editedData.image) {
        formData.append("image", editedData.image);
      }

      await axios.put(`${process.env.REACT_APP_API_URL}/api/products/${editingProduct}`, formData);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


   const [products, setProducts] = useState([]);
  
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
  
    const deleteProduct = async (productId) => {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/api/delete/product/${productId}`)
        .then(() => {
          setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar">
            <Link className="navbar-brand" to="/">Cryptop</Link>
            <ul className="nav-links">
              <p>Hi Admin!!</p>
              <li><Link to="/admin">Home</Link></li>
              <li><Link to="/user">Users</Link></li>
              <li><Link to="/producttable">Products</Link></li>
              {/* <li><Link to="#">Wallet <img src="./wallet.png" alt="Wallet" /></Link></li> */}
              <li><Link to="/">Logout</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Product Management */}
      <div style={{ marginLeft: "-50px" }}>

        <div className="container">
          <h1 style={{ color: "white",marginTop:"50px" }}>TOP CRYPTOS</h1>
          <hr style={{ width: "10vw", marginLeft: "39vw", color: "green", border: "5px solid rgba(22, 213, 41, 0.8)" }}></hr>
<button onClick={() => navigate("/add-product")} className="add-product-btn" style={{backgroundColor:"red",height:"50px",width:"30vw",borderRadius:"10px"}}>
            Add New Product
          </button> <br></br>
          {products.map((product) => (
            <div key={product._id} className="product">
              <img src={`${process.env.REACT_APP_API_URL}${product.image}`} alt={product.name} className="image" />
              <h3>{product.name}</h3>
              <p>Current Price: ${product.price}</p>
            </div>
          ))}

          {/* Button to Navigate to Add Product Page */}
          {/* <button onClick={() => navigate("/add-product")} className="add-product-btn" style={{backgroundColor:"red",height:"50px",width:"30vw",borderRadius:"10px"}}>
            Add New Product
          </button> */}
          
        </div>
      </div>


      
    </div>
  );
};

export default Admin;
