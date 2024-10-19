const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

// Crear un comentario para un post
const createComment = async (req, res) => {
    const { postId, content } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        const comment = await Comment.create({
            content,
            user: req.user._id, // Usuario autenticado
            post: postId,
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario' });
    }
};

// Obtener comentarios para un post
const getCommentsByPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ post: postId }).populate('user', 'name');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
};

module.exports = { createComment, getCommentsByPost };
