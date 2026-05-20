import Skeleton from "react-loading-skeleton";

export default function ProjectDetailPageSkeleton() {
  return (
    <div className="container py-5" aria-hidden="true">
      <article>
        <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
          <Skeleton width={150} height={38} borderRadius={8} />
          <Skeleton width={120} height={34} borderRadius={8} />
        </div>

        <section className="row g-5 align-items-start mb-5">
          <div className="col-12 col-md-5">
            <Skeleton height={52} width="85%" className="mb-3" />
            <Skeleton count={3} className="mb-2" />
            <Skeleton width="70%" className="mb-4" />

            <div className="border-top pt-4 mb-4">
              <Skeleton height={24} width={190} className="mb-3" />

              <div className="d-flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    width={34}
                    height={34}
                    borderRadius={8}
                  />
                ))}
              </div>
            </div>

            <Skeleton width={140} height={38} borderRadius={8} />
          </div>

          <div className="col-12 col-md-7">
            <div className="border rounded bg-light overflow-hidden">
              <div className="project-media-panel-content p-3 p-md-5">
                <Skeleton height={22} width="45%" className="mb-3" />
                <Skeleton count={2} className="mb-2" />
                <Skeleton width={150} height={38} borderRadius={8} className="mb-4" />

                <div className="ratio ratio-16x9 overflow-hidden rounded">
                  <Skeleton
                    className="position-absolute top-0 start-0 w-100 h-100"
                    borderRadius={0}
                    containerClassName="d-block h-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
