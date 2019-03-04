const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content:{
        type:Schema.Types.String,
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref:'Thread',
        required:true
    }
});

const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;