import { getPublicStorageUrl } from "../../supabaseClient";

export type ProjectTechnologyItem = {
  id: number;
  name: string;
  img_url: string | null;
};

type ProjectTechnologyListProps = {
  technologies: ProjectTechnologyItem[];
};

export function ProjectTechnologyIcons({
  technologies,
}: ProjectTechnologyListProps) {
  return (
    <div className="d-flex flex-wrap gap-3">
      {technologies.map((technology) => (
        <span
          key={technology.id}
          className="d-inline-flex align-items-center gap-2 rounded-4 px-2 py-1"
        >
          {technology.img_url && (
            <img
              className="object-fit-contain"
              src={getPublicStorageUrl(technology.img_url)}
              alt={technology.name}
              width={24}
              height={24}
            />
          )}
          <span className="text-muted small d-none d-md-inline">
            {technology.name}
          </span>
        </span>
      ))}
    </div>
  );
}

export function ProjectTechnologyBadges({
  technologies,
}: ProjectTechnologyListProps) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <span
          key={technology.id}
          className="badge text-bg-light border text-dark"
        >
          {technology.name}
        </span>
      ))}
    </div>
  );
}
