import { useEffect, useState } from "react";
import ProjectCard, { type ProjectWithRelations } from "../components/projects/ProjectCard";
import ProjectsFilters from "../components/projects/ProjectsFilters";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsCardsSkeleton from "../components/skeleton/ProjectsCardsSkeleton";
import { supabase } from "../supabaseClient";
import { type Tables } from "../types/supabase";

export default function Projectspage() {
  const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
  const [categories, setCategories] = useState<Tables<"types">[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchProjectsPageData() {
      try {
        const [projectsResponse, categoriesResponse] = await Promise.all([
          supabase
            .from("projects")
            .select(
              `
              *,
              types (
                name,
                color
              ),
              project_technology (
                technologies (
                  id,
                  name,
                  img_url
                )
              )
            `
            )
            .order("id", { ascending: false }),
          supabase.from("types").select("*").order("name", { ascending: true }),
        ]);

        if (projectsResponse.error) {
          setErrorMessage("Non è stato possibile caricare i progetti.");
          console.error(projectsResponse.error);
          return;
        }

        if (categoriesResponse.error) {
          setErrorMessage("Non è stato possibile caricare le categorie.");
          console.error(categoriesResponse.error);
          return;
        }

        setProjects(projectsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        setErrorMessage(
          "Si è verificato un errore durante il caricamento dei progetti."
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjectsPageData();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const matchesSearch =
      normalizedSearchTerm.length === 0 ||
      project.title.toLowerCase().includes(normalizedSearchTerm);

    const matchesCategory =
      selectedCategoryId.length === 0 ||
      project.type_id === Number(selectedCategoryId);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-4">
      <ProjectsHeader />

      <ProjectsFilters
        categories={categories}
        searchTerm={searchTerm}
        selectedCategoryId={selectedCategoryId}
        setSearchTerm={setSearchTerm}
        setSelectedCategoryId={setSelectedCategoryId}
      />

      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}

      {!isLoading && !errorMessage && filteredProjects.length === 0 && (
        <div className="alert alert-light border">
          Nessun progetto trovato.
        </div>
      )}

      {isLoading ? (
        <ProjectsCardsSkeleton />
      ) : (
        <div className="row g-5 animate-fade-in">
          {filteredProjects.map((project) => (
            <div key={project.id} className="col-12 col-md-6 col-xl-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
