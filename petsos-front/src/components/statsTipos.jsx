import React, { useEffect, useState } from 'react';
// 1. Importamos el gráfico de Dona (Doughnut)
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getStatsTiposRequest } from '../api/publi.js';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

// 2. Registramos los componentes para el gráfico circular
ChartJS.register(ArcElement, Tooltip, Legend);

// Función para poner la primera letra en mayúscula
const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

function StatsTipos() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getStatsTiposRequest();

        if (Array.isArray(res.data)) {
          // Transformamos los datos para Chart.js
          const labels = res.data.map(item => capitalize(item.tipo));
          const dataPoints = res.data.map(item => item.count);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'N° Publicaciones',
                data: dataPoints,
                // Colores que combinan con tu app
                backgroundColor: [ 
                  'rgba(190, 24, 93, 0.7', // Rosa pastel (Extravío)
                  'rgba(236, 72, 153, 0.7)', // Fucsia (Rescate)
                  'rgba(251, 207, 232, 0.7)'  // Púrpura/Azul (Adopción)
                ],
                borderColor: [
                  'rgb(190, 24, 93)',
                  'rgb(236, 72, 153)',
                  'rgb(251, 207, 232)'
                ],
                borderWidth: 1,
              },
            ],
          });
          setError(null);
        } else {
          setError("La respuesta de la API no tiene el formato esperado.");
        }
      } catch (err) {
        console.error("Error cargando stats:", err);
        setError("No se pudieron cargar las estadísticas.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Para que se ajuste al contenedor
    plugins: {
      legend: {
        position: 'top', // La leyenda (ej: "Extravío") irá arriba
      },
    },
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, height: '400px', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  if (!chartData || chartData.labels.length === 0) {
    return (
      <Typography sx={{ p: 3, color: 'text.secondary', textAlign: 'center', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        No hay datos de publicaciones por tipo para mostrar.
      </Typography>
    );
  }

  return (
    // Usamos los estilos de Tailwind que ya tenías
    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Tipo de Publicaciones que se Realizan
      </h3>
      {/* Definimos una altura fija para el gráfico circular */}
      <Box sx={{ height: '350px', width: '100%', position: 'relative' }}>
        <Doughnut options={options} data={chartData} />
      </Box>
    </div>
  );
}

export default StatsTipos;