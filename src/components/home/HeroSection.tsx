import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { baseStorageUrl } from "../../supabaseClient";
import ButtonLink from "../ui/ButtonLink";

const profileImageUrl = `${baseStorageUrl}portfolio-assets/profile/gabriele.webp`;

export default function HeroSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="py-5 bg-hero-gradient text-white">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-6 ps-lg-5 p-lg-5">
            <h1 className="display-5 fw-bold mb-3">
              Tu porti le <span className="text-secondary">idee</span>.
              <br />
              Io le rendo <span className="text-secondary">reali</span>.
            </h1>
            <p className="lead mb-4">
              Ciao, sono Gabriele Todaro. Mi occupo di creare esperienze
              digitali complete, dove il codice pulito e l'architettura
              scalabile si uniscono per dare vita a progetti solidi, sicuri e
              progettati per durare.
            </p>
            <div className="d-flex flex-wrap gap-4">
              <ButtonLink to="/projects">Vedi progetti</ButtonLink>
              <ButtonLink to="/contact" variant="outline-light">
                Contattami
              </ButtonLink>
            </div>
          </div>

          <div className="col-12 col-lg-6 text-center pe-5 p-lg-5">
            <div className="d-inline-block position-relative overflow-hidden border border-5 border-secondary rounded-4">
              {!isImageLoaded && (
                <Skeleton
                  className="position-absolute top-0 start-0 w-100 h-100"
                  borderRadius={0}
                  containerClassName="d-block h-100"
                />
              )}
              <img
                src={profileImageUrl}
                alt="Gabriele Todaro"
                className={`d-block img-fluid rounded ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setIsImageLoaded(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
