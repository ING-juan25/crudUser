import { Button } from 'bootstrap';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Home = ({ dark,setModal, modal, abrirModal, oscuro, usuarios, agregar, eliminar, seleccionar, actualizar, usuarioSeleccionado }) => {

  const { register, handleSubmit, reset, setValue } = useForm();

  
  // Generar un identificador único de 2 caracteres
  const generateUniqueId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';

    while (id.length < 2) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters[randomIndex];

      if (!id.includes(randomChar)) {
        id += randomChar;
      }
    }

    return id;
  };

  // Utilizar la función generateUniqueId() en submit()
  const submit = (data, e) => {
    e.preventDefault();
    data.id = generateUniqueId();

    if (usuarioSeleccionado !== null) {
      actualizar(data);
      seleccionar(null); // Restablecer el usuario seleccionado después de actualizar
    } else {
      agregar(data);
    }
    reset();
  };





  useEffect(() => {
    if (usuarioSeleccionado !== null) {
      setValue("name", usuarioSeleccionado.name);
      setValue("last_name", usuarioSeleccionado.last_name);
      setValue("age", usuarioSeleccionado.age);
      setValue("email", usuarioSeleccionado.email);
      setValue("movil", usuarioSeleccionado.movil);
    } else {
      reset(); // Restablecer el formulario si no hay usuario seleccionado
    }
  }, [usuarioSeleccionado, setValue, reset]);

  useEffect(() => {
    if (!modal) {
      reset();
    }
  }, [modal, reset]);

  const navegacionHome = useNavigate();

  const home = () => {
    navegacionHome('/');
  };


  const totalUsers = usuarios?.length;
  const usersmayores = usuarios?.filter(user => user.age > 18);
  const usersmenores = usuarios?.filter(user => user.age < 18);
  const percentageUsersOver25 = ((usersmayores?.length / totalUsers) * 100).toFixed(2);
  const percentageUsersmenores = ((usersmenores?.length / totalUsers) * 100).toFixed(2);

  // ****************************amburguesa*****************************
  const [modalAmburguesa, setmodalAmburguesa] = useState(false);
  const abrirAmburguesa = () => {
    setmodalAmburguesa(!modalAmburguesa);
  }
const[buscador,setBuscador] = useState('')
const buscar = () => {
  return usuarios?.filter(user => user.name.toLowerCase().includes(buscador.toLowerCase()));
};
console.log(buscador)
  return (
    <div className="contenedor-padre">
      {modalAmburguesa &&(
        <div className="hijo">
        <nav>
          <div className="menuResponsive">
            <img className='logo-img' src="img/logo.png" alt="" />
            {/* ******************************menu amburguesa********************************** */}
            
          </div>
          <ul className='ul-nav'>
            <li onClick={home}>
              <i className="bx bx-home"></i>
              <span className="notranslate">Home</span>
            </li>
            <li>
              <i className="bx bx-user-plus"></i>
              <span onClick={abrirModal} className="notranslate">
                Add Users
              </span>
              {modal && (
                <div className="padre-modal">
                  <div className="hijo-modal">
                    <form onSubmit={handleSubmit(submit)}>
                      <label className="notranslate" htmlFor="name">
                        Nombre
                      </label>
                      <input type="text" id="name" {...register("name")} />

                      <label className="notranslate" htmlFor="last_name">
                        Apellidos
                      </label>
                      <input className="notranslate" type="text" id="last_name" {...register("last_name")} />

                      <label className="notranslate" htmlFor="age">
                        Edad
                      </label>
                      <input className="notranslate" type="number" id="age" {...register("age")} required />

                      {/* <label className="notranslate" htmlFor="email">
                        Correo
                      </label>
                      <input className="notranslate" type="email" id="email" {...register("email")} />

                      <label className="notranslate" htmlFor="movil">
                        Movil
                      </label>
                      <input className="notranslate" type="number" id="movil" {...register("movil")} /> */}

                      <div className="notranslate enviar-cerrar">
                        <input className="notranslate enviar" type="submit" value="Enviar" />
                        <input onClick={() => setModal(false)} className="cerrar notranslate" type="submit" value="Cerrar" />
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </li>
            
            <li>
              <i className="bx bx-moon"></i>
              <span onClick={oscuro} className="notranslate">
                Dark
              </span>
            </li>
          </ul>
        </nav>
      </div>
      )

      }
      <div className="padre">
        <div className="contenedor__btn">
          <p>{modalAmburguesa?'':'Lista De Usuarios'}</p>
          <input placeholder='Buscar Usuario' value={buscador} onChange={e => setBuscador(e.target.value)}  type="text" />
         <button onClick={abrirAmburguesa}>menu</button>
        </div>
        <div className="container-grafica">
          <div className="grafica uno-graf">
            <span className="usuario">Usuarios Ingresados</span>
            <span className="users">
              <i className="bx bx-user-plus"></i> {totalUsers}
            </span>
          </div>
          <div className="grafica dos-graf">
            <span className="usuario">Usuarios Mayores</span>
            <span className="users">{percentageUsersOver25} %</span>
          </div>
          <div className="grafica tres-graf">
            <span className="usuario">Usuarios Menores</span>
            <span className="users">{percentageUsersmenores} %</span>
          </div>
        </div>
        <div className="contenedor-tabla">
         
           <Table  striped="columns">
      <thead>
      <tr >
                <th >#</th>
                <th>Nombre</th>
                <th>Apellìdo</th>
                <th>Edad</th>
                {/* <th>Correo</th>
                <th>Movil</th> */}
                <th>Editar</th>
              </tr>
      </thead>
      <tbody>
      {buscar()?.map(user => (
                <tr className="  text-center" key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.age}</td>
                  {/* <td className="correo">{user.email}</td>
                  <td>{user.movil}</td> */}
                  <td className="btn-colores">
                    <i className=" bx bx-x eliminar" onClick={() => eliminar(user.id)}>

                    </i>
                    <i className="bx bx-edit actualizar notranslate" onClick={() => { seleccionar(user); abrirModal() }}>

                    </i>
                  </td>
                </tr>
              ))}
      </tbody>
    </Table>
        </div>
      </div>
    </div>
  );
};

export default Home;







