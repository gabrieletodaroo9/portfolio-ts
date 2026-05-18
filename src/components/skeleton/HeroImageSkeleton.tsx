import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function HeroImageSkeleton() {
  return (
    <SkeletonTheme baseColor="#2b2b2b" highlightColor="#3a3a3a">
      <Skeleton
        className="position-absolute top-0 start-0 w-100 h-100"
        borderRadius={0}
        containerClassName="d-block h-100"
      />
    </SkeletonTheme>
  );
}
