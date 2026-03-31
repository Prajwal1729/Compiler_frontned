import './App.css';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Dashboard from './components/pages/Dashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={
        <ProtectedRoutes>
          <Dashboard />
        </ProtectedRoutes>
      } />
    </Routes>
  );
}

export default App;
