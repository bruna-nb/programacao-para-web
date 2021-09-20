const mongoose = require('mongoose')
const Schema = mongoose.Schema

const grupoSchema = new Schema({
    id: Number,
    plataforma: String
})

module.exports = grupoSchema