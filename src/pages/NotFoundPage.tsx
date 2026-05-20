import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="flex-grow-1 d-flex align-items-center py-5 text-dark">
      <div className="container">
        <div className="row align-items-stretch justify-content-center g-4">
          <div className="col-12 col-lg-5">
            <div className="h-100 d-flex flex-column justify-content-between p-4 p-lg-5 bg-transparent">
              <div>
                <span className="d-inline-flex align-items-center gap-2 mb-3 text-secondary fw-bold">
                  <i className="bi bi-compass"></i>
                  Pagina 404
                </span>
                <h1 className="display-5 fw-bold mb-3">
                  Questa pagina non e stata <span className="text-secondary">trovata</span>.
                </h1>
                <p className="lead text-dark mb-0">
                  Il link potrebbe essere cambiato, oppure la pagina che stai cercando non esiste piu nel portfolio.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="h-100 p-4 p-lg-5 bg-transparent border border-secondary rounded-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="text-secondary display-6">
                  <i className="bi bi-signpost-split"></i>
                </span>
                <div>
                  <p className="text-secondary fw-bold mb-1">Percorso interrotto</p>
                  <h2 className="h4 fw-bold mb-0">Riparti da una sezione valida</h2>
                </div>
              </div>

              <p className="text-dark mb-4">
                Puoi tornare alla home oppure visitare la raccolta progetti per continuare la navigazione.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/" className="btn btn-secondary fw-semibold px-4">
                  Torna alla home
                </Link>
                <Link to="/projects" className="btn btn-outline-secondary fw-semibold px-4">
                  Vedi i progetti
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
