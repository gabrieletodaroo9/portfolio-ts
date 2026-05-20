import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo";

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
    <>
      <Seo
        title={`${title} | Gabriele Todaro`}
        description={message}
        path="/error"
      />

      <section className="flex-grow-1 d-flex align-items-center py-5 text-dark">
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="p-4 p-lg-5 bg-transparent rounded-4 text-center">
              <p className="text-secondary fw-bold mb-2">Errore</p>
              <h1 className="display-6 fw-bold mb-3">{title}</h1>
              <p className="lead mb-4">{message}</p>

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
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
    </>
  );
}
