import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function DefaultLayout() {
    return (
        
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}