import React, { useState } from "react";
// import { TextField, Button, Typography, Paper } from "@mui/material";
import "./login.css"; // Import the CSS file
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import background from "./public/peakpx.jpg"; 


const LoginPage = () => {
 const [email,setemail]=useState("");
 const [password,setpassword]=useState("");

 let navigate= useNavigate();
 
//  const handlesubmit=()=>{
//  if(email==="admin" && password==="admin"){
//     navigate("/admin");
//  }
//  else{
//     navigate("/home");
//  }
// }

const handlesubmit = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`); // Fetch all users
    const users = response.data;

    const user = users.find((u) => u.email === email && u.address === password); // Check if user exists

    if (user) {
      if (email === "admin" && password === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } 

    else if( user != password){
      alert("Password Does not match.Try Again.");
      navigate("/")
    }
    
    
    else {
      alert("User does not exist. Please sign up first.");
      navigate("/signup");
    }
  } catch (error) {
    console.error("Error fetching users", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div id="main"className="d-flex justify-content-center align-items-center vh-100">
    <Container>
      <Card id="paper"className="shadow p-4" style={{ maxWidth: "400px", margin: "auto" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Login to Cryptop</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label> <br></br>
             <input className="input" type="email" placeholder="Enter your email" value={email} onChange={(e)=>setemail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label><br></br>
              <input className="input" type="password" placeholder="Enter your password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" className="w-100" onClick={handlesubmit}>Login</Button>
          </Form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  </div>

    
  );
};

export default LoginPage;
// import React, { useState } from "react";
// import "./login.css";
// import { Container, Form, Button, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
  
//   let navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/api/login", { email });
//       if (response.data.success) {
//         navigate("/home");
//       } else {
//         setError("Invalid email");
//       }
//     } catch (error) {
//       setError("Error logging in. Please try again.");
//       console.log(error);
//     }
//   };

//   return (
//     <div id="main" className="d-flex justify-content-center align-items-center vh-100">
//       <Container>
//         <Card id="paper" className="shadow p-4" style={{ maxWidth: "400px", margin: "auto" }}>
//           <Card.Body>
//             <h3 className="text-center mb-4">Login to Cryptop</h3>
//             {error && <p className="text-danger text-center">{error}</p>}
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <input className="input" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//               </Form.Group>
//               <Button variant="primary" className="w-100" type="submit">Login</Button>
//             </Form>
//             <p className="text-center mt-3">
//               Don't have an account? <a href="/signup">Sign up</a>
//             </p>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default LoginPage;