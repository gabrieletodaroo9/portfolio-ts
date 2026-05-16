import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 300);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className="btn btn-secondary rounded-circle shadow position-fixed bottom-0 end-0 m-4 d-flex align-items-center justify-content-center"
      style={{ width: "50px", height: "50px", zIndex: 1030 }}
      onClick={scrollToTop}
      aria-label="Torna su"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}
