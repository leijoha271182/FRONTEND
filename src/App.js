import React from "react";
import { Header } from "./components/ui/Header";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { UsuariosView } from "./components/usuarios/UsuariosView";
import { InventarioView } from "./components/inventarios/InventarioView";
import { EstadosView } from "./components/estados/EstadosView";
import { MarcaView } from "./components/marcas/MarcaView";
import { TipoView } from "./components/tipos/TipoView";
import { InventarioUpdate } from "./components/inventarios/InventarioUpdate";
import { UsuarioUpdate } from "./components/usuarios/UsuarioUpdate";
import { MarcaUpdate } from "./components/marcas/MarcaUpdate";
import { EstadoUpdate } from "./components/estados/EstadoUpdate";
import { TipoUpdate } from "./components/tipos/TipoUpdate";


const App = () => {
    return <>
        <Header/>
        <Router>
            <Switch>
                <Route exact path="/" component={ InventarioView } />
                <Route exact path="/usuarios" component={ UsuariosView }/>
                <Route exact path="/marcas" component={ MarcaView }/>
                <Route exact path="/estados" component={ EstadosView }/>
                <Route exact path="/tipos" component={ TipoView }/>
                <Route exact path="/inventario/edit/:inventarioId" component={ InventarioUpdate }/> 
                <Route exact path="/usuario/edit/:usuarioId" component={ UsuarioUpdate }/>
                <Route exact path="/marca/edit/:marcaId" component={ MarcaUpdate }/>
                <Route exact path="/estado/edit/:estadoId" component={ EstadoUpdate }/>
                <Route exact path="/tipo/edit/:tipoId" component={ TipoUpdate }/>
                <Redirect to='/'/>
            </Switch>
        </Router>

    </>
}

export {
    App
}