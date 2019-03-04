const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');

let userSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    firstName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    lastName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.String
    }],
    salt: {
        type: String,
        required: true
    },
    blockedUsers:[{
        type: mongoose.Schema.Types.String
    }]
}, {
    usePushEach: true
});


userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.passwordHash;
},

    isAuthor: function (article) {
        if (!article) {
            return false;
        }

        let isAuthor = article.author.equals(this._id);

        return isAuthor;
    },

    isInRole: function (role) {
        return this.roles.indexOf(role) !== -1;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdmin = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const passwordHash = encryption.generateHashedPassword(salt, 'Admin');
        return User.create({
            username: 'Admin',
            passwordHash,
            firstName: 'Admin',
            lastName: ' Adminov',
            salt,
            roles: ['Admin'],
            blockedUsers: []
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;