import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { updatePost, fetchPosts } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Obtener el ID del post desde la URL
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadPost = async () => {
            try {
                const response = await fetchPosts();
                const post = response.data.find(post => post._id === id);
                if (post) {
                    setTitle(post.title);
                    setContent(post.content);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        loadPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost(id, { title, content }, token);            
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <Container>
            <h2 className="my-4">Editar Post</h2>
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

                <Button variant="primary" type="submit" className="mt-3">
                    Guardar Cambios
                </Button>
            </Form>
        </Container>
    );
};

export default EditPost;
