const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EditSchema = new Schema({
    content: {
        type: Schema.Types.String,
        required: true
    },
    creationDate:{
        type: Schema.Types.Date,
        default: Date.now
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    article: [{
            type: Schema.Types.ObjectId,
            ref: 'Article',
    }]
},{ usePushEach: true });

const Edit = mongoose.model('Edit', EditSchema);

module.exports = Edit;