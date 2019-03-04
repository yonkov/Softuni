const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Articleschema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    content: {
        type: Schema.Types.String,
        required: true
    },
    creationDate:{
        type: Schema.Types.Date,
        default: Date.now
    },
    
    lockedStatus: {
        type: Schema.Types.Boolean,
        default: false
    },
    edits: [{
            type: Schema.Types.ObjectId,
            ref: 'Edit',
    }]
},{ usePushEach: true });

const Article = mongoose.model('Article', Articleschema);

module.exports = Article;