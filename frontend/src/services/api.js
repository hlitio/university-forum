import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/users/login`, credentials);
};

export const fetchPosts = async () => {
    return await axios.get(`${API_URL}/posts`);
};

// export const createPost = async (postData, token) => {
//     return await axios.post(`${API_URL}/posts/create`, postData, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         }
//     });
// };

// Eliminar un post
export const deletePost = async (postId, token) => {
    return await axios.delete(`${API_URL}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Editar un post (se usará más adelante)
export const updatePost = async (postId, postData, token) => {
    return await axios.put(`${API_URL}/posts/${postId}`, postData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


// Obtener comentarios de un post
export const fetchComments = async (postId) => {
    return await axios.get(`${API_URL}/comments/${postId}`);
};

// Agregar un comentario a un post
export const addComment = async (commentData, token) => {
    return await axios.post(`${API_URL}/comments`, commentData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Dar o quitar like a un post
export const toggleLike = async (postId, token) => {
    return await axios.put(`${API_URL}/posts/${postId}/like`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


// Obtener perfil del usuario
export const fetchUserProfile = async (token) => {
    return await axios.get(`${API_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Actualizar perfil del usuario
export const updateUserProfile = async (profileData, token) => {
    return await axios.put(`${API_URL}/users/profile`, profileData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Crear un nuevo post con imagen
export const createPost = async (postData, token) => {
    return await axios.post(`${API_URL}/posts/create`, postData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Importante para enviar archivos
        },
    });
};

// Registrar un nuevo usuario
export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/users/register`, userData);
};
