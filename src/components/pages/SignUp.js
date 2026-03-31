import React from 'react'
import { useNavigate } from "react-router-dom";
import { authSignUp } from '../../apis/AuthSignUp';
import SuccessMessage from '../SuccessMessage';
import ErrorMessage from '../ErrorMessage';

export default function SignUp(){
  const navigate = useNavigate();
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [confirmPassword,setConfirmPassword] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSignUp = async () => {
    try {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        const data = await authSignUp(email, password);
        console.log(data);

        if (data.success) {
            setSuccessMessage(data.message);
            setErrorMessage("")
            navigate("/login");
        } else {
            setErrorMessage(data.message);
            setSuccessMessage("");
        }

    } catch (error) {
        setErrorMessage("Signup failed");
        console.error(error);
    }
};
  
  return (
   <div className="login-page">
      <div className="login-card">
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
        <h2>Create Your Account</h2>
        <p>Please fill in the details to sign up</p>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>

        <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm your password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>

        <div className="options">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember"> Remember me</label>
          </div>
        </div>

        <button className="login-btn" onClick={handleSignUp}>Sign Up</button>

        <div className="divider"></div>

        <button className="social-btn google">Sign Up With Google</button>

        <p className="signup-text">
          Already have an account? <span onClick={()=>navigate("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  )
}