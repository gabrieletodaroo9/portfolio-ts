import { useState } from "react";
import { Link } from "react-router-dom";
import { type Tables } from "../../types/supabase";
import ProjectActionLinks from "./ProjectActionLinks";
import ProjectDetailHeading from "./ProjectDetailHeading";
import { type ProjectCarouselMedia } from "./ProjectMediaCarousel";
import ProjectMediaPanel from "./ProjectMediaPanel";
import {
  ProjectTechnologyIcons,
  type ProjectTechnologyItem,
} from "./ProjectTechnologyList";
import Icon from "../ui/Icon";

type ProjectMedia = Pick<
  Tables<"project_media">,
  "id" | "file_path" | "section" | "sort_order" | "type"
>;

type ProjectTechnology = {
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

function sortMedia(mediaList: ProjectMedia[]) {
  return [...mediaList].sort(
    (firstMedia, secondMedia) =>
      (firstMedia.sort_order ?? 0) - (secondMedia.sort_order ?? 0),
  );
}

function createCoverMedia(filePath: string): ProjectCarouselMedia {
  return {
    id: -1,
    file_path: filePath,
    type: "image",
  };
}

function getTechnologyItems(
  technologies: ProjectTechnology[],
): ProjectTechnologyItem[] {
  return technologies.map((item) => item.technologies!);
}

export default function ProjectDetailsCard({
  project,
}: ProjectDetailsCardProps) {
  const [selectedMediaSection, setSelectedMediaSection] =
    useState<MediaSection>("frontend");

  const isFullStack = project.has_frontend && project.has_backend;
  const frontendMedia = sortMedia(
    project.project_media.filter((media) => media.section === "frontend"),
  );
  const backendMedia = sortMedia(
    project.project_media.filter((media) => media.section === "backend"),
  );
  const singleProjectMedia = project.cover_img_url
    ? [createCoverMedia(project.cover_img_url), ...sortMedia(project.project_media)]
    : sortMedia(project.project_media);

  const activeMedia =
    selectedMediaSection === "frontend" ? frontendMedia : backendMedia;
  const activeDescription =
    selectedMediaSection === "frontend"
      ? project.frontend_description
      : project.backend_description;
  const activeGithub =
    selectedMediaSection === "frontend"
      ? project.frontend_link_github
      : project.backend_link_github;
  const singleProjectDescription =
    project.frontend_description || project.backend_description;
  const singleProjectGithub =
    project.link_github ||
    project.frontend_link_github ||
    project.backend_link_github;
  const categoryName = project.types!.name;
  const categoryColor = project.types!.color;

  function renderSectionToggle() {
    return (
      <div
        className={`project-section-switch ${selectedMediaSection === "backend" ? "is-backend" : "is-frontend"}`}
        role="tablist"
        aria-label="Sezioni progetto"
      >
        <button
          type="button"
          className="project-section-switch-option"
          onClick={() => setSelectedMediaSection("frontend")}
          aria-selected={selectedMediaSection === "frontend"}
          role="tab"
        >
          Frontend
        </button>
        <button
          type="button"
          className="project-section-switch-option"
          onClick={() => setSelectedMediaSection("backend")}
          aria-selected={selectedMediaSection === "backend"}
          role="tab"
        >
          Backend
        </button>
      </div>
    );
  }

  function renderPanelBody(description: string | null, githubUrl: string | null) {
    if (!description && !githubUrl) {
      return null;
    }

    return (
      <div className="mb-4">
        {description && <p className="text-dark mb-3">{description}</p>}

        {githubUrl && (
          <a
            href={githubUrl}
            className="btn btn-secondary btn-sm border-0 fw-semibold"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" className="me-2" />
             Vedi su GitHub
          </a>
        )}
      </div>
    );
  }

  return (
    <article>
      <div className="d-flex align-items-center justify-content-between mb-3 mb-md-4">
        <Link to="/projects" className="project-back-link btn border-0 pt-0 btn-outline-secondary">
          <Icon name="arrow-left" className="me-2" />
          Torna ai progetti
        </Link>

        <span
          className="badge px-3 py-2 flex-shrink-0 text-uppercase"
          style={{ color: categoryColor, borderColor: categoryColor }}
        >
           {categoryName}
        </span>
      </div>

      {isFullStack ? (
        <section className="row g-5 align-items-center mb-5">
          <div className="col-12 col-md-5">
            <ProjectDetailHeading
              title={project.title}
              description={project.description}
            />

            {project.project_technology.length > 0 && (
              <div className="border-top pt-4 mb-lg-4">
                <h2 className="h5 fw-bold mb-3">Tecnologie utilizzate</h2>
                <ProjectTechnologyIcons
                  technologies={getTechnologyItems(project.project_technology)}
                />
              </div>
            )}

            <ProjectActionLinks
              githubUrl={project.link_github}
            />
          </div>

          <div className="col-12 col-md-7">
            <ProjectMediaPanel
              mediaList={activeMedia}
              carouselTitle={`${project.title} ${selectedMediaSection}`}
              headerActions={renderSectionToggle()}
              body={renderPanelBody(activeDescription, activeGithub)}
              animationKey={selectedMediaSection}
            />
          </div>
        </section>
      ) : (
        <section className="mb-5">
          <div className="row g-5 align-items-start">
            <div className="col-12 col-lg-5">
              <ProjectDetailHeading
                title={project.title}
                description={project.description}
              />

              {singleProjectDescription && (
                <div className="border-top pt-4 mb-4">
                  <h2 className="h5 fw-bold mb-3">Dettagli progetto</h2>
                  <p className="text-dark mb-0">{singleProjectDescription}</p>
                </div>
              )}

              {project.project_technology.length > 0 && (
                <div className="border-top pt-4 mb-4">
                  <h2 className="h5 fw-bold mb-3">Tecnologie utilizzate</h2>
                  <ProjectTechnologyIcons
                    technologies={getTechnologyItems(project.project_technology)}
                  />
                </div>
              )}

              <ProjectActionLinks
                githubUrl={singleProjectGithub}
              />
            </div>

            <div className="col-12 col-lg-7 mt-4 pt-lg-5">
              <ProjectMediaPanel
                mediaList={singleProjectMedia}
                carouselTitle={project.title}
              />
            </div>
          </div>
        </section>
      )}

    </article>
  );
}
