import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light shadow-sm">
        <div className="container-fluid px-md-5">
          
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="https://pzlwltdgpzdfmvmttjff.supabase.co/storage/v1/object/public/portfolio-assets/profile/logo.webp" alt="Logo" height="30" className="d-inline-block align-text-top"/>
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarID">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarID">
            <div className="navbar-nav ms-auto fw-bold py-2">
             <Link to="/" className="nav-link">Home</Link>
             <Link to="/projects" className="nav-link">Progetti</Link>
            </div>
          </div>

        </div>
      </nav>
    </header>
  )
}