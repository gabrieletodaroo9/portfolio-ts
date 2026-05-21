import { useState, type FocusEvent } from "react";
import { type Tables } from "../../types/supabase";
import Icon from "../ui/Icon";

type ProjectsFiltersProps = {
  categories: Tables<"types">[]
  searchTerm: string
  selectedCategoryId: string
  setSearchTerm: (value: string) => void
  setSelectedCategoryId: (value: string) => void
}

export default function ProjectsFilters(props: ProjectsFiltersProps) {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)

  const selectedCategoryName =
    props.categories.find((category) => String(category.id) === props.selectedCategoryId)
      ?.name ?? "Tutte le categorie"

  function closeCategoryMenuOnFocusLeave(event: FocusEvent<HTMLDivElement>) {
    const nextFocusedElement = event.relatedTarget

    if (
      nextFocusedElement instanceof Node &&
      event.currentTarget.contains(nextFocusedElement)
    ) {
      return
    }

    setIsCategoryMenuOpen(false)
  }

  function selectCategory(categoryId: string) {
    props.setSelectedCategoryId(categoryId)
    setIsCategoryMenuOpen(false)
  }

  return (
    <section className="projects-filters mb-5">
      <div className="row g-3">
        <div className="col-12 col-lg-9">
          <label className="projects-filter-field">
            <span className="projects-filter-icon">
              <Icon name="search" />
            </span>
            <input
              type="search"
              className="projects-filter-input"
              placeholder="Cerca tra i progetti..."
              value={props.searchTerm}
              onChange={(event) => props.setSearchTerm(event.target.value)}
              aria-label="Cerca tra i progetti"
            />
          </label>
        </div>

        <div className="col-12 col-lg-3">
          <div
            className="projects-category-select"
            onBlur={closeCategoryMenuOnFocusLeave}
          >
            <button
              type="button"
              className="projects-category-toggle"
              onClick={() => setIsCategoryMenuOpen((isOpen) => !isOpen)}
              aria-haspopup="listbox"
              aria-expanded={isCategoryMenuOpen}
            >
              <span className="projects-filter-icon">
                <Icon name="layers" />
              </span>
              <span className="projects-category-label">{selectedCategoryName}</span>
              <Icon name="chevron-down" className="projects-category-chevron" />
            </button>

            {isCategoryMenuOpen && (
              <div className="projects-category-menu" role="listbox">
                <button
                  type="button"
                  className={`projects-category-option ${
                    props.selectedCategoryId === "" ? "is-selected" : ""
                  }`}
                  onClick={() => selectCategory("")}
                  role="option"
                  aria-selected={props.selectedCategoryId === ""}
                >
                  Tutte le categorie
                </button>

                {props.categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`projects-category-option ${
                      String(category.id) === props.selectedCategoryId ? "is-selected" : ""
                    }`}
                    onClick={() => selectCategory(String(category.id))}
                    role="option"
                    aria-selected={String(category.id) === props.selectedCategoryId}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
