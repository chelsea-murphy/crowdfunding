import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page">
        <div className="login-container">
          <h1 className="login-title">Welcome to Book Bank</h1>
          <p className="login-subtitle">Login to fund a reader and change a life</p>
          <LoginForm />
          <div className="login-footer">
            Don't have an account? <Link to="/register">Sign up here</Link>
          </div>
      </div>
    </div>
  );
}

export default LoginPage;