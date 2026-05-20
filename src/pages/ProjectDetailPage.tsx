import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDetailsCard, { type ProjectDetailWithRelations } from "../components/projects/ProjectDetailsCard";
import ProjectDetailPageSkeleton from "../components/skeleton/ProjectDetailPageSkeleton";
import ErrorPage from "./ErrorPage";
import NotFoundPage from "./NotFoundPage";
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
          if (error.code === "PGRST116") {
            setErrorMessage("Progetto non trovato.");
            return;
          }

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
    return <ProjectDetailPageSkeleton />;
  }

  if (errorMessage || !project) {
    if (errorMessage === "Progetto non trovato.") {
      return <NotFoundPage />;
    }

    return (
      <ErrorPage
        title="Non e stato possibile caricare il progetto."
        message={errorMessage || "Il progetto richiesto non e disponibile in questo momento."}
        backTo="/projects"
        backLabel="Torna ai progetti"
      />
    );
  }

  return (
    <div className="container py-3 py-lg-5">
      <ProjectDetailsCard project={project} />
    </div>
  );
}
