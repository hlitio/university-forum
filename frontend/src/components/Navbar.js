import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    const userName = localStorage.getItem('userName'); // Suponiendo que también almacenas el nombre del usuario

    // Función para cerrar sesión
    const logoutHandler = () => {
        localStorage.removeItem('token'); // Eliminar el token
        localStorage.removeItem('userName'); // Eliminar el nombre del usuario
        localStorage.removeItem('userId'); // Eliminar el ID del usuario
        navigate('/'); // Redirigir al inicio
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">University Forum</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Posts</Nav.Link>
                    </LinkContainer>

                    {isLoggedIn ? (
                        <>
                            <LinkContainer to="/create">
                                <Nav.Link>Crear Post</Nav.Link>
                            </LinkContainer>
                            <NavDropdown title={userName || "Cuenta"} id="basic-nav-dropdown">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>Cerrar Sesión</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
