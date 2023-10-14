import React, { useState } from 'react';
import '../CalidadInterna.css';

const CalidadInternaForm = () => {
  const initialState = {
    contenidoZum: {
      pesoInicial: '',
      pesoZumo: '',
      semillas: false,
    },
    pruebasPlataforma: {
      muestra1: { brix: '', acidez: '' },
      muestra2: { brix: '', acidez: '' },
      muestra3: { brix: '', acidez: '' },
    },
    promedios: {
      brix: '0',  // Inicializar promedios en blanco
      acidez: '0',
    },
  };

  const [datos, setDatos] = useState(initialState);
  const [mensajeGuardado, setMensajeGuardado] = useState('');

  // Función para calcular el porcentaje de llenado
  const calcularPorcentaje = () => {
    const pesoInicial = parseFloat(datos.contenidoZum.pesoInicial);
    const pesoZumo = parseFloat(datos.contenidoZum.pesoZumo);
    if (isNaN(pesoInicial) || isNaN(pesoZumo) || pesoInicial === 0) {
      return 'N/A';
    }
    const porcentaje = (pesoZumo / pesoInicial) * 100;
    return porcentaje.toFixed(2);
  };

  // Función para calcular promedios de brix y acidez
  const calcularPromedios = () => {
    const { pruebasPlataforma } = datos;
    let totalBrix = 0;
    let totalAcidez = 0;

    for (let muestraNum = 1; muestraNum <= 3; muestraNum++) {
      totalBrix += parseFloat(pruebasPlataforma[`muestra${muestraNum}`].brix) || 0;
      totalAcidez += parseFloat(pruebasPlataforma[`muestra${muestraNum}`].acidez) || 0;
    }

    const promedioBrix = (totalBrix / 3).toFixed(2);
    const promedioAcidez = (totalAcidez / 3).toFixed(2);

    console.log('Datos en calcularPromedios:', datos);
    console.log('Total Brix:', totalBrix);
    console.log('Total Acidez:', totalAcidez);

    return { brix: promedioBrix, acidez: promedioAcidez };
  };

  const handleGuardar = () => {
    // Calcular los promedios
    const promedios = calcularPromedios();
  
    // Actualizar el estado de datos con los promedios
    setDatos((prevDatos) => ({
      ...prevDatos,
      promedios: promedios,
    }));
  
    // Lógica para guardar los datos en la API (reemplaza con tu lógica de envío de datos a la API)
    console.log('Datos guardados:', datos); // Esto puede mostrar valores desactualizados debido a la asincronía
  
    setMensajeGuardado('Los datos se han guardado correctamente');
  
    // Resetear los datos automáticamente después de 2 segundos (puedes ajustar el tiempo)
    setTimeout(() => {
      setDatos(initialState);
      setMensajeGuardado('');
    }, 2000);
  };

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
        <p>Porcentaje de Llenado de Contenido Zum: {calcularPorcentaje()}%</p>
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





