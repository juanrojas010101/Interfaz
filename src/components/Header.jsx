import React, { useState } from 'react';
import './Header.css';
import CalidadInternaForm from './CalidadInterna'; // Importa tu componente CalidadInternaForm
import ClasificacionCalidadForm from './ClasificacionCalidad'; // Importa tu componente ClasificacionCalidadForm
import ClasificacionLimonForm from './ClasificacionLimon'; // Importa tu componente ClasificacionLimónForm

const Header = ({ onLoteChange, onFormularioChange }) => {
  const [loteSeleccionado, setLoteSeleccionado] = useState(''); // Estado para el lote seleccionado
  const [formularioSeleccionado, setFormularioSeleccionado] = useState(null); // Estado para el formulario seleccionado

  const handleLoteChange = (event) => {
    const selectedValue = event.target.value;
    setLoteSeleccionado(selectedValue); // Actualiza el estado con el valor del lote seleccionado
    onLoteChange(selectedValue);
  };

  const handleFormularioChange = (event) => {
    const selectedValue = event.target.value;
    setFormularioSeleccionado(selectedValue); // Actualiza el estado con el valor del formulario seleccionado
    onFormularioChange(selectedValue);
  };

  // Datos quemados para los lotes
  const lotesData = [
    { id: 'ENF-1', nombre: 'Lote 1', tipoFruta: 'naranja' },
    { id: 'ENF-2', nombre: 'Lote 2', tipoFruta: 'limon' },
    // Agrega más lotes quemados según tus necesidades
  ];

  return (
    <header>
      <div>
        <img
          src="https://drive.google.com/uc?export=view&id=10Z3TNsyqn45mqsHe8Q25z17mwHg9qCiS"
          alt="Logo"
        />
      </div>

      <select
        className="menu-lotes form-select"
        name="lotes"
        id="lotes"
        onChange={handleLoteChange}
      >
        <option value=""><b>Lotes</b></option>
        {lotesData.map((lote) => (
          <option key={lote.id} value={lote.id}>
            {lote.nombre}
          </option>
        ))}
      </select>

      <select
        className="menu-lotes form-select"
        name="actions"
        id="actions"
        onChange={handleFormularioChange}
      >
        <option value=""><b>Formularios</b></option>
        <option value="0"><b>Calidad Interna</b></option>
        <option value="1"><b>Clasificación del Descarte</b></option>
      </select>

      {loteSeleccionado && formularioSeleccionado === '0' && (
        <CalidadInternaForm loteSeleccionado={loteSeleccionado} />
      )}

      {loteSeleccionado && formularioSeleccionado === '1' && (
        (loteSeleccionado === 'ENF-1' ? (
          <ClasificacionCalidadForm loteSeleccionado={loteSeleccionado} />
        ) : (
          <ClasificacionLimonForm loteSeleccionado={loteSeleccionado}/>
        ))
      )}
    </header>
  );
};

export default Header;







