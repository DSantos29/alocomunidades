import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Noticias from "./pages/Noticias.jsx";
import Doe from "./pages/Doe.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import IPerfil from "./pages/IPerfil.jsx";
import { AuthProvider } from "./Context/AuthContext";
function app() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/sobre">
              <Sobre />
            </Route>

            <Route path="/contato">
              <Contato />
            </Route>

            <Route path="/doe">
              <Doe />
            </Route>
            {/* ===== As rotas relacionadas as imports de cima também estão comentadas para evitar erro.
          Conforme as Pages forem configuradas, tirar o comentário */}

            <Route path="/noticias">
              <Noticias />
            </Route>

            <Route path="/perfil">
              <IPerfil />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/cadastro">
              <Cadastro />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default app;
