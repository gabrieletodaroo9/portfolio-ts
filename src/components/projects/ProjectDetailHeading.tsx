type ProjectDetailHeadingProps = {
  title: string;
  description: string;
};

export default function ProjectDetailHeading({
  title,
  description,
}: ProjectDetailHeadingProps) {
  return (
    <div className="mb-4">
      <h1 className="project-detail-title fw-bold mb-3 mb-md-4">{title}</h1>
      <p className="project-detail-description text-dark mb-0">{description}</p>
    </div>
  );
}
