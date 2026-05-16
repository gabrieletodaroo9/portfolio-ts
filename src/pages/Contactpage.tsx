import { useState, type SyntheticEvent } from "react";

type ContactForm = {
  fullName: string;
  email: string;
  message: string;
  privacyAccepted: boolean;
};

export default function Contactpage() {
  const [formData, setFormData] = useState<ContactForm>({
    fullName: "",
    email: "",
    message: "",
    privacyAccepted: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(fieldName: keyof ContactForm, value: string | boolean) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: value,
    }));
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message || !formData.privacyAccepted) {
      setErrorMessage("Compila tutti i campi e accetta la privacy policy.");
      return;
    }

    setErrorMessage("");
    console.log("Dati form contatto:", formData);
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

            <form className="" onSubmit={handleSubmit}>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Nome completo
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="form-control"
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
                  type="email"
                  className="form-control"
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
                  className="form-control"
                  rows={6}
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                ></textarea>
              </div>

              <div className="form-check mb-4">
                <input
                  id="privacyAccepted"
                  type="checkbox"
                  className="form-check-input"
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
                disabled={!formData.privacyAccepted}
              >
                Invia richiesta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
