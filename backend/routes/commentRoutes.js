const express = require('express');
const { createComment, getCommentsByPost } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Ruta para crear un comentario
router.post('/', protect, createComment);

// Ruta para obtener comentarios de un post
router.get('/:postId', getCommentsByPost);

module.exports = router;
