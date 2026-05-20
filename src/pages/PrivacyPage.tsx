import Seo from "../components/seo/Seo";

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy | Gabriele Todaro"
        description="Informativa privacy del portfolio di Gabriele Todaro: dati raccolti tramite il modulo contatti, finalita, conservazione e diritti."
        path="/privacy"
      />

      <section className="py-3 py-lg-5 text-dark">
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="p-2 p-lg-4 p-lg-5 bg-transparent rounded-4">
              <h1 className="display-6 fw-bold mb-3 text-secondary">Privacy</h1>
              <p className="lead mb-4">
                Questo sito raccoglie solo i dati inseriti volontariamente nel modulo contatti: nome, email e messaggio.
              </p>

              <div className="d-grid gap-4">
                <div>
                  <h2 className="h5 fw-bold">Finalità</h2>
                  <p className="mb-0">
                    I dati vengono usati esclusivamente per rispondere alla richiesta inviata e valutare un eventuale progetto.
                  </p>
                </div>

                <div>
                  <h2 className="h5 fw-bold">Conservazione</h2>
                  <p className="mb-0">
                    I messaggi vengono conservati solo per il tempo necessario a gestire la conversazione e non vengono venduti o ceduti.
                  </p>
                </div>

                <div>
                  <h2 className="h5 fw-bold">Diritti</h2>
                  <p className="mb-0">
                    Puoi chiedere accesso, rettifica o cancellazione dei dati scrivendo tramite il modulo contatti.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
