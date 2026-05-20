import { useState } from "react";
import { Link } from "react-router-dom";
import { getPublicStorageUrl } from "../../supabaseClient";
import { type Tables } from "../../types/supabase";
import ProjectCoverSkeleton from "../skeleton/ProjectCoverSkeleton";

export type ProjectWithRelations = Tables<"projects"> & {
  types: Pick<Tables<"types">, "name" | "color"> | null;
  project_technology: {
    technologies: Pick<Tables<"technologies">, "id" | "name" | "img_url"> | null;
  }[];
};

type ProjectCardProps = {
  project: ProjectWithRelations;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isCoverLoaded, setIsCoverLoaded] = useState(false);
  const categoryName = project.types?.name ?? "Uncategorized";
  const categoryColor = project.types?.color ?? "#6c757d";

  const hiddenTechnologiesCount = Math.max(
    project.project_technology.length - 5,
    0
  );
  const visibleTechnologies =
    hiddenTechnologiesCount > 0
      ? project.project_technology.slice(0, 5)
      : project.project_technology.slice(0, 6);

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="project-card-link text-decoration-none text-reset"
    >
      <article className="card h-100 border shadow-sm overflow-hidden bg-light rounded-3 d-flex flex-column">
        {project.cover_img_url && (
    
          <div className="ratio ratio-16x9 position-relative overflow-hidden bg-secondary-subtle">

            {!isCoverLoaded && (
              <ProjectCoverSkeleton />
            )}
            
            <img
              src={getPublicStorageUrl(project.cover_img_url)}
              alt={project.title}
              className={`position-absolute top-0 start-0 w-100 h-100 object-fit-cover`}
              style={{ 
                transition: "opacity 0.2s ease-in-out",
                opacity: isCoverLoaded ? 1 : 0 
              }}
              onLoad={() => setIsCoverLoaded(true)}
              onError={() => setIsCoverLoaded(true)}
            />
          </div>
        )}

        <div className="card-body d-flex flex-column p-3 flex-grow-1">
          <h2 className="h4 fw-bold text-dark mb-3">{project.title}</h2>

          <div className="mt-auto d-flex align-items-center border-top border-1 pt-3 justify-content-between gap-3" style={{ minHeight: "40px" }}>
            <div className="d-flex align-items-center gap-2">
              {visibleTechnologies.map((item) =>
                item.technologies?.img_url ? (
                  <img
                    key={item.technologies.id}
                    src={getPublicStorageUrl(item.technologies.img_url)}
                    alt={item.technologies.name}
                    width="24"
                    height="24"
                    className="rounded object-fit-contain"
                  />
                ) : null
              )}

              {hiddenTechnologiesCount > 0 && (
                <span
                  className="d-inline-flex align-items-center justify-content-center small text-secondary fw-semibold"
                  style={{ width: "24px", height: "24px" }}
                >
                  +{hiddenTechnologiesCount}
                </span>
              )}
            </div>

            <span
              className="badge border px-3 py-2"
              style={{ color: categoryColor, borderColor: categoryColor }}
            >
              {categoryName}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
