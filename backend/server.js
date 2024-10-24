const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');

dotenv.config();  // Cargar variables de entorno

// Conectar a la base de datos
connectDB();  // Llamar a la función para establecer la conexión

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*', // Permitir todos los orígenes (puedes cambiar esto para mayor seguridad)
}));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
