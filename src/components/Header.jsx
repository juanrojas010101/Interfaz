// Header.jsx
import React from 'react';
import './Header.css';

const Header = ({ onLoteChange, onFormularioChange }) => {
  const handleLoteChange = (event) => {
    const selectedValue = event.target.value;
    onLoteChange(selectedValue);
  };

  const handleFormularioChange = (event) => {
    const selectedValue = event.target.value;
    onFormularioChange(selectedValue);
  };

  // Datos quemados para los lotes
  const lotesData = [
    { id: 'LoteNaranja', nombre: 'Lote 1', tipoFruta: 'naranja' },
    { id: 'LoteLimon', nombre: 'Lote 2', tipoFruta: 'limon' },
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
    </header>
  );
};

export default Header;





