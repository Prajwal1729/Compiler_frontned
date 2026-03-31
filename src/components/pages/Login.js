import React from 'react'
import { useNavigate } from "react-router-dom";
import { authLogin } from '../../apis/AuthLogin';
import SuccessMessage from '../SuccessMessage';
import ErrorMessage from '../ErrorMessage';

export default function Login(){

  const navigate = useNavigate();
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin = async () => {
      try{
        const data = await authLogin(email, password);
        console.log(data);
        
        if (data.success) {
            sessionStorage.setItem("token", data.access)
            setSuccessMessage(data.message);
            setTimeout(()=>{
              navigate('/dashboard');
            },2000);
            setErrorMessage("");
        } else {
            setErrorMessage(data.message);
            setSuccessMessage("");
        }

      }catch(error){
        console.error("Login failed:", error);
     }
  };
  
  return (
    <div className="login-page">
      {/* <button className="home-btn">Go to Homepage</button> */}
     {/* <div className="left-section">
        <h1 className="title">Let's Compile Code 🚀</h1>
        <img src="./online_compiler.png" alt="Online Compiler" />
     </div> */}
      <div className="login-card">
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
        <h2>Welcome Back to Online Compiler</h2>
        <p>Please login to your account</p>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>

        <div className="options">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember"> Remember me</label>
          </div>
          <span className="forgot">Forgot Password</span>
        </div>

        <button className="login-btn" onClick={handleLogin}>Login</button>

        <div className="divider"></div>

        <button className="social-btn google">Login With Google</button>

        <p className="signup-text">
          Don't have an account? <span onClick={()=>navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  )
}
