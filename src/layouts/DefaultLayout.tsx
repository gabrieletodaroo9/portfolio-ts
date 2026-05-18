import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { baseStorageUrl } from "../supabaseClient";

const mainBackgroundVideoUrl = `${baseStorageUrl}portfolio-assets/profile/wallpaper-portfolio1.mp4`;

export default function DefaultLayout() {
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
            <Footer />
        </div>
    )
}
