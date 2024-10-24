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

// Dar o quitar like a un post
const toggleLikePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Usuario autenticado

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Verificar si el usuario ya ha dado like
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            // Si el usuario ya ha dado like, quitamos el like
            post.likes = post.likes.filter((like) => like.toString() !== userId.toString());
        } else {
            // Si el usuario no ha dado like, lo agregamos
            post.likes.push(userId);
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar el like' });
    }
};


const createPostWithImage = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user ? req.user._id : null;   
    try {
        console.log('Datos recibidos:', { title, content, userId: userId.toString() }); // Convertimos a string para verificar

        if (!userId) {
            throw new Error('Usuario no autenticado o no se encontró el ID del usuario');
        }

        if (!req.file) {
            console.log('Advertencia: No se recibió ninguna imagen');
        }

        // Crear el post usando el ID del usuario
        const post = new Post({
            title,
            content,
            user: userId, // El ID del usuario se pasa tal cual
            image: req.file ? `/uploads/${req.file.filename}` : null,
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.error('Error en createPostWithImage:', error.message);
        res.status(500).json({ message: 'Error al crear el post', error: error.message });
    }
};



module.exports = { createPost, getAllPosts, updatePost, deletePost, toggleLikePost, createPostWithImage  };
