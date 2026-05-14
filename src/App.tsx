
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layouts/DefaultLayout';
import Homepage from './pages/Homepage';

const BASE_STORAGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/`;

console.log(BASE_STORAGE_URL);

export default function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Homepage />} />
      </Route>
     </Routes>
    </BrowserRouter>
  );
}
