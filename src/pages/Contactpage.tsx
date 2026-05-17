import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ContactForm = {
  fullName: string;
  email: string;
  message: string;
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
        privacyAccepted: false,
      });
      navigate("/contact/success", {
        state: {
          fullName: formData.fullName,
        },
      });
    } catch {
      setErrorMessage("Si e verificato un errore durante l'invio. Controlla la connessione e riprova.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7">
            <div className="text-center mb-5">
              <h1 className="display-5 fw-bold mb-3">Definiamo insieme come implementare le tue idee.</h1>
              <p className="lead text-dark mb-0">
                Parlami del tuo progetto e capiremo subito come trasformare i tuoi requisiti in un'architettura digitale pronta.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Nome completo
                </label>
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  className="form-control"
                  required
                  value={formData.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Dettagli della richiesta
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                ></textarea>
              </div>

              <div className="form-check mb-4">
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
                {isLoading ? "Invio in corso..." : "Invia richiesta"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
