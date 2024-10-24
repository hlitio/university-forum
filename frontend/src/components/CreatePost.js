import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { createPost } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // Estado para la imagen
    const navigate = useNavigate();

    // Manejar el cambio en el input de la imagen
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Guardar el archivo en el estado
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión');
            return;
        }

        // Crear un objeto FormData para enviar los datos
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image); // Añadir el archivo de la imagen
        }

        try {
            await createPost(formData, token);
            navigate('/'); // Redirigir a la página inicial después de crear el post
        } catch (error) {
            console.error(error);
            alert('Error al crear el post');
        }
    };

    return (
        <Container>
            <h2 className="my-4">Crear Nuevo Post</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduce el título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="content" className="mt-3">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Escribe el contenido aquí..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="image" className="mt-3">
                    <Form.Label>Subir Imagen</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*" // Aceptar solo imágenes
                        onChange={handleImageChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Crear Post
                </Button>
            </Form>
        </Container>
    );
};

export default CreatePost;
