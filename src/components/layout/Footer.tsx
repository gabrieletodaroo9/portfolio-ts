import { Link, NavLink } from "react-router-dom";

const githubUrl = "https://github.com/gabrieletodaroo9";
const linkedinUrl = "https://www.linkedin.com/in/gabriele-todaro-dev";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h2 className="h5 fw-bold mb-3">
              Gabriele <span className="text-secondary">T.</span>
            </h2>
            <p className="text-white-50 mb-4">
              Sviluppatore Full-Stack specializzato in esperienze digitali moderne e performanti.
            </p>
            <div className="d-flex gap-3">
              <a
                href={githubUrl}
                className="text-white-50 fs-5"
                target="_blank"
                rel="noreferrer"
                aria-label="Profilo GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href={linkedinUrl}
                className="text-white-50 fs-5"
                target="_blank"
                rel="noreferrer"
                aria-label="Profilo LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <h2 className="h5 fw-bold mb-3">Menu</h2>
            <nav className="d-flex flex-column gap-2">
              <NavLink to="/" className="text-white-50 text-decoration-none">
                Home
              </NavLink>
              <NavLink to="/projects" className="text-white-50 text-decoration-none">
                Progetti
              </NavLink>
              <NavLink to="/contact" className="text-white-50 text-decoration-none">
                Contatti
              </NavLink>
            </nav>
          </div>

          <div className="col-12 col-md-5">
            <h2 className="h5 fw-bold mb-4">Pronto a rendere reale la tua idea?</h2>
            <Link to="/contact" className="btn btn-secondary fw-bold w-100">
              Inizia qui
            </Link>
          </div>
        </div>

        <div className="border-top border-secondary mt-5 pt-4 d-flex flex-column flex-md-row justify-content-between gap-3">
          <p className="text-white-50 mb-0">
            &copy; {new Date().getFullYear()} Gabriele T. Tutti i diritti riservati.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3">
            <Link to="/" className="text-white-50 text-decoration-none">
              Privacy Policy
            </Link>
            <Link to="/" className="text-white-50 text-decoration-none">
              Termini e Condizioni
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
