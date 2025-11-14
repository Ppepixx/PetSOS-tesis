import React, { useEffect, useState } from 'react';
// 1. Importamos las nuevas librerías
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getStatsComunasRequest } from '../api/publi.js';
// Usamos los componentes de MUI para los estados de carga y error
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

// 2. Registramos los componentes que Chart.js necesita para funcionar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StatsComunas() {
  // 'chartData' tendrá los datos en el formato que Chart.js necesita
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getStatsComunasRequest();

        if (Array.isArray(res.data)) {
          // 3. Transformamos los datos de la API:
          // La API entrega: [{ comuna: 'A', count: 5 }, { comuna: 'B', count: 10 }]
          // Chart.js necesita: { labels: ['A', 'B'], datasets: [{ data: [5, 10] }] }
          
          const labels = res.data.map(item => item.comuna);
          const dataPoints = res.data.map(item => item.count);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'N° Publicaciones',
                data: dataPoints,
                backgroundColor: 'rgba(244, 114, 182, 0.7)', // Color verde de tu app con transparencia
                borderColor: 'rgb(244, 114, 182)',
                borderWidth: 1,
              },
            ],
          });
          setError(null);

        } else {
          console.error("La respuesta de la API no es un array:", res.data);
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

  // 4. Opciones del gráfico (¡aquí lo hacemos horizontal!)
  const options = {
    indexAxis: 'y', // <-- Esto gira el gráfico para que sea horizontal
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true, // Hace que el gráfico se adapte al contenedor
    maintainAspectRatio: false, // <-- Importante para que se ajuste a la altura dinámica
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false, // Ya tenemos un título en el contenedor
      },
    },
  };

  // --- Renderizado de Estados ---

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  // Si no hay datos (o chartData está vacío)
  if (!chartData || chartData.labels.length === 0) {
    return (
      <Typography sx={{ p: 3, color: 'text.secondary', textAlign: 'center' }}>
        No hay datos de publicaciones por comuna para mostrar.
      </Typography>
    );
  }

  // 5. ¡Mostrar el gráfico!
  
  // Calculamos una altura dinámica para que las barras no se vean apretadas
  const chartHeight = chartData.labels.length * 40 + 150; // 40px por barra + 150px de márgenes

  return (
    // Usamos los estilos de Tailwind que ya tenías para el contenedor
    <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Comunas donde se realizan publicaciones
      </h3>

      {/* Usamos un Box de MUI para darle una altura dinámica al gráfico */}
      <Box sx={{ height: `${chartHeight}px`, width: '100%', position: 'relative' }}>
        <Bar options={options} data={chartData} />
      </Box>
    </div>
  );
}

export default StatsComunas;