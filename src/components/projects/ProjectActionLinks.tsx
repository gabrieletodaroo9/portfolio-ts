type ProjectActionLinksProps = {
  githubUrl: string | null;
  githubLabel?: string;
};

export default function ProjectActionLinks({
  githubUrl,
  githubLabel = "Vedi su GitHub",
}: ProjectActionLinksProps) {
  if (!githubUrl) {
    return null;
  }

  return (
    <div className="d-flex flex-column flex-sm-row align-items-start gap-3 border-top pt-4 pt-md-4">
    
      {githubUrl && (
        <a
          href={githubUrl}
          className="btn btn-secondary btn-sm border-0 fw-semibold"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-github me-2"></i>
          {githubLabel}
        </a>
      )}
    </div>
  );
}
