import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Pagina non trovata | Gabriele Todaro"
        description="La pagina richiesta non esiste o non e piu disponibile. Torna alla home o visita la sezione progetti del portfolio."
        path="/404"
      />

      <section className="flex-grow-1 d-flex align-items-center py-5 text-dark">
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="p-4 p-lg-5 bg-transparent rounded-4 text-center">
              <p className="text-secondary fw-bold mb-2">Errore 404</p>
              <h1 className="display-6 fw-bold mb-3">Pagina non trovata</h1>
              <p className="lead mb-4">
                Il link non e valido oppure la pagina non esiste piu.
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
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
    </>
  );
}
