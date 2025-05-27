const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

console.log("MONGO_URI cargada:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas conectado'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

app.get('/', (req, res) => res.send('API funcionando'));

module.exports = app;
