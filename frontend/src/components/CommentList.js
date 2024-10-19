import React, { useState, useEffect } from 'react';
import { fetchComments, addComment } from '../services/api';
import { Form, Button, ListGroup, Container } from 'react-bootstrap';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadComments = async () => {
            try {
                const response = await fetchComments(postId);
                setComments(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {
            const response = await addComment({ postId, content }, token);
            setComments([...comments, response.data]); // Agregar el nuevo comentario a la lista
            setContent(''); // Limpiar el campo de comentario
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h5>Comentarios</h5>
            <ListGroup className="mb-3">
                {comments.map(comment => (
                    <ListGroup.Item key={comment._id}>
                        <strong>{comment.user.name}: </strong>{comment.content}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Formulario para agregar un comentario */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="content">
                    <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Escribe un comentario..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                    Comentar
                </Button>
            </Form>
        </Container>
    );
};

export default CommentList;
