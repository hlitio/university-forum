const express = require('express');
const { createPost, getAllPosts, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Ruta para crear un post (requiere autenticación)
router.post('/create', protect, createPost);

// Ruta para obtener todos los posts (pública)
router.get('/', getAllPosts);

// Editar un post (requiere autenticación)
router.put('/:id', protect, updatePost);

// Eliminar un post (requiere autenticación)
router.delete('/:id', protect, deletePost);

module.exports = router;
