import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getPublicStorageUrl } from "../../supabaseClient";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header className="site-header shadow-sm sticky-top bg-blur">
        <div className="container">
          <nav className="navbar navbar-expand-sm navbar-light py-3">
            <div className="container-fluid">
              <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
                <img
                  src={getPublicStorageUrl("portfolio-assets/profile/logo.webp")}
                  alt="Logo"
                  height="35"
                />
              </Link>

              <button
                className={`navbar-toggler navbar-menu-toggle border-0 ${isMenuOpen ? "is-open" : ""}`}
                type="button"
                aria-controls="navbarID"
                aria-expanded={isMenuOpen}
                aria-label="Apri o chiudi il menu"
                onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarID">
                <div className="navbar-nav ms-auto fw-bold align-items-center gap-2 gap-lg-4 py-sm-0">
                  <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
                  <NavLink to="/projects" className="nav-link" onClick={closeMenu}>Progetti</NavLink>
                  <Link to="/contact" className="btn btn-outline-secondary fw-semibold" onClick={closeMenu}>Inizia un progetto</Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <button
          type="button"
          className="navbar-mobile-backdrop d-sm-none"
          aria-label="Chiudi il menu"
          onClick={closeMenu}
        ></button>
      )}
    </>
  );
}
