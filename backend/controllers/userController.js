const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario (sin cambios)
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Autenticar un usuario y devolver un token JWT
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token
        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',  // Token válido por 1 hora
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};




// Obtener perfil del usuario autenticado
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Usamos el ID del usuario autenticado
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            name: user.name,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener perfil' });
    }
};

// Actualizar perfil del usuario autenticado
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Usamos el ID del usuario autenticado
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        user.avatar = req.body.avatar || user.avatar; // Permitir cambiar avatar

        await user.save();

        res.json({
            name: user.name,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar perfil' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
