import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProduct = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState({ name: "", price: "", image: null });

    const handleInputChange = (e) => {
      if (e.target.name === "image") {
        setProductData({ ...productData, image: e.target.files[0] });
      } else {
        setProductData({ ...productData, [e.target.name]: e.target.value });
      }
    };

    const handleAddProduct = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("name", productData.name);
      formData.append("price", productData.price);
      if (productData.image) {
        formData.append("image", productData.image);
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/product_details`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Product added:", response.data);
      navigate("/admin");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
    }
  };

  return (
    
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", textAlign: "center" }}>
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
     
     
     
      <h2 style={{ color: "#28a745", marginBottom: "20px" }}>Add New Product</h2>
      <form onSubmit={handleAddProduct} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "300px", gap: "10px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
        <label style={{ fontWeight: "bold",color:"black" }}>Product Name:</label>
        <input type="text" name="name" value={productData.name} onChange={handleInputChange} required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />

        <label style={{ fontWeight: "bold" ,color:"black" }}>Price:</label>
        <input type="number" name="price" value={productData.price} onChange={handleInputChange} required style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />

        <label style={{ fontWeight: "bold",color:"black"  }}>Product Image:</label>
        <input type="file" name="image" onChange={handleInputChange} required style={{ width: "100%" }} />

        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "10px" }}>
          <button type="submit" style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#28a745", color: "white", cursor: "pointer", marginRight: "5px" }}>Add Product</button>
          <button type="button" onClick={() => navigate("/admin")} style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#dc3545", color: "white", cursor: "pointer" }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";


// function AddProduct() {

//   const [user, setUser] = useState({
//     name: "",
//     price: "",
//     image: null, // Store file object
//   });

//   const navigate = useNavigate();

//   // **Handle text input changes**
//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({ ...prevUser, [name]: value }));
//   };

//   // **Handle image file selection**
//   const imageHandler = (e) => {
//     const file = e.target.files[0]; // Get the selected file (first file if multiple are selected)
//     setUser((prevUser) => ({ ...prevUser, image: file })); // Update user state with the file
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData(); // .append("key", value) adds each field to the FormData object.
//     formData.append("name", user.name);
//     formData.append("price", user.price);
//     formData.append("image", user.image);  // Ensure file is sent correctly

//     try {
//         await axios.post("http://localhost:8000/api/product_details", formData, {
//             headers: { "Content-Type": "multipart/form-data" } // The Content-Type: multipart/form-data header 
//             // ensures the request properly transmits the file and text data.
//         });
//         navigate("/admin");
//         console.log("Product added successfully");
//     } catch (error) {
//         console.error("Axios Error:", error);
//     }
// };


//   return (


//           <div class="hero_area">
           
//               <header class="header_section">
//                 <nav class="navbar navbar-expand-lg custom_nav-container ">
//                   <a class="navbar-brand" href="index.html">
//                     <span>
//                      Admin Page
//                     </span>
//                   </a>
//                   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span class=""></span>
//                   </button>
          
//                   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul class="navbar-nav  ">
//                       <li class="nav-item active">
          
//                      <Link to="/add_products" class="nav-link">Add products<span class="sr-only">(current)</span></Link>
                        
//                       </li>
//                       <li class="nav-item">
//                         <Link to="/all_products" class="nav-link">View products<span class="sr-only"></span></Link>
//                       </li>
                    
//                     </ul>
                
//                   </div>
//                 </nav>
//               </header>
          
              
              
             
//     <section class="contact_section layout_padding">
// <div class="container px-0">
//  <div class="heading_container ">
//    <h2 class="">
//    Products
//    </h2>
//  </div>
// </div>
// <div class="container container-bg">
//  <div class="row">
//    <div class="col-lg-7 col-md-6 px-0">
//      <div class="map_container">
//     <img alt="login-image" src="images/log.avif"></img>
//      </div>
//    </div>
//    <div class="col-md-6 col-lg-5 px-0">
//      <form onSubmit={submitForm}>
//        <div>
//          <input type="text" name="name" placeholder="Name"  onChange={inputHandler} />
//        </div>
//        <div>
//          <input type="number" name="price" placeholder="Price" onChange={inputHandler} />
//        </div>
//        <div>
//        <input type="file" name="image" autoComplete="off" onChange={imageHandler} />
//        </div>
    
//        <div class="d-flex ">
//          <button>
//          Add products
//          </button>
//        </div>
//      </form>
//    </div>
//  </div>
// </div>
// </section>

// </div>
//   )
// }

// export default AddProduct;
