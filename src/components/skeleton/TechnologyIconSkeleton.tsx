import Skeleton from "react-loading-skeleton";

export default function TechnologyIconSkeleton() {
  return (
    <Skeleton
      className="position-absolute top-0 start-0 w-100 h-100"
      borderRadius={12}
      containerClassName="d-block h-100"
    />
  );
}
