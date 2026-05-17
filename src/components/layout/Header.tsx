import { Link, NavLink } from "react-router-dom";
import { getPublicStorageUrl } from "../../supabaseClient";

export default function Header() {
  return (
    <header className="shadow-sm sticky-top bg-blur">
      <div className="container">
        <nav className="navbar navbar-expand-sm navbar-light py-3">
        <div className="container-fluid">
          
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src={getPublicStorageUrl("portfolio-assets/profile/logo.webp")}
              alt="Logo" 
              height="35" 
            />
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarID">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarID">
            <div className="navbar-nav ms-auto fw-bold align-items-center gap-2 py-sm-0">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/projects" className="nav-link">Progetti</NavLink>
              <Link to="/contact" className="btn btn-outline-secondary fw-semibold" >Inizia un progetto</Link>
            </div>
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
}
