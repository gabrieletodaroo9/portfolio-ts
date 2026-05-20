import { Link } from "react-router-dom";

type ErrorPageProps = {
  title?: string;
  message?: string;
  backTo?: string;
  backLabel?: string;
};

export default function ErrorPage({
  title = "Qualcosa non ha funzionato.",
  message = "Non e stato possibile completare l'operazione richiesta. Riprova tra qualche minuto.",
  backTo = "/",
  backLabel = "Torna alla home",
}: ErrorPageProps) {
  return (
    <section className="flex-grow-1 d-flex align-items-center py-5 text-dark">
      <div className="container">
        <div className="row align-items-stretch justify-content-center g-4">
          <div className="col-12 col-lg-5">
            <div className="h-100 d-flex flex-column justify-content-between p-4 p-lg-5 bg-transparent">
              <div>
                <span className="d-inline-flex align-items-center gap-2 mb-3 text-secondary fw-bold">
                  <i className="bi bi-exclamation-triangle"></i>
                  Errore
                </span>
                <h1 className="display-5 fw-bold mb-3">{title}</h1>
                <p className="lead text-dark mb-0">{message}</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="h-100 p-4 p-lg-5 bg-transparent border border-secondary rounded-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="text-secondary display-6">
                  <i className="bi bi-tools"></i>
                </span>
                <div>
                  <p className="text-secondary fw-bold mb-1">Stato temporaneo</p>
                  <h2 className="h4 fw-bold mb-0">Puoi continuare la navigazione</h2>
                </div>
              </div>

              <p className="text-dark mb-4">
                Se il problema si ripete, torna alla pagina principale e riprova ad aprire la sezione tra poco.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to={backTo} className="btn btn-secondary fw-semibold px-4">
                  {backLabel}
                </Link>
                <Link to="/contact" className="btn btn-outline-secondary fw-semibold px-4">
                  Contattami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
