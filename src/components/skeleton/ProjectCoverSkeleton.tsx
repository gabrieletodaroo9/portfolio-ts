import Skeleton from "react-loading-skeleton";

export default function ProjectCoverSkeleton() {
  return (
    <Skeleton
      className="position-absolute top-0 start-0 w-100 h-100"
      borderRadius={0}
      containerClassName="d-block h-100 w-100"
    />
  );
}
