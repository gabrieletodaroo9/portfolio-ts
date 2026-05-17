import { baseStorageUrl } from "../../supabaseClient";
import ButtonLink from "../ui/ButtonLink";

const profileImageUrl = `${baseStorageUrl}portfolio-assets/profile/gabriele.webp`;

export default function HeroSection() {
  return (
    <section className="py-5 bg-hero-gradient text-white">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-6 ps-lg-5 p-lg-5">
            <h1 className="display-5 fw-bold mb-3">
              Tu porti le idee.
              <br />
              Io le rendo reali.
            </h1>
            <p className="lead mb-4">
              Ciao, sono Gabriele Todaro. Mi occupo di creare esperienze
              digitali complete, dove il codice pulito e l'architettura
              scalabile si uniscono per dare vita a progetti solidi, sicuri e
              progettati per durare.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <ButtonLink to="/projects">Vedi progetti</ButtonLink>
              <ButtonLink to="/contact" variant="outline-light">
                Contattami
              </ButtonLink>
            </div>
          </div>

          <div className="col-12 col-lg-6 text-center pe-5 p-lg-5">
            <div className="border border-5 border-secondary rounded-4">
              <img
                src={profileImageUrl}
                alt="Gabriele Todaro"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
