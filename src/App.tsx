
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/layout/ScrollToTop';
import DefaultLayout from './layouts/DefaultLayout';
import Homepage from './pages/Homepage';
import Projectspage from './pages/Projectspage';
import Contactpage from './pages/Contactpage';


export default function App() {

  return (
    <BrowserRouter>
     <ScrollToTop />
     <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/projects" element={<Projectspage />} />
        <Route path="/contact" element={<Contactpage />} />
      </Route>
     </Routes>
    </BrowserRouter>
  )
}
