// SGN
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./../styles/App.css";

const Home = () => <p>Home</p>;
const Login = ({ isAuthenticated, toggleAuth}) => {
    return(<div>
      <p>Login</p>
      <button type="button" onClick={toggleAuth}>{ isAuthenticated ? "Log Out" : "Log In"}</button>

    </div> )
};

const PrivateRoute = ({ isAuthenticated, children }) => {
      return isAuthenticated ? children : <Navigate to="/login" />;
      
      
}

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState("")

    const toggleAuth = () => {
        setIsAuthenticated((prev) => !prev);
    }
  return (
    <div className="main-container">
      <p>{isAuthenticated ? "Logged in, Now you can enter Playground" : "You are not authenticated, Please login first"}</p>
      <Router>
      <nav>
      <ul>
      <li><Link to="/private">PlayGround</Link></li>
      <li><Link to="/login">Login</Link></li>
      </ul>
      </nav>

      <Routes>
        {/* public route  */}
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login isAuthenticated={isAuthenticated} toggleAuth={toggleAuth} />} />
        
        
        {/* private route  */}
        <Route path="/private" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <div>Hi Welcome to Code PlayGround</div>
          </PrivateRoute>
        }></Route>
        
      </Routes>


      </Router>
    </div>  
  );
};

export default App;