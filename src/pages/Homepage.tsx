import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; 
import { type Tables } from "../types/supabase";

const BASE_STORAGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/`;

export default function Homepage() {
    const [projects, setProjects] = useState<Tables<"projects">[]>([]);
    
    useEffect(() => {
        supabase.from('projects').select('*').then(({ data, error }) => {
            if (error) {
                console.error(error);
            } else {
                setProjects(data as Tables<"projects">[]);
            }
        });
    }, []);

    return (
        <div className="container mt-4">
            <div className="row g-3">
                {projects.map((project) => (
                    <div key={project.id} className="col-md-4">
                        <h5 className="card-title">{project.title}</h5>
                        {project.cover_img_url && (
                            <img src={BASE_STORAGE_URL + project.cover_img_url} alt={project.title} className="card-img-top" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}