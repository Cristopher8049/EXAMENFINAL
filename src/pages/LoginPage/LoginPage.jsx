import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      setErrMsg(error.message || 'Login failed');
      errRef.current.focus();
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-image">
        {/* Replace with your actual image */}
        <img src="https://i.postimg.cc/Xvk2bhDk/wallpaperflare-com-wallpaper-1.jpg" alt="Login" />
      </div>
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h1 className="login-title">Iniciar sesión</h1>
          <p
            ref={errRef}
            className={errMsg ? "error-message" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="text"
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className="form-input"
              />
            </div>
            <button className="login-button">Iniciar sesión</button>
          </form>
          <p className="signup-link">
            ¿Necesitas una cuenta?{" "}
            <a href="/SignUp">Registrarse</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;