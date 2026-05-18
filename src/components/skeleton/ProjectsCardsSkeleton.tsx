import Skeleton from "react-loading-skeleton";

export default function ProjectsCardsSkeleton() {
  return (
    <div className="row g-5" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="col-12 col-md-6 col-xl-4">
          <article className="card h-100 border shadow-sm overflow-hidden bg-light rounded-4 d-flex flex-column">
            <div className="ratio ratio-16x9 overflow-hidden">
              <Skeleton
                className="position-absolute top-0 start-0 w-100 h-100"
                borderRadius={0}
                containerClassName="d-block h-100"
              />
            </div>

            <div className="card-body d-flex flex-column p-3 flex-grow-1">
              <Skeleton height={28} width="75%" className="mb-3" />

              <div
                className="mt-auto border-top border-1 pt-3 d-flex align-items-center justify-content-between gap-3"
                style={{ height: "54px" }}
              >
                <div className="d-flex align-items-center gap-2">
                  {Array.from({ length: 3 }).map((_, technology_index) => (
                    <Skeleton
                      key={technology_index}
                      width={24}
                      height={24}
                      borderRadius={50}
                    />
                  ))}
                </div>
                <Skeleton width={90} height={28} borderRadius={20} />
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
