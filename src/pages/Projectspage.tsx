import { useEffect, useState } from "react";
import { getPublicStorageUrl, supabase } from "../supabaseClient";
import { type Tables } from "../types/supabase";

export default function Projectspage() {
  const [projects, setProjects] = useState<Tables<"projects">[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase.from("projects").select("*")
        if (error) {
          setErrorMessage("Non è stato possibile caricare i progetti.")
          console.error(error)
          return
        }
        setProjects(data)
      } catch (error) {
        setErrorMessage("Si è verificato un errore durante il caricamento dei progetti.")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  fetchProjects()
  }, [])

  return (
    <div className="container mt-4">
     
      {isLoading && <div className="alert alert-dark">Caricamento progetti...</div>}

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="row g-3">
        {projects.map((project) => (
          <div key={project.id} className="col-md-4">
            <h5 className="card-title">{project.title}</h5>
            {project.cover_img_url && (
              <img
                src={getPublicStorageUrl(project.cover_img_url)}
                alt={project.title}
                className="card-img-top"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
