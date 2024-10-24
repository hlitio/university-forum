import React, { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile } from '../services/api';
import { Container, Form, Button } from 'react-bootstrap';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', bio: '', avatar: '' });
    const [editing, setEditing] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await fetchUserProfile(token);
                setProfile(response.data);
            } catch (error) {
                console.error('Error al cargar el perfil', error);
            }
        };

        loadProfile();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(profile, token);
            setEditing(false); // Salir del modo edición
        } catch (error) {
            console.error('Error al actualizar el perfil', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Perfil de Usuario</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        readOnly={!editing}
                    />
                </Form.Group>

                <Form.Group controlId="bio" className="mt-3">
                    <Form.Label>Biografía</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        readOnly={!editing}
                    />
                </Form.Group>

                <Form.Group controlId="avatar" className="mt-3">
                    <Form.Label>URL del Avatar</Form.Label>
                    <Form.Control
                        type="text"
                        value={profile.avatar}
                        onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                        readOnly={!editing}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    className="mt-3"
                    onClick={() => setEditing(!editing)}
                >
                    {editing ? 'Guardar' : 'Editar Perfil'}
                </Button>
            </Form>
        </Container>
    );
};

export default Profile;
