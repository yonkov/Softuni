const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    comment: {
        type: String,
        required: true
      },
      author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      post:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
      },
      creationDate: {
        type: Schema.Types.Date,
        default: Date.now
      },

})

module.exports = mongoose.model('Comment', commentSchema)