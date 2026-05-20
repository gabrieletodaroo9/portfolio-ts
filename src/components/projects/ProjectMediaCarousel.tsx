import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPreviewVideoPlaying, setIsPreviewVideoPlaying] = useState(false);
  const safeActiveIndex = Math.min(activeIndex, mediaList.length - 1);
  const activeMedia = mediaList[safeActiveIndex];
  const hasMoreImages = mediaList.length > 1;
  const canNavigateLightbox = mediaList.length > 1;

  useEffect(() => {
    setIsPreviewVideoPlaying(false);
  }, [activeMedia?.file_path]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    function closeLightboxOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }
    }

    window.addEventListener("keydown", closeLightboxOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeLightboxOnEscape);
    };
  }, [isLightboxOpen]);

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

  function showPreviousLightboxMedia() {
    showPreviousImage();
  }

  function showNextLightboxMedia() {
    showNextImage();
  }

  if (!activeMedia) {
    return null;
  }

  const isMediaLoaded = loadedMediaPath === activeMedia.file_path;
  const activeMediaUrl = getPublicStorageUrl(activeMedia.file_path);

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
              onPlay={() => setIsPreviewVideoPlaying(true)}
              onPause={() => setIsPreviewVideoPlaying(false)}
              onEnded={() => setIsPreviewVideoPlaying(false)}
            >
              <source src={activeMediaUrl} />
            </video>
          ) : (
            <button
              type="button"
              className="project-media-open-button position-absolute top-0 start-0 w-100 h-100 border-0 bg-transparent p-0"
              aria-label={`Apri immagine ${title}`}
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={activeMediaUrl}
                alt={title}
                loading="lazy"
                className="w-100 h-100 object-fit-contain"
                style={{
                  opacity: isMediaLoaded ? 1 : 0,
                  transition: "opacity 0.2s ease-in-out",
                }}
                onLoad={() => setLoadedMediaPath(activeMedia.file_path)}
                onError={() => setLoadedMediaPath(activeMedia.file_path)}
              />
            </button>
          )}

          {!(activeMedia.type === "video" && isPreviewVideoPlaying) && (
            <button
              type="button"
              className="project-media-expand-button btn"
              aria-label={`Apri media ${title} a schermo intero`}
              onClick={() => setIsLightboxOpen(true)}
            >
              <i className="bi bi-arrows-fullscreen"></i>
            </button>
          )}
        </div>

        {hasMoreImages && (
          <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
            <button
              type="button"
              className="project-media-carousel-arrow btn border-0 text-secondary p-1"
              onClick={showPreviousImage}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <span className="small text-muted align-self-center">
              {safeActiveIndex + 1} / {mediaList.length}
            </span>
            <button
              type="button"
              className="project-media-carousel-arrow btn border-0 text-secondary p-1"
              onClick={showNextImage}
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        )}
      </div>

      {isLightboxOpen &&
        createPortal(
          <div
            className="project-media-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Media ingrandito ${title}`}
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              type="button"
              className="project-media-lightbox-close btn"
              aria-label="Chiudi media"
              onClick={(event) => {
                event.stopPropagation();
                setIsLightboxOpen(false);
              }}
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {canNavigateLightbox && (
              <>
                <button
                  type="button"
                  className="project-media-lightbox-arrow project-media-lightbox-arrow-left btn"
                  aria-label="Immagine precedente"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPreviousLightboxMedia();
                  }}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                <button
                  type="button"
                  className="project-media-lightbox-arrow project-media-lightbox-arrow-right btn"
                  aria-label="Immagine successiva"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNextLightboxMedia();
                  }}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </>
            )}

            {activeMedia.type === "video" ? (
              <video
                key={activeMedia.file_path}
                className="project-media-lightbox-media"
                controls
                autoPlay
                onClick={(event) => event.stopPropagation()}
              >
                <source src={activeMediaUrl} />
              </video>
            ) : (
              <img
                src={activeMediaUrl}
                alt={title}
                className="project-media-lightbox-media"
                onClick={(event) => event.stopPropagation()}
              />
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
