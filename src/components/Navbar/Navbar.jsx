import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>TicketBo</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/events" className="navbar-link">
            Eventos
          </Link>
        </li>
        <li>
          <Link to="/createEvent" className="navbar-link">
            Crear evento
          </Link>
        </li>
        {user ? (
          <li className="avatar-dropdown">
            <div className="avatar" onClick={toggleDropdown}>
              C
            </div>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link to="/my-events" onClick={() => setShowDropdown(false)}>
                    Mis Eventos
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Cerrar sesión</a>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li>
            <Link to="/login" className="navbar-link">
              Iniciar sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;