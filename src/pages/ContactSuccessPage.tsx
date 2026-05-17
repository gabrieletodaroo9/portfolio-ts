import { Link, useLocation } from "react-router-dom";
import { getPublicStorageUrl } from "../supabaseClient";

type ContactSuccessState = {
  fullName?: string;
};

export default function ContactSuccessPage() {
  const location = useLocation();
  const state = location.state as ContactSuccessState | null;
  const fullName = state?.fullName;

  return (
    <section className="flex-grow-1 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="text-center">
              <img
                src={getPublicStorageUrl("portfolio-assets/profile/logo.webp")}
                alt="Logo portfolio"
                width={50}
                className="mb-4"
              />

              <p className="text-secondary fw-semibold text-uppercase small mb-3">
                Richiesta inviata
              </p>

              <h1 className="display-6 fw-bold mb-3">
                {fullName ? `Grazie ${fullName}, ho ricevuto il tuo messaggio.` : "Grazie, ho ricevuto il tuo messaggio."}
              </h1>

              <p className="lead text-dark mb-4">
                La tua richiesta e arrivata correttamente. La leggero con attenzione e ti rispondero appena possibile.
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
  );
}
