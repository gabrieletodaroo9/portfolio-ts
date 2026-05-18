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
      <h1 className="display-3 fw-bold mb-4">{title}</h1>
      <p className="lead text-dark mb-0">{description}</p>
    </div>
  );
}
