import React, { useState } from 'react';

const initialState = {
  Oleocelosis: { lavado: '', proceso: '' },
  FrutaVerde: { lavado: '', proceso: '' },
  DañosHerbicida: { lavado: '', proceso: '' },
  FrutaSobreMadura: { lavado: '', proceso: '' },
  DañosMecanicos: { lavado: '', proceso: '' },
  EscamaPiojoBlanco: { lavado: '', proceso: '' },
  DañosAcaro: { lavado: '', proceso: '' },
  Mgrillo: { lavado: '', proceso: '' },
  ElsinoeRoña: { lavado: '', proceso: '' },
  Melanosis: { lavado: '', proceso: '' },
  WoodPocket: { lavado: '', proceso: '' },
  Trips: { lavado: '', proceso: '' },
  DivisionCelular: { lavado: '', proceso: '' },
  PielNodularligona: { lavado: '', proceso: '' },
  Fumagina: { lavado: '', proceso: '' },
  Sombra: { lavado: '', proceso: '' },
  ManchaFantasma: { lavado: '', proceso: '' },
  Deshidratada: { lavado: '', proceso: '' },
};

const ClasificacionDescarteForm = () => {
  const [detalles, setDetalles] = useState(initialState);
  const [totalPorcentaje, setTotalPorcentaje] = useState(0);
  const [errorPorcentaje, setErrorPorcentaje] = useState('');

  const calcularTotalPorcentaje = () => {
    const total = Object.values(detalles).reduce((acu, current) => {
      const lavado = parseFloat(current.lavado) || 0;
      const proceso = parseFloat(current.proceso) || 0;
      return acu + lavado + proceso;
    }, 0);

    setTotalPorcentaje(total);
  };

  const handleGuardar = () => {
    if (totalPorcentaje !== 100) {
      setErrorPorcentaje('El porcentaje debe ser igual a 100%');
      return;
    }

    setErrorPorcentaje('');

    // Simplemente imprime los datos en la consola
    console.log('Datos guardados:', detalles);

    // Reinicia el formulario a su estado inicial
    setDetalles(initialState);
    setTotalPorcentaje(0);
  };

  return (
    <div className="containerC">
      <div className="details-container">
        {Object.keys(detalles).reduce((columns, key, index) => {
          if (index % 3 === 0) {
            columns.push([]);
          }
          columns[columns.length - 1].push(
            <div key={key} className="detail-item">
              <h3>{key}</h3>
              <div className="row-container">
                <div className="column-container">
                  <div className="sub-label">Lavado:</div>
                  <input
                    className="input"
                    type="number"
                    onChange={(e) => {
                      setDetalles({
                        ...detalles,
                        [key]: { ...detalles[key], lavado: e.target.value },
                      });
                      calcularTotalPorcentaje();
                    }}
                    value={detalles[key].lavado}
                    placeholder="Lavado"
                  />
                </div>
                <div className="column-container">
                  <div className="sub-label">Proceso:</div>
                  <input
                    className="input"
                    type="number"
                    onChange={(e) => {
                      setDetalles({
                        ...detalles,
                        [key]: { ...detalles[key], proceso: e.target.value },
                      });
                      calcularTotalPorcentaje();
                    }}
                    value={detalles[key].proceso}
                    placeholder="Proceso"
                  />
                </div>
              </div>
            </div>
          );
          return columns;
        }, []).map((column, columnIndex) => (
          <div key={columnIndex} className="column-container">
            {column}
          </div>
        ))}
      </div>
      <div>Total Porcentaje: {totalPorcentaje.toFixed(2)}%</div>
      <div>{errorPorcentaje}</div>
      <button className="button" onClick={handleGuardar}>
        Guardar
      </button>
    </div>
  );  
};

export default ClasificacionDescarteForm;
