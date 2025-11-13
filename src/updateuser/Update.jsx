// import React, { useEffect, useState } from "react";
// import "./Update.css";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const UpdateUser = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     address: "",
//   });
//   const [image, setImage] = useState(null); // Separate state for image

//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/user/${id}`)
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const fileHandler = (e) => {
//     setImage(e.target.files[0]); // Store the selected file
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", user.name);
//     formData.append("email", user.email);
//     formData.append("address", user.address);
//     if (image) {
//       formData.append("image", image); // Add image if selected
//     }

//     try {
//       await axios.put(`http://localhost:8000/api/update/user/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       navigate("/");
//     } catch (error) {
//       console.log("Error updating user:", error);
//     }
//   };

//   return (
//     <div className="addUser">
//       <Link to="/" type="button" className="btn btn-primary">
//         Back
//       </Link>

//       <h3>Update User</h3>
//       <form className="addUserForm" onSubmit={submitForm}>
//         <div className="inputGroup">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={user.name}
//             onChange={inputHandler}
//             name="name"
//             autoComplete="off"
//             placeholder="Enter your Name"
//           />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="email">E-mail:</label>
//           <input
//             type="email"
//             id="email"
//             value={user.email}
//             onChange={inputHandler}
//             name="email"
//             autoComplete="off"
//             placeholder="Enter your Email"
//           />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="address">Address:</label>
//           <input
//             type="text"
//             id="address"
//             value={user.address}
//             onChange={inputHandler}
//             name="address"
//             autoComplete="off"
//             placeholder="Enter your Address"
//           />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="image">Image:</label>
//           <input type="file" id="image" onChange={fileHandler} name="image" />
//         </div>
//         <div className="inputGroup">
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateUser;
  

import React, { useEffect, useState } from "react";
import "./Update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/update/user/${id}`, user);
      navigate("/");
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-primary">
        Back
      </Link>

      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={user.address}
            onChange={inputHandler}
            name="address"
            autoComplete="off"
            placeholder="Enter your Address"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
