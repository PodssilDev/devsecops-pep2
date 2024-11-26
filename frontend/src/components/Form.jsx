import estados from "../resources/estados.json"
import comunas from "../resources/comunas.json"

export default function Form({ handleSubmit, newPatient, handleInputChange }) {
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              paddingRight: "10px",
            }}
          >
            <div>
              <label htmlFor="nombre">Nombre*</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={newPatient.nombre}
                onChange={handleInputChange}
                required
                placeholder="Escriba aquí el nombre del paciente"
                maxLength={200}
              />
            </div>
            <div>
              <label htmlFor="e_mail">E-mail</label>
              <input
                type="text"
                id="e_mail"
                name="e_mail"
                value={newPatient.e_mail}
                onChange={handleInputChange}
                placeholder="Escriba aquí el correo electrónico del paciente"
                maxLength={200}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <label htmlFor="apellidos">Apellidos*</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={newPatient.apellidos}
                onChange={handleInputChange}
                required
                placeholder="Escriba aquí los apellidos del paciente"
                max={200}
              />
            </div>
            <div>
              <label htmlFor="comuna">Comuna</label>
              <select
                id="comuna"
                name="comuna"
                value={newPatient.comuna}
                onChange={handleInputChange}
              >
                <option value="">Seleccione la comuna del paciente</option>
                {comunas.map((comuna, index) => (
                  <option key={index} value={comuna}>
                    {comuna}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              paddingRight: "10px",
            }}
          >
            <div>
              <label htmlFor="celular">Celular*</label>
              <input
                type="text"
                id="celular"
                name="celular"
                value={newPatient.celular}
                onChange={handleInputChange}
                required
                placeholder="Escriba aquí el número de celular del paciente"
                maxLength={20}
              />
            </div>
            <div>
              <label htmlFor="fecha_ultima_sesion">Ultimo Contacto</label>
              <input
                type="date"
                id="fecha_ultima_sesion"
                name="fecha_ultima_sesion"
                defaultValue={newPatient.fecha_ultima_sesion}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div style={{ paddingRight: "10px" }}>
            <label htmlFor="estado">Estado*</label>
            <select
              id="estado"
              name="estado"
              required
              value={newPatient.estado}
              onChange={handleInputChange}
            >
              <option value="">Seleccione el estado del paciente</option>
              {estados.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingRight: "10px",
          }}
        >
          <label htmlFor="notas">Notas</label>
          <textarea
            type="text"
            id="notas"
            name="notas"
            size="5"
            value={newPatient.notas}
            onChange={handleInputChange}
            placeholder="Escriba aquí las observaciones sobre el paciente que considere relevante"
            maxLength={255}
          />
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
