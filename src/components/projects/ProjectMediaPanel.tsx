import { type ReactNode } from "react";
import ProjectMediaCarousel, {
  type ProjectCarouselMedia,
} from "./ProjectMediaCarousel";

type ProjectMediaPanelProps = {
  mediaList: ProjectCarouselMedia[];
  carouselTitle: string;
  headerActions?: ReactNode;
  body?: ReactNode;
};

export default function ProjectMediaPanel({
  mediaList,
  carouselTitle,
  headerActions,
  body,
}: ProjectMediaPanelProps) {
  return (
    <div className="border rounded p-3 p-md-5 bg-light">
      <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mb-4">

        {headerActions}
      </div>

      {body}

      <ProjectMediaCarousel mediaList={mediaList} title={carouselTitle} />
    </div>
  );
}
