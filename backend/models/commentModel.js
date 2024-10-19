const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    {
        timestamps: true, // Para guardar la fecha de creación y actualización del comentario
    }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
