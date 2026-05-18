import { useState } from "react";
import { getPublicStorageUrl } from "../../supabaseClient";
import { type Tables } from "../../types/supabase";
import ProjectMediaCarouselSkeleton from "../skeleton/ProjectMediaCarouselSkeleton";

export type ProjectCarouselMedia = Pick<
  Tables<"project_media">,
  "id" | "file_path" | "type"
>;

type ProjectMediaCarouselProps = {
  mediaList: ProjectCarouselMedia[];
  title: string;
};

export default function ProjectMediaCarousel({ mediaList, title }: ProjectMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedMediaPath, setLoadedMediaPath] = useState("");
  const safeActiveIndex = Math.min(activeIndex, mediaList.length - 1);
  const activeMedia = mediaList[safeActiveIndex];
  const hasMoreImages = mediaList.length > 1;

  function showPreviousImage() {
    if (activeIndex === 0) {
      setActiveIndex(mediaList.length - 1);
      return;
    }

    setActiveIndex(activeIndex - 1);
  }

  function showNextImage() {
    if (activeIndex === mediaList.length - 1) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex(activeIndex + 1);
  }

  if (!activeMedia) {
    return null;
  }

  const isMediaLoaded = loadedMediaPath === activeMedia.file_path;

  return (
    <div>
      <div className="position-relative">
        <div className="ratio ratio-16x9 position-relative overflow-hidden rounded border bg-light">
          {!isMediaLoaded && <ProjectMediaCarouselSkeleton />}

          {activeMedia.type === "video" ? (
            <video
              key={activeMedia.file_path}
              className="position-absolute top-0 start-0 w-100 h-100 object-fit-contain"
              controls
              style={{ opacity: isMediaLoaded ? 1 : 0 }}
              onLoadedData={() => setLoadedMediaPath(activeMedia.file_path)}
              onError={() => setLoadedMediaPath(activeMedia.file_path)}
            >
              <source src={getPublicStorageUrl(activeMedia.file_path)} />
            </video>
          ) : (
            <img
              src={getPublicStorageUrl(activeMedia.file_path)}
              alt={title}
              className="position-absolute top-0 start-0 w-100 h-100 object-fit-contain"
              style={{
                opacity: isMediaLoaded ? 1 : 0,
                transition: "opacity 0.2s ease-in-out",
              }}
              onLoad={() => setLoadedMediaPath(activeMedia.file_path)}
              onError={() => setLoadedMediaPath(activeMedia.file_path)}
            />
          )}
        </div>

        {hasMoreImages && (
          <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
            <button
              type="button"
              className="btn border-0 text-secondary p-1"
              onClick={showPreviousImage}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <span className="small text-muted align-self-center">
              {safeActiveIndex + 1} / {mediaList.length}
            </span>
            <button
              type="button"
              className="btn border-0 text-secondary p-1"
              onClick={showNextImage}
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
