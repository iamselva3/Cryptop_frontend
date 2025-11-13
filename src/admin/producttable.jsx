// import React, { useState, useEffect } from 'react';
// import './user.css';
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Product from '../../../server/model/productModel';

// const Producttable = () => {
//   const [product, setproduct] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/product");
//         setUsers(response.data);
//       } catch (error) {
//         console.log("Error while fetching data", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const deleteUser = async (userId) => {
//     await axios
//       .delete(`http://localhost:8000/api/delete/product/${userId}`)
//       .then(() => {
//         setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className='userTable'>
//       <Link to="/admin" type="submit" className="btn btn-primary">Back</Link>

//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>Sl No</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={product._id}>
//               <td>{index + 1}</td>
//               <td>{product.name}</td>
//               <td>{product.email}</td>
//               <td>{product.address}</td>
//               <td>
//                 <Link to={`/update/${product._id}`} type="button" className="btn btn-info">
//                   <i className="fa-solid fa-pen-to-square"></i>
//                 </Link>
//                 &nbsp;
//                 <button
//                   onClick={() => deleteUser(user._id)}
//                   type="button"
//                   className="btn btn-danger"
//                 >
//                   <i className="fa-solid fa-trash"></i>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Producttable;

import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const Producttable = () => {
  

  const [products,setProducts]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setProducts(response.data);   
      } catch (error) {
        console.log("Error while f etching data", error);
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

    <div>
    <div class="hero_area">
     
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
        
         </div>
<div className='userTable'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                {product.image ? (
                  <img 
                    src={`${process.env.REACT_APP_API_URL}${product.image}`} 
                    alt="User" 
                    width="50" 
                    height="50" 
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  "No Image Available"
                )}
              </td>
              <td>
                <Link to={`/update/product/${product._id}`} type="button" className="btn btn-info">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                &nbsp;
                <button
                  onClick={() => deleteProduct(product._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Producttable;
