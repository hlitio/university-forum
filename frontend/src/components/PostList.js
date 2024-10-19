import React, { useState, useEffect } from 'react';
import { fetchPosts, deletePost } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import CommentList from './CommentList'; // Importamos el componente de comentarios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Íconos

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await fetchPosts();
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadPosts();
    }, []);

    // Manejar la eliminación de un post
    const handleDelete = async (postId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este post?')) {
            try {
                await deletePost(postId, token);
                setPosts(posts.filter(post => post._id !== postId)); // Actualizar la lista de posts
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Navegar a la página de edición
    const handleEdit = (postId) => {
        navigate(`/edit/${postId}`); // Redirigir a la página de edición
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Posts Recientes</h2>
            <Row>
                {posts.map(post => (
                    <Col md={4} key={post._id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.content}</Card.Text>

                                {/* Footer para nombre del autor e íconos */}
                                <Card.Footer className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">Por: {post.user.name}</small>

                                    {post.user.name === userName && (
                                        <div className="icons">
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="text-warning me-3"
                                                onClick={() => handleEdit(post._id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                className="text-danger"
                                                onClick={() => handleDelete(post._id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    )}
                                </Card.Footer>
                            </Card.Body>

                            {/* Mostrar los comentarios del post */}
                            <Card.Body>
                                <CommentList postId={post._id} />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PostList;
