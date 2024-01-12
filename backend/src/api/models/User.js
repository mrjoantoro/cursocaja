const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['Administrador', 'IntegranteCP', 'Apoderado'],
        required: true
    },
});

// Hashing password antes de guardar
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para verificar la contraseña
usuarioSchema.methods.compararPassword = async function (passwordCandidato) {
    return bcrypt.compare(passwordCandidato, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;