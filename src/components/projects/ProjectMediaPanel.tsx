import { type ReactNode } from "react";
import ProjectMediaCarousel, {
  type ProjectCarouselMedia,
} from "./ProjectMediaCarousel";

type ProjectMediaPanelProps = {
  mediaList: ProjectCarouselMedia[];
  carouselTitle: string;
  headerActions?: ReactNode;
  body?: ReactNode;
  animationKey?: string;
};

export default function ProjectMediaPanel({
  mediaList,
  carouselTitle,
  headerActions,
  body,
  animationKey,
}: ProjectMediaPanelProps) {
  return (
    <div className="project-media-panel border rounded bg-light overflow-hidden w-100">
      {headerActions && (
        <div className="project-media-panel-header">{headerActions}</div>
      )}

      <div key={animationKey} className="project-media-panel-content p-3 p-md-5">
        {body}

        <ProjectMediaCarousel mediaList={mediaList} title={carouselTitle} />
      </div>
    </div>
  );
}
