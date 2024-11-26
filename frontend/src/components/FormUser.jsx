export default function FormUser({ handleSubmit, newUser, handleInputChange }) {
  const submitButtonStyles = {
    background: "#28a745",
    color: "#fff",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontFamily: "Poppins",
  }
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <label htmlFor="e_mail">E-mail</label>
            <input
              type="text"
              id="e_mail"
              name="e_mail"
              value={newUser.e_mail}
              onChange={handleInputChange}
              placeholder="Nuevo email"
              maxLength={200}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              pattern=".{5,12}"
              placeholder="Nueva contraseña"
              maxLength={12}
            />
          </div>     
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button style={submitButtonStyles} type="submit">
            Enviar
          </button>
        </div>
      </div>
    </form>
  )
}
