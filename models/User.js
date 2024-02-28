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
    userKey: {
        type: String
    }
}, {timestamps:true});

const UserModal = mongoose.model('User', userSchema);

module.exports = UserModal;


