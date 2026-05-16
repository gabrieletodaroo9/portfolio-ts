import { type Tables } from "../../types/supabase";

type ProjectsFiltersProps = {
  categories: Tables<"types">[]
  searchTerm: string
  selectedCategoryId: string
  setSearchTerm: (value: string) => void
  setSelectedCategoryId: (value: string) => void
}

export default function ProjectsFilters(props: ProjectsFiltersProps) {
  return (
    <section className="mb-5">
      <div className="row g-3">
        <div className="col-12 col-lg-9">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="search"
              className="form-control"
              placeholder="Cerca tra i progetti..."
              value={props.searchTerm}
              onChange={(event) => props.setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-lg-3">
          <select
            className="form-select"
            value={props.selectedCategoryId}
            onChange={(event) => props.setSelectedCategoryId(event.target.value)}
            aria-label="Filtra per categoria"
          >
            <option value="">Tutte le categorie</option>
            {props.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}
