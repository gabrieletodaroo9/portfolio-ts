import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light shadow-sm py-3">
        <div className="container-fluid px-md-5">
          
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src="https://pzlwltdgpzdfmvmttjff.supabase.co/storage/v1/object/public/portfolio-assets/profile/logo.webp" 
              alt="Logo" 
              height="30" 
            />
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarID">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarID">
            <div className="navbar-nav ms-auto fw-bold align-items-center gap-2 py-sm-0">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/projects" className="nav-link">Progetti</NavLink>
              <Link to="/contact" className="btn btn-secondary" >Contatti</Link>
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}