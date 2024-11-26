import React, { useState } from 'react';
import "../styles/EmailContainer.css";
import "../styles/Background.css";

const Email = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    text: '',
  });

  const handleInputChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };

  return (
    <div className='bg'>
      <h1>Enviar Correo Masivo</h1>
      <div className='content_email'>
        <div 
            className='container_email'
            style={{
            backgroundColor: "white",
            fontSize: "15px",
            borderRadius: "10px",
            boxShadow: "1px 1px 3px gray",
            paddingLeft: "5px"}}>

          <i> Destinatarios </i>
          <textarea className='destinatarios-email'
            type="text"
            name="to"
            placeholder="Destinatarios (separados por comas)"
            value={emailData.to}
            onChange={handleInputChange}
          />
          <i> Asunto </i>
          <input className='asunto-email'
            type="text"
            name="subject"
            placeholder="Asunto"
            value={emailData.subject}
            onChange={handleInputChange}
          />
          <i> Mensaje </i>
          <textarea className='text-area-email'
            name="text"
            placeholder="Mensaje"
            value={emailData.text}
            onChange={handleInputChange}
          />
          <button className='rounded-corners-button-email' onClick={handleSendEmail}>Enviar Correo</button>
        </div>
      </div>
    </div>
  );
};

export default Email;