// import React, { useState, useEffect } from 'react';
// import './user.css';
// import axios from "axios";
// import { Link } from "react-router-dom";

// const User = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/users");
//         setUsers(response.data);
//       } catch (error) {
//         console.log("Error while fetching data", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const deleteUser = async (userId) => {
//     await axios
//       .delete(`http://localhost:8000/api/delete/user/${userId}`)
//       .then(() => {
//         setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className='userTable'>
//       <Link to="/add" type="submit" className="btn btn-primary">Add user</Link>

//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>Sl No</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//               <td>{index + 1}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.address}</td>
//               <td>
//                 {user.image ? (
//                   <img 
//                     src={`http://localhost:8000${user.image}`} 
//                     alt="User" 
//                     width="50" 
//                     height="50" 
//                     style={{ borderRadius: "50%" }}
//                   />
//                 ) : (
//                   "No Image Available"
//                 )}
//               </td>
//               <td>
//                 <Link to={`/update/${user._id}`} type="button" className="btn btn-info">
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

// export default User;

import React, { useState, useEffect } from 'react';
import './user.css';
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/delete/user/${userId}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='userTable'>

  
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
    
      
      <Link to="/admin" type="submit" className="btn btn-primary">Back</Link>

      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Address</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.address}</td> */}
              <td>
                {/* <Link to={`/update/${user._id}`} type="button" className="btn btn-info">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                &nbsp; */}
                <button
                  onClick={() => deleteUser(user._id)}
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
  );
};

export default User;
