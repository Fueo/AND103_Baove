const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const vaccineSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    national: { type: String },
    price: { type: Number, default: 0 }
});

module.exports = mongoose.models.vaccine || mongoose.model('vaccine', vaccineSchema);