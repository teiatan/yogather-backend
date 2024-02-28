const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    clicks: {
        type: Object
    },
    direction: {
        type: String  
    },
    answers: {
        type: Object
    },
    availability: {
        email: String
    }
});

const UserModal = mongoose.model('User', userSchema);

module.exports = UserModal;


