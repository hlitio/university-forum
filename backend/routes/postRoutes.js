const express = require('express');
const { createPost, getAllPosts, updatePost, deletePost, toggleLikePost, createPostWithImage  } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const upload = require('../config/multer');

// Ruta para crear un nuevo post con imagen
router.post('/create', protect, upload.single('image'), createPostWithImage);

// Ruta para obtener todos los posts (pública)
router.get('/', getAllPosts);

// Editar un post (requiere autenticación)
router.put('/:id', protect, updatePost);

// Eliminar un post (requiere autenticación)
router.delete('/:id', protect, deletePost);

// Nueva ruta para dar o quitar like
router.put('/:id/like', protect, toggleLikePost);


module.exports = router;
