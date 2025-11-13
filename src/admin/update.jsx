import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Updateproduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/product/${id}`)
      .then((response) => {
        setProduct(response.data);
        setPreview(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/update/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/all_products");
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (
    <div style={styles.container}>

        <header className="header_section">
                <div className="container-fluid">
                  <nav className="navbar">
                    <Link className="navbar-brand" to="/admin">Cryptop</Link>
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
        
      <form style={styles.form} onSubmit={submitForm}>
        <h2 style={styles.heading}>Update Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={inputHandler}
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={inputHandler}
          style={styles.input}
        />
        <input type="file" name="image" accept="image/*" onChange={fileHandler} style={styles.fileInput} />

        {/* {preview && <img src={preview} alt="Preview" style={styles.imagePreview} />} */}

        <button type="submit" style={styles.button}>Update Product</button>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
  },
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "400px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
  },
  imagePreview: {
    display: "block",
    margin: "10px auto",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Updateproduct;
