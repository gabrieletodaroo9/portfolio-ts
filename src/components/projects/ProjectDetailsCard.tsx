import { useState } from "react";
import { Link } from "react-router-dom";
import { getPublicStorageUrl } from "../../supabaseClient";
import { type Tables } from "../../types/supabase";
import ProjectMediaCarousel, {
  type ProjectCarouselMedia,
} from "./ProjectMediaCarousel";

type ProjectMedia = Pick<
  Tables<"project_media">,
  "id" | "file_path" | "section" | "sort_order" | "type"
>;

type ProjectTechnology = {
  section: string | null;
  technologies: Pick<Tables<"technologies">, "id" | "name" | "img_url"> | null;
};

export type ProjectDetailWithRelations = Tables<"projects"> & {
  types: Pick<Tables<"types">, "name" | "color"> | null;
  project_media: ProjectMedia[];
  project_technology: ProjectTechnology[];
};

type ProjectDetailsCardProps = {
  project: ProjectDetailWithRelations;
};

type MediaSection = "frontend" | "backend";

function normalizeSection(section: string | null) {
  if (!section) {
    return "";
  }

  return section.trim().toLowerCase().replace("_", "-");
}

function isFrontendSection(section: string | null) {
  const normalizedSection = normalizeSection(section);

  return normalizedSection === "frontend" || normalizedSection === "front-end";
}

function isBackendSection(section: string | null) {
  const normalizedSection = normalizeSection(section);

  return normalizedSection === "backend" || normalizedSection === "back-end";
}

function hasSameFilePath(firstPath: string | null, secondPath: string) {
  if (!firstPath) {
    return false;
  }

  return firstPath === secondPath;
}

function sortMedia(mediaList: ProjectMedia[]) {
  return mediaList.sort((firstMedia, secondMedia) => {
    const firstOrder = firstMedia.sort_order ?? 0;
    const secondOrder = secondMedia.sort_order ?? 0;

    return firstOrder - secondOrder;
  });
}

function createImageMedia(id: number, filePath: string): ProjectCarouselMedia {
  return {
    id,
    file_path: filePath,
    type: "image",
  };
}

