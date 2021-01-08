mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    email: String,
    password: String,
    password2: String,
    loginCount: Number,
    isAdmin: Boolean
    
   
});

module.exports = mongoose.model('user', userSchema);
