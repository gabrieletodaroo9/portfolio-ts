import { useState } from "react";
import { getPublicStorageUrl } from "../../supabaseClient";
import { type Tables } from "../../types/supabase";

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

  return (
    <div>
      <div className="position-relative">
        {activeMedia.type === "video" ? (
          <video className="w-100 rounded border" controls>
            <source src={getPublicStorageUrl(activeMedia.file_path)} />
          </video>
        ) : (
          <img
            src={getPublicStorageUrl(activeMedia.file_path)}
            alt={title}
            className="rounded border w-100"
          />
        )}

        {hasMoreImages && (
          <div className="d-flex justify-content-between mt-3">
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={showPreviousImage}>
              Precedente
            </button>
            <span className="small text-muted align-self-center">
              {safeActiveIndex + 1} / {mediaList.length}
            </span>
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={showNextImage}>
              Successiva
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
