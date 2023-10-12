import React, { useState, useEffect } from 'react';
import '../CalidadInterna.css';

const CalidadInternaForm = () => {
  const initialState = {
    contenidoZum: {
      PesoInicial: '',
      PesoZumo: '',
      Semillas: false,
    },
    pruebasPlataforma: {
      muestra1: { brix: '', acidez: '' },
      muestra2: { brix: '', acidez: '' },
      muestra3: { brix: '', acidez: '' },
    },
  };

  const [datos, setDatos] = useState(initialState);
  const [porcentajeLlenado, setPorcentajeLlenado] = useState(0);
  const [mensajeGuardado, setMensajeGuardado] = useState('');

  const handleGuardar = () => {
    // Lógica para guardar los datos en la API (reemplaza con tu lógica de envío de datos a la API)
    console.log('Datos guardados:', datos);
    setMensajeGuardado('Los datos se han guardado correctamente');

    // Resetear los datos automáticamente después de 2 segundos (puedes ajustar el tiempo)
    setTimeout(() => {
      setDatos(initialState);
      setPorcentajeLlenado(0);
      setMensajeGuardado('');
    }, 2000);
  };

  useEffect(() => {
    // Calcula el porcentaje de llenado cuando cambian los valores de los campos
    const { pesoInicial, pesoZumo } = datos.contenidoZum;
    const camposLlenos = [pesoInicial, pesoZumo].filter((valor) => valor !== '').length;
    const totalCampos = 2; // Número total de campos en contenidoZum
    const porcentaje = (camposLlenos / totalCampos) * 100;

    // Actualiza el estado del porcentaje de llenado
    setPorcentajeLlenado(porcentaje);
  }, [datos]);

  return (
    <div className="container">
      {/* Sección "Contenido Zum" */}
      <div className="section">
        <h2 className="label">Contenido Zum</h2>
        <input
          className="input"
          type="number"
          onChange={(e) =>
            setDatos({
              ...datos,
              contenidoZum: { ...datos.contenidoZum, pesoInicial: e.target.value },
            })
          }
          value={datos.contenidoZum.pesoInicial}
          placeholder="Peso inicial muestra (gr)"
        />
        <input
          className="input"
          type="number"
          onChange={(e) =>
            setDatos({
              ...datos,
              contenidoZum: { ...datos.contenidoZum, pesoZumo: e.target.value },
            })
          }
          value={datos.contenidoZum.pesoZumo}
          placeholder="Peso zumo (gr)"
        />
        <div className="checkBoxContainer">
          <label htmlFor="semillas">Semillas</label>
          <input
            id="semillas"
            type="checkbox"
            checked={datos.contenidoZum.semillas}
            onChange={(e) =>
              setDatos({
                ...datos,
                contenidoZum: { ...datos.contenidoZum, semillas: e.target.checked },
              })
            }
          />
        </div>
        <p>Porcentaje de Llenado de Contenido Zum: {porcentajeLlenado.toFixed(2)}%</p>
      </div>

      {/* Sección "Pruebas de plataforma" */}
      <div className="section">
        <h2 className="label">Pruebas de plataforma</h2>
        {[1, 2, 3].map((muestraNum) => (
          <div key={muestraNum} className="muestraContainer">
            <p>N° muestra {muestraNum}</p>
            <input
              className="input"
              type="number"
              onChange={(e) =>
                setDatos({
                  ...datos,
                  pruebasPlataforma: {
                    ...datos.pruebasPlataforma,
                    [`muestra${muestraNum}`]: {
                      ...datos.pruebasPlataforma[`muestra${muestraNum}`],
                      brix: e.target.value,
                    },
                  },
                })
              }
              value={datos.pruebasPlataforma[`muestra${muestraNum}`].brix}
              placeholder="Brix"
            />
            <input
              className="input"
              type="number"
              onChange={(e) =>
                setDatos({
                  ...datos,
                  pruebasPlataforma: {
                    ...datos.pruebasPlataforma,
                    [`muestra${muestraNum}`]: {
                      ...datos.pruebasPlataforma[`muestra${muestraNum}`],
                      acidez: e.target.value,
                    },
                  },
                })
              }
              value={datos.pruebasPlataforma[`muestra${muestraNum}`].acidez}
              placeholder="Acidez"
            />
          </div>
        ))}
      </div>

      {/* Mensaje de guardado */}
      {mensajeGuardado && <p>{mensajeGuardado}</p>}

      {/* Botón de guardar */}
      <button className="button" onClick={handleGuardar}>
        Guardar
      </button>
    </div>
  );
};

export default CalidadInternaForm;


