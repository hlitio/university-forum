import React, { useState, useEffect } from 'react';
import { fetchPosts, deletePost, toggleLike } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import CommentList from './CommentList'; // Importamos el componente de comentarios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons'; // Íconos

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Usamos el ID del usuario autenticado

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

    // Manejar el like
    const handleLike = async (postId) => {
        try {
            const response = await toggleLike(postId, token);
            setPosts(posts.map(post => post._id === postId ? response.data : post)); // Actualizar el post con el nuevo estado de likes
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Posts Recientes</h2>
            <Row>
                {posts.map(post => (
                    <Col md={4} key={post._id}>
                        <Card className="mb-4">
                            <Card.Body>
                                {/* Verificar si el post tiene una imagen y mostrarla */}
                                {post.image && (
                                    <div className="mb-3">
                                        <img 
                                            src={`http://localhost:5000${post.image}`} 
                                            alt="Imagen del post" 
                                            className="img-fluid" 
                                            style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }} 
                                        />
                                    </div>
                                )}

                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.content}</Card.Text>

                                {/* Footer para nombre del autor y likes */}
                                <Card.Footer className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">Por: {post.user.name}</small>

                                    <div className="icons d-flex align-items-center">
                                        {/* Botón de like */}
                                        <FontAwesomeIcon
                                            icon={faThumbsUp}
                                            className="text-primary me-2"
                                            onClick={() => handleLike(post._id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <span>{post.likes.length}</span> {/* Mostrar el número de likes */}
                                    </div>
                                </Card.Footer>
                            </Card.Body>

                            {/* Mostrar los comentarios del post */}
                            <Card.Body>
                                <CommentList postId={post._id} />

                                {/* Botones de editar/eliminar debajo del sistema de comentarios */}
                                {post.user._id === userId && ( // Comparar correctamente el ID del usuario
                                    <div className="mt-3 d-flex justify-content-end">
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
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PostList;
