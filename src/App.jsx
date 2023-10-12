import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import CalidadInterna from './components/CalidadInterna';
import ClasificacionCalidad from './components/ClasificacionCalidad';
import ClasificacionLimon from './components/ClasificacionLimon';

function App() {
  const [selectedLote, setSelectedLote] = useState({ tipoFruta: '', enf: '' });
  const [selectedFormulario, setSelectedFormulario] = useState('');

  // Define los datos quemados para los lotes en la variable lotesData
  const lotesData = [
    { id: 'LoteNaranja', nombre: 'Lote 1', tipoFruta: 'naranja' },
    { id: 'LoteLimon', nombre: 'Lote 2', tipoFruta: 'limon' },
    // Agrega más lotes quemados según tus necesidades
  ];

  const handleLoteChange = (value) => {
    // Configura los datos quemados de acuerdo al lote
    const loteData = lotesData.find((lote) => lote.id === value);
    if (loteData) {
      setSelectedLote({ tipoFruta: loteData.tipoFruta, enf: value });
    }
  };

  const handleFormularioChange = (value) => {
    setSelectedFormulario(value);
  };

  return (
    <div className="App">
      <Header
        onLoteChange={handleLoteChange}
        onFormularioChange={handleFormularioChange}
        lotesData={lotesData} // Pasa los datos quemados al componente Header
      />

      {selectedLote.tipoFruta !== '' && (
        <>
          {selectedFormulario === '0' && <CalidadInterna />}
          {selectedLote.tipoFruta === 'naranja' && selectedFormulario === '1' && <ClasificacionCalidad />}
          {selectedLote.tipoFruta === 'limon' && selectedFormulario === '1' && <ClasificacionLimon />}
        </>
      )}
    </div>
  );
}

export default App;




