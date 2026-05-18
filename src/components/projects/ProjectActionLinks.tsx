type ProjectActionLinksProps = {
  githubUrl: string | null;
  githubLabel?: string;
};

export default function ProjectActionLinks({
  githubUrl,
  githubLabel = "GitHub",
}: ProjectActionLinksProps) {
  if (!githubUrl) {
    return null;
  }

  return (
    <div className="d-flex flex-column flex-sm-row gap-3 border-top pt-4">
    
      {githubUrl && (
        <a
          href={githubUrl}
          className="btn btn-outline-secondary fw-semibold"
          target="_blank"
          rel="noreferrer"
        >
          {githubLabel}
        </a>
      )}
    </div>
  );
}
