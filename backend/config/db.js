const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error(`Error de conexión: ${error.message}`);
        process.exit(1);  // Termina el proceso si hay un error
    }
};

connectDB();
module.exports = mongoose;
