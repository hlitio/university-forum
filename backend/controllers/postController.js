const Post = require('../models/postModel');

// Crear un nuevo post
const createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            user: req.user._id  // Usar el ID del usuario autenticado
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el post' });
    }
};

// Obtener todos los posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name email');  // Poblamos los detalles del usuario
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
};

// Editar un post existente
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verificar si el post pertenece al usuario autenticado
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'No tienes permiso para editar este post' });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el post' });
    }
};

// Eliminar un post
const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verificar si el post pertenece al usuario autenticado
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este post' });
        }

        await post.remove();
        res.json({ message: 'Post eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el post' });
    }
};



module.exports = { createPost, getAllPosts, updatePost, deletePost };
