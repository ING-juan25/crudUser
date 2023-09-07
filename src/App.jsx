import { useEffect, useState } from "react";
import "./App.css";
import "./Responsive.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  const users = [
    {
      id: 12,
      name: "Juan",
      last_name: "Carcamo",
      age: 29,
      email: "juancatu25@gmail.com",
      movil: 3104063050,
    },
  ];

  const [usuarios, setUsuarios] = useState();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    setUsuarios(users);
  }, []);

  //modal
  const [modal, setModal] = useState(false);

  const abrirModal = () => {
    setModal(true);
  };

  //agregar
  const agregar = (data) => {
    setUsuarios([...usuarios, data]);
  };

  //eliminar

  const eliminar = (id) => {
    const delet = usuarios.filter((user) => user.id !== id);
    setUsuarios(delet);
  };

  const seleccionar = (user) => {
    setUsuarioSeleccionado(user);
  };

  const actualizar = (editar) => {
    editar.id = usuarioSeleccionado.id;
    const index = usuarios.findIndex(
      (use) => use.id === usuarioSeleccionado.id
    );
    usuarios[index] = editar;

    setUsuarios([...usuarios]);
  };

  // modo oscuro
  const [dark, setDark] = useState(false);

  const oscuro = () => {
    setDark(!dark);
  };

  //home

  const home = () => {
    navegacionHome("/");
  };

  return (
    <div className={`App ${dark ? "dark" : ""}`}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                dark={dark}
                setModal={setModal}
                modal={modal}
                abrirModal={abrirModal}
                oscuro={oscuro}
                actualizar={actualizar}
                usuarioSeleccionado={usuarioSeleccionado}
                seleccionar={seleccionar}
                eliminar={eliminar}
                agregar={agregar}
                usuarios={usuarios}
              />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
