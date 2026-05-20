import { useState } from "react";
import { baseStorageUrl } from "../../supabaseClient";
import HeroImageSkeleton from "../skeleton/HeroImageSkeleton";
import ButtonLink from "../ui/ButtonLink";

const profileImageUrl = `${baseStorageUrl}portfolio-assets/profile/gabriele.webp`;

export default function HeroSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="py-5 bg-hero-gradient text-white">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
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
            <div className="d-flex flex-wrap align-items-center gap-3 gap-lg-4">
              <ButtonLink to="/contact">Inizia un progetto</ButtonLink>
              <ButtonLink to="/projects" variant="outline-light">
                Guarda i miei lavori <i className="bi bi-arrow-right ms-2"></i>
              </ButtonLink>
            </div>
          </div>

          <div className="col-12 col-lg-6 p-lg-5">
            <div
              className="ratio ratio-1x1 d-inline-block position-relative overflow-hidden border border-5 border-secondary rounded-4"
              style={{ maxWidth: "400px" }}
            >
              {" "}
              {!isImageLoaded && (
                <HeroImageSkeleton />
              )}
              <img
                src={profileImageUrl}
                alt="Gabriele Todaro"
                className={`w-100 h-100 object-fit-cover rounded ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
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
