
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './layouts/DefaultLayout';
import Homepage from './pages/Homepage';


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
