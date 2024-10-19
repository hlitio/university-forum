import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { createPost } from '../services/api';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión');
            return;
        }

        try {
            await createPost({ title, content }, token);
            alert('Post creado exitosamente');
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

                <Form.Group controlId="content">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Escribe el contenido aquí..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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
