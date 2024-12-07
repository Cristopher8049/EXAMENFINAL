import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import "./RegisterPage.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "http://localhost:8000/auth/register";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const firstNameRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [organization, setOrganization] = useState("");
  const [position, setPosition] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Entrada no válida");
      return;
    }

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          birthDate,
          address,
          organization,
          position,
        }),
      });

      if (!response.ok) {
        throw new Error("Fallo al registrarse");
      }

      const data = await response.json();
      console.log(data);

      try {
        await login(email, password);
        navigate(from, { replace: true });
      } catch (loginError) {
        console.error("Error al iniciar sesión automáticamente:", loginError);
        setErrMsg("Registro exitoso, pero no se pudo iniciar sesión automáticamente. Por favor, inicie sesión manualmente.");
      }
    } catch (err) {
      setErrMsg(err.message || "Fallo en la solicitud de registro");
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <img src="https://i.postimg.cc/Xvk2bhDk/wallpaperflare-com-wallpaper-1.jpg" alt="Register" />
      </div>
      <div className="register-form-container">
        <div className="register-form-wrapper">
          <h1 className="register-title">Registrarse</h1>
          <p
            ref={errRef}
            className={errMsg ? "error-message" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                id="firstName"
                ref={firstNameRef}
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Apellido:
              </label>
              <input
                type="text"
                id="lastName"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo Electrónico:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? "valid-icon" : "offscreen"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? "offscreen" : "invalid-icon"}
                />
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="form-input"
              />
              <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Formato de correo no válido.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="birthDate" className="form-label">
                Fecha de Nacimiento:
              </label>
              <input
                type="date"
                id="birthDate"
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Dirección:
              </label>
              <input
                type="text"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="organization" className="form-label">
                Organización:
              </label>
              <input
                type="text"
                id="organization"
                onChange={(e) => setOrganization(e.target.value)}
                value={organization}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="position" className="form-label">
                Cargo:
              </label>
              <input
                type="text"
                id="position"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPassword ? "valid-icon" : "offscreen"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPassword || !password ? "offscreen" : "invalid-icon"}
                />
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                className="form-input"
              />
              <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 a 24 caracteres.<br />
                Debe incluir letras mayúsculas y minúsculas, un número y un carácter especial.<br />
                Caracteres especiales permitidos: <span aria-label="signo de exclamación">!</span> <span aria-label="símbolo de arroba">@</span> <span aria-label="almohadilla">#</span> <span aria-label="signo de dólar">$</span> <span aria-label="porcentaje">%</span>
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && confirmPassword ? "valid-icon" : "offscreen"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !confirmPassword ? "offscreen" : "invalid-icon"}
                />
              </label>
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setConfirmPasswordFocus(true)}
                onBlur={() => setConfirmPasswordFocus(false)}
                className="form-input"
              />
              <p id="confirmnote" className={confirmPasswordFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Debe coincidir con la primera entrada de contraseña.
              </p>
            </div>

            <button
              type="submit"
              disabled={!validEmail || !validPassword || !validMatch}
              className="register-button"
            >
              Registrarse
            </button>
          </form>
          <p className="login-link">
            ¿Ya estás registrado?{" "}
            <a href="/login">Iniciar Sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;