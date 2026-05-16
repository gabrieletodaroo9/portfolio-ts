type ValueCard = {
  iconClass: string;
  title: string;
  description: string;
};

const valueCards: ValueCard[] = [
  {
    iconClass: "bi bi-code-slash",
    title: "Architetture Full-Stack",
    description:
      "Progetto e realizzo ecosistemi digitali completi, curando ogni aspetto dalla logica server all'interfaccia finale.",
  },
  {
    iconClass: "bi bi-layers",
    title: "Interfacce Intuitive",
    description:
      "Sviluppo interfacce pulite e reattive, dove ogni elemento è al posto giusto per rendere la navigazione semplice e piacevole.",
  },
  {
    iconClass: "bi bi-lightning-charge",
    title: "Performance & API",
    description:
      "Costruisco API robuste e scalabili, ottimizzando velocità e sicurezza per garantire uno scambio dati sempre fluido, rapido e protetto.",
  },
];

function ValueFeatureCard({ iconClass, title, description }: ValueCard) {
  return (
    <article className="card h-100 border-0 shadow">
      <div className="card-body d-flex flex-column p-4">
        <div className="text-center">
          <span className="d-inline-flex align-items-center justify-content-center fs-2 pb-1 text-secondary">
            <i className={iconClass}></i>
          </span>
        </div>

        <h1 className="h4 fw-bold text-center mb-2">{title}</h1>
        <p className="text-center text-dark mb-0">{description}</p>
      </div>
    </article>
  );
}

export default function ValuesSection() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">
          {valueCards.map((card) => (
            <div key={card.title} className="col-12 col-md-4">
              <ValueFeatureCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