export default function ProjectDetailsCard({
  project,
}: ProjectDetailsCardProps) {
  const [selectedMediaSection, setSelectedMediaSection] =
    useState<MediaSection>("frontend");
  const categoryName = project.types?.name ?? "Uncategorized";
  const categoryColor = project.types?.color ?? "#6c757d";

  const frontendMedia = sortMedia(
    project.project_media.filter(
      (media) =>
        isFrontendSection(media.section) ||
        hasSameFilePath(project.frontend_img_url, media.file_path),
    ),
  );
  const backendMedia = sortMedia(
    project.project_media.filter(
      (media) =>
        isBackendSection(media.section) ||
        hasSameFilePath(project.backend_img_url, media.file_path),
    ),
  );

  const frontendTechnologies = project.project_technology.filter((item) =>
    isFrontendSection(item.section),
  );
  const backendTechnologies = project.project_technology.filter((item) =>
    isBackendSection(item.section),
  );
  const generalTechnologies = project.project_technology.filter(
    (item) =>
      !isFrontendSection(item.section) && !isBackendSection(item.section),
  );
  const hasFrontendAndBackend = project.has_frontend && project.has_backend;
  const projectCoverMedia = project.cover_img_url
    ? [createImageMedia(-3, project.cover_img_url)]
    : [];
  const frontendCarouselMedia = hasFrontendAndBackend
    ? frontendMedia
    : [...projectCoverMedia, ...project.project_media];
  const backendCarouselMedia = hasFrontendAndBackend
    ? backendMedia
    : [...projectCoverMedia, ...project.project_media];
  const hasFrontendMedia = frontendCarouselMedia.length > 0;
  const hasBackendMedia = backendCarouselMedia.length > 0;
  const hasBothMediaSections =
    hasFrontendAndBackend && hasFrontendMedia && hasBackendMedia;
  const activeMediaSection = hasFrontendAndBackend
    ? selectedMediaSection === "frontend" && hasFrontendMedia
      ? "frontend"
      : "backend"
    : project.has_frontend
      ? "frontend"
      : "backend";
  const selectedMediaList =
    activeMediaSection === "frontend"
      ? frontendCarouselMedia
      : backendCarouselMedia;
  const activeMediaTitle =
    activeMediaSection === "frontend" ? "Frontend" : "Backend";
  const activeMediaDescription =
    activeMediaSection === "frontend"
      ? project.frontend_description
      : project.backend_description;
  const activeMediaGithub =
    activeMediaSection === "frontend"
      ? project.frontend_link_github
      : project.backend_link_github;
  const hasSectionTechnologies =
    frontendTechnologies.length > 0 || backendTechnologies.length > 0;
  const shouldShowCoverImage = Boolean(
    project.cover_img_url && !hasFrontendAndBackend,
  );

  function showFrontendMedia() {
    setSelectedMediaSection("frontend");
  }

  function showBackendMedia() {
    setSelectedMediaSection("backend");
  }

  return (
    <article>
      <Link to="/projects" className="btn btn-outline-secondary mb-4">
        <i className="bi bi-arrow-left me-2"></i>
        Torna ai progetti
      </Link>

      <section className="row g-4 align-items-center mb-5">
        <div className={shouldShowCoverImage ? "col-12 col-lg-6" : "col-12"}>
          <span
            className="badge border px-3 py-2 mb-3"
            style={{ color: categoryColor, borderColor: categoryColor }}
          >
            {categoryName}
          </span>

          <h1 className="display-5 fw-bold mb-3">{project.title}</h1>
          <p className="lead text-dark mb-4">{project.description}</p>

          <div className="d-flex flex-column flex-sm-row gap-3">
            {project.link_live && (
              <a
                href={project.link_live}
                className="btn btn-secondary fw-semibold"
                target="_blank"
                rel="noreferrer"
              >
                Vedi live
              </a>
            )}

            {project.link_github && (
              <a
                href={project.link_github}
                className="btn btn-outline-secondary fw-semibold"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {shouldShowCoverImage && project.cover_img_url && (
          <div className="col-12 col-lg-6">
            <img
              src={getPublicStorageUrl(project.cover_img_url)}
              alt={project.title}
              className="img-fluid rounded border shadow-sm"
            />
          </div>
        )}
      </section>

      {generalTechnologies.length > 0 && (
        <section className="mb-5">
          <h2 className="h3 fw-bold mb-4">Tecnologie utilizzate</h2>

          <div className="d-flex flex-wrap gap-4">
            {generalTechnologies.map((item) =>
              item.technologies ? (
                <span
                  key={item.technologies.id}
                  className="d-inline-flex align-items-center gap-2 rounded-4 px-2 py-1"
                >
                  {item.technologies.img_url && (
                    <>
                      {" "}
                      <img
                        className="object-fit-contain"
                        src={getPublicStorageUrl(item.technologies.img_url)}
                        alt={item.technologies.name}
                        width={24}
                        height={24}
                      />
                      <span className="text-muted d-none d-md-inline">
                        {item.technologies.name}
                      </span>
                    </>
                  )}
                </span>
              ) : null,
            )}
          </div>
        </section>
      )}

      {hasSectionTechnologies && (
        <section className="border-top pt-5 mb-5">
          <h2 className="h3 fw-bold mb-4">Tecnologie</h2>

          <div className="row g-4">
            {frontendTechnologies.length > 0 && (
              <div className="col-12 col-lg-6">
                <h3 className="h5 fw-bold mb-3">Frontend</h3>

                <div className="d-flex flex-wrap gap-2">
                  {frontendTechnologies.map((item) =>
                    item.technologies ? (
                      <span
                        key={item.technologies.id}
                        className="badge text-bg-light border text-dark"
                      >
                        {item.technologies.name}
                      </span>
                    ) : null,
                  )}
                </div>
              </div>
            )}

            {backendTechnologies.length > 0 && (
              <div className="col-12 col-lg-6">
                <h3 className="h5 fw-bold mb-3">Backend</h3>

                <div className="d-flex flex-wrap gap-2">
                  {backendTechnologies.map((item) =>
                    item.technologies ? (
                      <span
                        key={item.technologies.id}
                        className="badge text-bg-light border text-dark"
                      >
                        {item.technologies.name}
                      </span>
                    ) : null,
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {(hasFrontendMedia || hasBackendMedia) && (
        <section className="border-top pt-5 mb-5">
          <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mb-4">
            <h2 className="h3 fw-bold mb-0">Dettagli {activeMediaTitle}</h2>

            {hasBothMediaSections && (
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn btn-sm ${activeMediaSection === "frontend" ? "btn-secondary" : "btn-outline-secondary"}`}
                  onClick={showFrontendMedia}
                >
                  Frontend
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeMediaSection === "backend" ? "btn-secondary" : "btn-outline-secondary"}`}
                  onClick={showBackendMedia}
                >
                  Backend
                </button>
              </div>
            )}
          </div>

          {(activeMediaDescription || activeMediaGithub) && (
            <div className="mb-4">
              {activeMediaDescription && (
                <p className="text-dark mb-3">{activeMediaDescription}</p>
              )}

              {activeMediaGithub && (
                <a
                  href={activeMediaGithub}
                  className="btn btn-outline-secondary fw-semibold"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  <i className="bi bi-github"> Github</i>
                </a>
              )}
            </div>
          )}

          {selectedMediaList.length > 0 && (
            <div className="d-flex justify-content-center align-items-center">
              <ProjectMediaCarousel
                key={activeMediaSection}
                mediaList={selectedMediaList}
                title={`${project.title} ${activeMediaSection}`}
              />
            </div>
          )}
        </section>
      )}
    </article>
  );
}
