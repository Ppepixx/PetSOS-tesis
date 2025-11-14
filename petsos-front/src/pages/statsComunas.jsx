import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { getStatsComunasRequest } from '../api/publis.js'; // Importamos la nueva función
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

function StatsComunas() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getStatsComunasRequest();
        
        // Ordenamos los datos (ascendente) para que el gráfico
        // muestre la barra más grande arriba
        const sortedData = res.data.sort((a, b) => a.count - b.count);
        
        setStats(sortedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("No se pudieron cargar las estadísticas.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 1. Estado de carga
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 2. Estado de error
  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  // 3. Estado sin datos
  if (stats.length === 0) {
    return (
      <Typography sx={{ p: 3, color: 'text.secondary', textAlign: 'center' }}>
        No hay datos de publicaciones por comuna para mostrar.
      </Typography>
    );
  }
  
  // 4. Estado con datos (¡mostrar el gráfico!)
  
  // Calculamos una altura dinámica para el gráfico
  // Así evitamos que las barras se vean muy juntas si hay muchas comunas
  const chartHeight = stats.length * 40 + 120; // 40px por barra + márgenes

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ pl: '10px' }}>
        Publicaciones por Comuna
      </Typography>
      <Box sx={{ height: chartHeight, width: '100%' }}>
        <BarChart
          dataset={stats} // Los datos que obtuvimos de la API
          yAxis={[{ 
            scaleType: 'band', 
            dataKey: 'comuna' // El campo 'comuna' irá en el eje Y (vertical)
          }]}
          series={[{ 
            dataKey: 'count', // El campo 'count' (conteo) irá en el eje X (horizontal)
            label: 'N° Publicaciones',
            color: '#739e5c' // Un color verde similar al de tu logo
          }]}
          layout="horizontal" // Definimos el gráfico como horizontal
          grid={{ x: true }} // Añadimos una rejilla vertical para legibilidad
          margin={{ left: 150, right: 30, top: 30, bottom: 40 }} // Damos espacio a la izquierda para los nombres
        />
      </Box>
    </Box>
  );
}

export default StatsComunas;