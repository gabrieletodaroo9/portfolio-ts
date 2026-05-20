
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/layout/ScrollToTop';
import ScrollToTopButton from './components/layout/ScrollToTopButton';
import DefaultLayout from './layouts/DefaultLayout';
import Homepage from './pages/Homepage';
import Projectspage from './pages/Projectspage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Contactpage from './pages/Contactpage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';


export default function App() {

  return (
    <BrowserRouter>
     <ScrollToTop />
     <ScrollToTopButton />
     <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/projects" element={<Projectspage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
     </Routes>
    </BrowserRouter>
  )
}
