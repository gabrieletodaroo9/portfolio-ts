import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getPublicStorageUrl, supabase } from "../../supabaseClient";
import { type Tables } from "../../types/supabase";

function TechnologiesSkeleton() {
  return (
    <div className="row g-4" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="col-4 d-none d-lg-flex flex-column align-items-center"
        >
          <Skeleton width={60} height={60} borderRadius={12} />
        </div>
      ))}
    </div>
  );
}

export default function ThinkingSection() {
  const [technologies, setTechnologies] = useState<Tables<"technologies">[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function fetchTechnologies() {
      try {
        const { data, error } = await supabase.from("technologies").select("*")
        if (error) {
          setErrorMessage("Non è stato possibile caricare le tecnologie.")
          console.error(error)
          return
        }
        setTechnologies(data)
      } catch (error) {
        setErrorMessage(
          "Si è verificato un errore durante il caricamento delle tecnologie.",
        );
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTechnologies()
  }, [])

  return (
    <section className="py-3 py-lg-5">
      <div className="container py-lg-5">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-3">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            {isLoading ? (
              <TechnologiesSkeleton />
            ) : (
              <div className="row g-4">
                {technologies.map((technology) => (
                  <div
                    key={technology.id}
                    className="col-6  d-none d-lg-flex flex-column align-items-center "
                  >
                    {technology.img_url && (
                      <img
                        src={getPublicStorageUrl(technology.img_url)}
                        alt={technology.name}
                        style={{ height: "60px", width: "60px" }}
                        className="object-fit-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-12 col-lg-9 p-lg-5" >
            <p className="mb-0 ps-lg-5 fw-semibold" style={{ fontSize: "1.4rem" }}>
              Mi piace quando dietro un progetto c’è un filo logico. Per me
              programmare non è solo far funzionare le cose ma farlo bene,
              scrivendo codice pulito e organizzando il lavoro perché tutto sia
              fluido e facile da gestire. Punto molto sulla curiosità e sulla
              voglia di capire cosa succede "sotto il cofano". Mi piace avere la
              visione d’insieme, dalla struttura del database fino al momento in
              cui il sito è finalmente online. Traduco idee in progetti
              concreti, puntando tutto su utilità e semplicità d'uso.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
