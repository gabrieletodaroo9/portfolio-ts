import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectDetailsCard, { type ProjectDetailWithRelations } from "../components/projects/ProjectDetailsCard";
import { supabase } from "../supabaseClient";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<ProjectDetailWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchProject() {
      if (!slug) {
        setErrorMessage("Progetto non trovato.");
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("projects")
          .select(
            `
            *,
            types (
              name,
              color
            ),
            project_media (
              id,
              file_path,
              section,
              sort_order,
              type
            ),
            project_technology (
              section,
              technologies (
                id,
                name,
                img_url
              )
            )
          `,
          )
          .eq("slug", slug)
          .single();

        if (error) {
          setErrorMessage("Non e stato possibile caricare il progetto.");
          console.error(error);
          return;
        }

        setProject(data);
      } catch (error) {
        setErrorMessage("Si e verificato un errore durante il caricamento del progetto.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="alert alert-dark">Caricamento progetto...</div>
      </div>
    );
  }

  if (errorMessage || !project) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{errorMessage || "Progetto non trovato."}</div>
        <Link to="/projects" className="btn btn-outline-secondary">
          Torna ai progetti
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <ProjectDetailsCard project={project} />
    </div>
  );
}
