const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Pasa por storage.destination'); // Verificar si entra aquí
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes subidas
    },
    filename: (req, file, cb) => {
        console.log('Pasa por storage.filename'); // Verificar si entra aquí
        console.log('Nombre del archivo original:', file.originalname); // Verificar el nombre del archivo original
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Nombre del archivo con marca de tiempo
    }
});

// Función para filtrar tipos de archivos
const fileFilter = (req, file, cb) => {
    console.log('Pasa por fileFilter'); // Verificar si entra aquí
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    console.log('Extensión válida:', extname); // Mostrar resultado de la validación de la extensión
    console.log('Mimetype válido:', mimetype); // Mostrar resultado de la validación del tipo MIME

    if (mimetype && extname) {
        console.log('Archivo aceptado'); // Confirmación de que el archivo es válido
        return cb(null, true);
    } else {
        console.log('Error: Tipo de archivo no permitido'); // Mostrar error si el archivo no es válido
        cb('Error: Solo se permiten imágenes (jpeg, jpg, png)');
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Tamaño máximo de archivo: 5MB
    fileFilter: fileFilter
});

module.exports = upload;
