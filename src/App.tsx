
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/layout/ScrollToTop';
import ScrollToTopButton from './components/layout/ScrollToTopButton';
import DefaultLayout from './layouts/DefaultLayout';
import Homepage from './pages/Homepage';
import Projectspage from './pages/Projectspage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Contactpage from './pages/Contactpage';
import ContactSuccessPage from './pages/ContactSuccessPage';


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
        <Route path="/contact/success" element={<ContactSuccessPage />} />
      </Route>
     </Routes>
    </BrowserRouter>
  )
}
