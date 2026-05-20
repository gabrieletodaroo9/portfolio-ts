import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { baseStorageUrl } from "../supabaseClient";

const mainBackgroundVideoUrl = `${baseStorageUrl}portfolio-assets/profile/wallpaper-portfolio1.mp4`;

type ContactToastState = {
    contactMessageSent?: boolean;
};

export default function DefaultLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isContactToastVisible, setIsContactToastVisible] = useState(false);
    const [isContactToastLeaving, setIsContactToastLeaving] = useState(false);

    function hideContactToast() {
        setIsContactToastLeaving(true);

        window.setTimeout(() => {
            setIsContactToastVisible(false);
            setIsContactToastLeaving(false);
        }, 320);
    }

    useEffect(() => {
        const state = location.state as ContactToastState | null;

        if (!state?.contactMessageSent) {
            return;
        }

        setIsContactToastVisible(true);
        setIsContactToastLeaving(false);
        navigate(location.pathname, { replace: true });
    }, [location.pathname, location.state, navigate]);

    useEffect(() => {
        if (!isContactToastVisible || isContactToastLeaving) {
            return;
        }
        
        const hideToastTimeout = window.setTimeout(() => {
            hideContactToast();
        }, 4500);

        return () => window.clearTimeout(hideToastTimeout);
    }, [isContactToastLeaving, isContactToastVisible]);

    return (
        
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="site-main flex-grow-1 d-flex flex-column">
                <video
                    className="site-main-background-video"
                    src={mainBackgroundVideoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                    onCanPlay={(e) => (e.currentTarget.playbackRate = 0.8)}
                />
                <div className="site-main-content flex-grow-1 d-flex flex-column">
                    <Outlet />
                </div>
            </main>
            {isContactToastVisible && (
                <div className="position-fixed bottom-0 end-0 p-3 p-md-4" style={{ zIndex: 1080 }} aria-live="polite" aria-atomic="true">
                    <div className={`contact-toast d-flex align-items-start gap-3 p-3 p-md-4 bg-white border border-secondary rounded-4 shadow-lg ${isContactToastLeaving ? "is-leaving" : ""}`}>
                        <span className="d-inline-flex align-items-center justify-content-center text-white bg-secondary rounded-circle flex-shrink-0" style={{ width: "42px", height: "42px" }}>
                            <i className="bi bi-check-lg"></i>
                        </span>
                        <div className="pe-2">
                            <p className="fw-bold mb-1">Messaggio inviato</p>
                            <p className="text-muted mb-0">Ho ricevuto la tua richiesta e ti rispondero appena possibile.</p>
                        </div>
                        <button
                            type="button"
                            className="btn-close ms-auto"
                            aria-label="Chiudi notifica"
                            onClick={hideContactToast}
                        ></button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}
