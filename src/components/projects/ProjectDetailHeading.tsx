type ProjectDetailHeadingProps = {
  categoryName: string;
  categoryColor: string;
  title: string;
  description: string;
};

export default function ProjectDetailHeading({
  categoryName,
  categoryColor,
  title,
  description,
}: ProjectDetailHeadingProps) {
  return (
    <div className="mb-4">
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
        <h1 className="display-3 fw-bold mb-0">{title}</h1>

        <span
          className="badge border px-3 py-2 shadow-sm flex-shrink-0"
          style={{ color: categoryColor, borderColor: categoryColor }}
        >
          Progetto {categoryName}
        </span>
      </div>

      <p className="lead text-dark mb-0">{description}</p>
    </div>
  );
}
