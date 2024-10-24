import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navbar";
import Login from "./pages/Login";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost"; // Importar el componente de edición
import PrivateRoute from "./components/PrivateRoute"; // Para proteger la ruta de edición
import Profile from './pages/Profile';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" exact element={<PostList />} />
        <Route path="/register" element={<Register />} />

        {/* Protegemos la ruta de creación de posts */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />

        {/* Protegemos la ruta de edición de posts */}
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
