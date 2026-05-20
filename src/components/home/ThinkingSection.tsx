import { useEffect, useState } from "react";
import { getPublicStorageUrl, supabase } from "../../supabaseClient";
import { type Tables } from "../../types/supabase";
import TechnologyIconSkeleton from "../skeleton/TechnologyIconSkeleton";
import TechnologiesSkeleton from "../skeleton/TechnologiesSkeleton";

function TechnologyIcon({
  technology,
}: {
  technology: Tables<"technologies">;
}) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  if (!technology.img_url) return null;

  return (
    <div className="col-6 d-none d-lg-flex flex-column align-items-center">
      <div
        className="position-relative"
        style={{ height: "60px", width: "60px" }}
      >
        {!isImgLoaded && <TechnologyIconSkeleton />}

        <img
          src={getPublicStorageUrl(technology.img_url)}
          alt={technology.name}
          loading="lazy"
          style={{ height: "60px", width: "60px" }}
          className={`object-fit-contain transition-opacity ${
            isImgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImgLoaded(true)}
          onError={() => setIsImgLoaded(true)}
        />
      </div>
    </div>
  );
}

export default function ThinkingSection() {
  const [technologies, setTechnologies] = useState<Tables<"technologies">[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchTechnologies() {
      try {
        const { data, error } = await supabase.from("technologies").select("*");
        if (error) {
          setErrorMessage("Non e stato possibile caricare le tecnologie.");
          console.error(error);
          return;
        }

        setTechnologies(data);
      } catch (error) {
        setErrorMessage(
          "Si e verificato un errore durante il caricamento delle tecnologie.",
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTechnologies();
  }, []);

  return (
    <section className="py-4 py-lg-5 mb-0">
      <div className="container py-lg-4">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-12 col-lg-3">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            {isLoading ? (
              <TechnologiesSkeleton />
            ) : (
              <div className="row g-4">
                {technologies.map((technology) => (
                  <TechnologyIcon key={technology.id} technology={technology} />
                ))}
              </div>
            )}
          </div>

          <div className="col-12 col-lg-9 p-lg-4">
            <article
              className="position-relative rounded-5 overflow-hidden ms-lg-4 p-4 p-lg-5 mb-4 bg-white shadow-sm"
              style={{
                borderLeft: "5px solid #f17f1d",
                borderTop: "1px solid rgba(22, 25, 28, 0.08)",
                borderRight: "1px solid rgba(22, 25, 28, 0.08)",
                borderBottom: "1px solid rgba(22, 25, 28, 0.08)",
              }}
            >
              <p className="home-thinking-text mb-0 fw-semibold text-dark-emphasis">
                Mi piace quando dietro un progetto c'è un filo logico. Per me
                programmare non è solo far funzionare le cose ma farlo bene,
                scrivendo codice pulito e organizzando il lavoro perché tutto
                sia fluido e facile da gestire. Punto molto sulla curiosità e
                sulla voglia di capire cosa succede "sotto il cofano". Mi piace
                avere la visione d'insieme, dalla struttura del database fino al
                momento in cui il sito è finalmente online. Traduco idee in
                progetti concreti, puntando tutto su utilità e semplicità d'uso.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
