import React, { useState, useEffect } from 'react';
import '../App.css';

const ClasificacionDescarteForm = () => {
  const initialState = {
    'Oleocelosis': { lavado: '', proceso: '' },
    'Fruta Verde': { lavado: '', proceso: '' },
    'Daños Herbicida': { lavado: '', proceso: '' },
    'Fruta Sobre Madura': { lavado: '', proceso: '' },
    'Daños Mecanicos': { lavado: '', proceso: '' },
    'Escama y Piojo Blanco': { lavado: '', proceso: '' },
    'Daños Acaro': { lavado: '', proceso: '' },
    'Mgrillo': { lavado: '', proceso: '' },
    'Elsinoe-Roña': { lavado: '', proceso: '' },
    'Melanosis': { lavado: '', proceso: '' },
    'Wood Pocket': { lavado: '', proceso: '' },
    'Trips': { lavado: '', proceso: '' },
    'Division Celular': { lavado: '', proceso: '' },
    'Piel Nodular': { lavado: '', proceso: '' },
    'Fumagina': { lavado: '', proceso: '' },
    'Sombra': { lavado: '', proceso: '' },
    'Mancha Fantasma': { lavado: '', proceso: '' },
    'Deshidratada': { lavado: '', proceso: '' },
  };

  const [detalles, setDetalles] = useState(initialState);
  const [totalPorcentaje, setTotalPorcentaje] = useState(0);
  const [errorPorcentaje, setErrorPorcentaje] = useState('');
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);
  const [actualizacionExitosa, setActualizacionExitosa] = useState(false);

  useEffect(() => {
    calcularTotalPorcentaje();
  }, [detalles]);

  const calcularTotalPorcentaje = () => {
    const promedios = Object.keys(detalles).map((key) => {
      const lavado = parseFloat(detalles[key].lavado) || 0;
      const proceso = parseFloat(detalles[key].proceso) || 0;
      return (lavado + proceso) / 2;
    });

    const total = promedios.reduce((acu, promedio) => acu + promedio, 0);
    setTotalPorcentaje(total);
  };

  const handleGuardar = () => {
    if (totalPorcentaje !== 100) {
      setErrorPorcentaje('El porcentaje debe ser igual a 100%');
      setActualizacionExitosa(false);
      return;
    }

    setErrorPorcentaje('');
    setGuardadoExitoso(true);
    setActualizacionExitosa(false);

    console.log('Datos guardados:', detalles);

    setDetalles(initialState);
    setTotalPorcentaje(0);

    setActualizacionExitosa(true);
  };

  const handleReset = () => {
    setDetalles(initialState);
    setTotalPorcentaje(0);
    setGuardadoExitoso(false);
    setActualizacionExitosa(false);
  };

  return (
    <div className="containerC">
      <div>
        <div className="floating-percentage">
          Total Porcentaje: {totalPorcentaje.toFixed(2)}%
        </div>
      </div>
      <div className="details-container">
        {Object.keys(detalles).reduce((columns, key, index) => {
          if (index % 5 === 0) {
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
                      const newDetalles = {
                        ...detalles,
                        [key]: { ...detalles[key], lavado: e.target.value },
                      };
                      setDetalles(newDetalles);
                      calcularTotalPorcentaje();
                    }}
                    value={detalles[key].lavado}
                    placeholder="Lavado"
                  />
                </div>
                <div className="column-container">
                  <div className="sub-label">Proceso: </div>
                  <input
                    className="input"
                    type="number"
                    onChange={(e) => {
                      const newDetalles = {
                        ...detalles,
                        [key]: { ...detalles[key], proceso: e.target.value },
                      };
                      setDetalles(newDetalles);
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
      <div>{errorPorcentaje}</div>
      {guardadoExitoso ? (
        <div>
          Datos guardados correctamente.{' '}
          <button onClick={handleReset}>Aceptar</button>
        </div>
      ) : (
        <button className="button" onClick={handleGuardar}>
          Guardar
        </button>
      )}
      {actualizacionExitosa && (
        <div>Actualización exitosa. Los valores se han actualizado correctamente.</div>
      )}
    </div>
  );
};

export default ClasificacionDescarteForm;
