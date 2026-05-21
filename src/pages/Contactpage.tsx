import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Icon from "../components/ui/Icon";

type ContactForm = {
  fullName: string;
  email: string;
  message: string;
  website: string;
  privacyAccepted: boolean;
};

type Web3FormsResponse = {
  success: boolean;
  message?: string;
};

type ContactSubmitEvent = {
  preventDefault: () => void;
  currentTarget: HTMLFormElement;
};

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const emailFromName = "Portfolio - Richiesta progetto";

export default function Contactpage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactForm>({
    fullName: "",
    email: "",
    message: "",
    website: "",
    privacyAccepted: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateField(fieldName: keyof ContactForm, value: string | boolean) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: value,
    }));
  }

  async function handleSubmit(event: ContactSubmitEvent) {
    event.preventDefault();

    if (formData.website.trim()) {
      navigate("/", {
        state: {
          contactMessageSent: true,
        },
      });
      return;
    }

    if (!formData.fullName || !formData.email || !formData.message || !formData.privacyAccepted) {
      setErrorMessage("Compila tutti i campi e accetta la privacy policy.");
      return;
    }

    if (!accessKey) {
      setErrorMessage("Chiave Web3Forms mancante. Controlla il file .env.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const web3FormsData = new FormData();

      web3FormsData.append("access_key", accessKey);
      web3FormsData.append("subject", `Nuova richiesta progetto da ${formData.fullName}`);
      web3FormsData.append("from_name", emailFromName);
      web3FormsData.append("replyto", formData.email);
      web3FormsData.append("botcheck", formData.website);

      // Questi campi vengono mostrati nel corpo dell'email con etichette piu leggibili.
      web3FormsData.append("Nome completo", formData.fullName);
      web3FormsData.append("Email contatto", formData.email);
      web3FormsData.append("Messaggio", formData.message);
      web3FormsData.append("Privacy policy", "Accettata");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormsData,
      });

      const data = (await response.json()) as Web3FormsResponse;

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Invio non riuscito. Riprova tra qualche minuto.");
        return;
      }

      setFormData({
        fullName: "",
        email: "",
        message: "",
        website: "",
        privacyAccepted: false,
      });
      navigate("/", {
        state: {
          contactMessageSent: true,
        },
      });
    } catch {
      setErrorMessage("Si e verificato un errore durante l'invio. Controlla la connessione e riprova.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Seo
        title="Contatti | Gabriele Todaro"
        description="Contatta Gabriele Todaro per parlare del tuo progetto web, ricevere una prima analisi e valutare una collaborazione full-stack."
        path="/contact"
      />

      <section className="py-3 py-lg-5 text-dark">
        <div className="container">
        <div className="row align-items-stretch g-4">
          <div className="col-12 col-lg-5">
            <div className="h-100 d-flex flex-column justify-content-between p-lg-4 p-lg-5 bg-transparent">
              <div>
                <h1 className="display-5 fw-bold mb-3">Definiamo insieme come implementare le tue <span className="text-secondary">idee</span>.</h1>
                <p className="lead text-dark mb-4">
                  Parlami del tuo progetto e capiremo subito come trasformare i tuoi requisiti in un'architettura digitale pronta.
                </p>
              </div>

              <div className="d-grid gap-3">

                <div className="d-flex gap-3">
                  <span className="text-secondary fs-4">
                    <Icon name="diagram-3" />
                  </span>
                  <div>
                    <h2 className="h6 fw-bold mb-1">Prima analisi chiara</h2>
                    <p className="text-dark mb-0">
                      Scrivi obiettivi, funzionalita e priorita del tuo progetto. Ti rispondero con un'analisi dettagliata di come realizzarlo al meglio, con stima dei tempi e dei costi.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <span className="text-secondary fs-4">
                    <Icon name="shield-check" />
                  </span>
                  <div>
                    <h2 className="h6 fw-bold mb-1">Dati protetti</h2>
                    <p className="text-dark mb-0">
                      Usero le informazioni inviate solo per ricontattarti riguardo alla richiesta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7 p-4 p-lg-5">
            <div className="p-4 p-lg-5 bg-white text-dark rounded-4 shadow-lg">
              <form className="contact-form" onSubmit={handleSubmit}>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="fullName" className="form-label fw-semibold">
                      Nome completo
                    </label>
                    <input
                      id="fullName"
                      name="name"
                      type="text"
                      className="form-control form-control-sm-sm form-control-lg-lg"
                      placeholder="Es. Mario Rossi"
                      required
                      value={formData.fullName}
                      onChange={(event) => updateField("fullName", event.target.value)}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control form-control-sm-sm form-control-lg-lg"
                      placeholder="nome@email.com"
                      required
                      value={formData.email}
                      onChange={(event) => updateField("email", event.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Messaggio
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control form-control-sm-sm form-control-lg-lg"
                      rows={3}
                      placeholder="Descrivi qui la tua richiesta..."
                      required
                      value={formData.message}
                      onChange={(event) => updateField("message", event.target.value)}
                    ></textarea>
                  </div>

                  <div className="visually-hidden" aria-hidden="true">
                    <label htmlFor="website">Sito web</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(event) => updateField("website", event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-check my-3 my-lg-4">
                  <input
                    id="privacyAccepted"
                    name="privacy_accepted"
                    type="checkbox"
                    className="form-check-input"
                    required
                    checked={formData.privacyAccepted}
                    onChange={(event) => updateField("privacyAccepted", event.target.checked)}
                  />
                  <label htmlFor="privacyAccepted" className="form-check-label">
                    Dichiaro di aver letto e accettato la Privacy Policy e acconsento al trattamento dei miei dati personali.
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary w-100 fw-semibold"
                  disabled={isLoading || !formData.privacyAccepted}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      Invia richiesta
                      <Icon name="send" className="ms-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
