const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }],
    Date: {
        type: Schema.Types.Date,
        default:Date.now
    }
});




const Thread = mongoose.model('Thread', threadSchema);


module.exports = Thread;