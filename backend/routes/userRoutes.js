const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { registerUser, loginUser,getUserProfile, updateUserProfile  } = require('../controllers/userController');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', protect, getUserProfile);

// Ruta para actualizar el perfil del usuario autenticado
router.put('/profile', protect, updateUserProfile);

module.exports = router;
