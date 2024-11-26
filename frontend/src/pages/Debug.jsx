import React from 'react';
import axios from 'axios';

function DeleteButton() {
  const handleDeleteClick = async () => {
    try {
      // Realiza una solicitud DELETE a la URL de la API para eliminar datos en la base de datos
      await axios.delete("/paciente");
      alert('Datos eliminados exitosamente');
    } catch (error) {
      console.error('Error al eliminar datos:', error);
    }
  };

  const handleDeleteClick2 = async () => {
    try {
      // Realiza una solicitud DELETE a la URL de la API para eliminar datos en la base de datos
      await axios.delete("/usuario");
      alert('Datos eliminados exitosamente');
    } catch (error) {
      console.error('Error al eliminar datos:', error);
    }
  }

  return (
    <div>
        <h1>Hi! Welcome to debug mode</h1>
        <h2>This page is temporary and it's only meant to be used in Developder mode.</h2>

      <button onClick={handleDeleteClick}>Eliminar Datos de la Base de Datos (Paciente)</button>
      <button onClick={handleDeleteClick2}>Eliminar Datos de la Base de Datos (Usuario)</button>
    </div>
  );
}

export default DeleteButton;
