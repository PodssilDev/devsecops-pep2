import React from 'react';
import axios from 'axios';
import "../styles/Buttons.css"

const ExportarCSVButton = () => {
  const exportarCSV = async () => {
    try {
      const response = await axios.get('paciente/csv', {
        responseType: 'blob', // Para indicar que la respuesta es un archivo binario
      });

      // Crear un objeto Blob con los datos y crear un enlace para la descarga
      const blob = new Blob([response.data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'pacientes.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al exportar a CSV:', error);
    }
  };

  return (
    <button onClick={exportarCSV} className= "button-to-mail">
      Descargar archivo .csv de Pacientes
    </button>
  );
};

export default ExportarCSVButton;
