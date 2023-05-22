import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WithAuth from './components/WithAuth';
import Consultation from './pages/Consultation';
import Vaccinations from './pages/Vaccinations';
import BookSpot from './pages/BookSpot';

export default function App() {
  return (
    <>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/dashboard'
            element={
              <WithAuth>
                <Dashboard />
              </WithAuth>
            }
          ></Route>
          <Route
            path='/dashboard/consultation'
            element={
              <WithAuth>
                <Consultation />
              </WithAuth>
            }
          />
          <Route
            path='/dashboard/vaccinations'
            element={
              <WithAuth>
                <Vaccinations />
              </WithAuth>
            }
          />
          <Route
            path='/dashboard/vaccinations/spots/:spotId'
            element={
              <WithAuth>
                <BookSpot />
              </WithAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
