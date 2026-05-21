
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/layout/ScrollToTop';
import ScrollToTopButton from './components/layout/ScrollToTopButton';
import DefaultLayout from './layouts/DefaultLayout';
import Homepage from './pages/Homepage';

const Projectspage = lazy(() => import('./pages/Projectspage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const Contactpage = lazy(() => import('./pages/Contactpage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage'));


export default function App() {

  return (
    <BrowserRouter>
     <ScrollToTop />
     <ScrollToTopButton />
     <Suspense fallback={<div className="flex-grow-1" aria-live="polite" />}>
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
     </Suspense>
    </BrowserRouter>
  )
}
