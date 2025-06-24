import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PubliProvider } from "./context/PublicacionContext.jsx";
import RutaProtegida from "./RutaProtegida.jsx";

import LoginPage from "./pages/loginPage.jsx";
import InicioPage from "./pages/inicioPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import PubliPage from "./pages/publiPage.jsx";
import CrearPubliPage from "./pages/crearPubliPage.jsx";
import PerfilPage from "./pages/perfilPage.jsx";
import FaqPage from "./pages/faqPage.jsx";
import ConsejosPage from "./pages/consejos.jsx";
import AdminPanel from "./pages/adminPage.jsx";

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
              <Route path="/admin-panel" element={<AdminPanel />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </PubliProvider>
    </AuthProvider>



  )
}

export default App
