import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PubliProvider } from "./context/PublicacionContext.jsx";

import RutaProtegida from "./RutaProtegida.jsx";
import AdminRoute from "./RutaAdminProtegida.jsx";

import LoginPage from "./pages/loginPage.jsx";
import InicioPage from "./pages/inicioPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import PubliPage from "./pages/publiPage.jsx";
import CrearPubliPage from "./pages/crearPubliPage.jsx";
import PerfilPage from "./pages/perfilPage.jsx";
import FaqPage from "./pages/faqPage.jsx";
import ConsejosPage from "./pages/consejos.jsx";
import AdminPanel from "./pages/adminPage.jsx";
import GestReportComentarioPage from "./pages/gestReportComentarioPage.jsx";
import GestReportPubliPage from "./pages/gestReportPubliPage.jsx";
import GestUsuarioPage from "./pages/gestUsuarioPage.jsx";

function App() {

  return (
    <AuthProvider>
      <PubliProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<RutaProtegida />}>
              <Route path="/publi" element={<PubliPage /> }/>
              <Route path="/crear-publi" element={<CrearPubliPage />}/>
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/FAQ" element={<FaqPage />} />
              <Route path="/consejos" element={<ConsejosPage />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/admin-usuarios" element={<GestUsuarioPage />} />
              <Route path="/admin-reportes-comentarios" element={<GestReportComentarioPage />} />
              <Route path="/admin-reportes-publicaciones" element={<GestReportPubliPage />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </PubliProvider>
    </AuthProvider>



  )
}

export default App
