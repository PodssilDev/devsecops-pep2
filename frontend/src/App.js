import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from './pages/Register';
import PatientsEntry from "./pages/PatientsEntry";
import PatientsList from "./pages/PatientsList";
import AdminPanel from "./pages/AdminPanel"
import Debug from "./pages/Debug"
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import NotAuthorized from "./components/NotAuthorized";
import Email from "./pages/Email";

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path="/login" element={<NotAuthorized><Login/></NotAuthorized>}/>
        <Route path="/debug" element={<Debug/>}/>
        <Route path="/register" element={<AdminRoute><PrivateRoute><Register/></PrivateRoute></AdminRoute>}/>
        <Route path="/ingreso-pacientes" element={<PrivateRoute><PatientsEntry/></PrivateRoute>}/>
        <Route path="/pacientes" element={<PrivateRoute><PatientsList/></PrivateRoute> }/>
        <Route path="/administrar" element={<AdminRoute><PrivateRoute><AdminPanel/></PrivateRoute></AdminRoute>}/>
        <Route path="/send-mail" element={<PrivateRoute><Email/></PrivateRoute> }/>
        <Route path="/*" element={<PrivateRoute><Home/></PrivateRoute>}/>
      </Routes>
    </div>
  );
}
