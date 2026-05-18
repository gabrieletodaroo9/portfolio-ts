import Skeleton from "react-loading-skeleton";

export default function TechnologiesSkeleton() {
  return (
    <div className="row g-4" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="col-6 d-none d-lg-flex flex-column align-items-center"
        >
          <div
            className="position-relative"
            style={{ height: "60px", width: "60px" }}
          >
            <Skeleton
              className="position-absolute top-0 start-0 w-100 h-100"
              borderRadius={12}
              containerClassName="d-block h-100"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
