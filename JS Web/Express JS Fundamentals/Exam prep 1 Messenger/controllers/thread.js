const User = require('mongoose').model('User');
const Thread = require('../models/Thread');
const Messages = require('../models/Messages');

module.exports = {
    findThreadPost: async (req, res) => {

        try {
            if (req.user) {
                let currentUserId = req.user._id;
                let otherUser = req.body.username;

                let otherUsername = await User.findOne({
                    username: otherUser
                });

                if (otherUsername) {
                    let otherUserId = otherUsername._id;

                    let thread = await Thread.findOne({
                        users: {
                            $all: [currentUserId, otherUserId]
                        }
                    });

                    if (!thread) {
                        await Thread.create({
                            users: [
                                currentUserId,
                                otherUserId
                            ]
                        });
                    }
                    res.redirect(`/threads/${otherUser}`);
                }
            } else {
                res.redirect('/');
            }

        } catch (err) {
            console.log(err);
        }
    },
    findThreadGet: async (req, res) => {

        try {
            let currentUserId = req.user._id;
            let otherUserId = await User.findOne({
                username: req.params.otherUser
            })
            

            let thread = await Thread.findOne({
                users: {
                    $all: [currentUserId, otherUserId._id]
                }
            });

            let messages = await Messages.find({thread: thread._id})

            messages.forEach(message => {
                if (message.user.toString() !== req.user._id.toString()) {
                  message.isMine = true;
                }
                if (message.content.startsWith('http') || message.content.endsWith('.jpg')|| message.content.endsWith('.png')) {
                  message.isImage = true;
                }
              });

              let otherIsBlocked = false;
              let amBlocked = false;
              console.log(otherUserId.blockedUsers);
              
              if (otherUserId.blockedUsers.includes(req.user.username)) {
                amBlocked = true;
              }
        
              if (req.user.blockedUsers.includes(req.params.otherUser)) {
                otherIsBlocked = true;
              }
              console.log(amBlocked);
              

            res.render('threads/chatroom', {
                otherUser: req.params.otherUser,
                messages,
                id: thread._id,
                otherIsBlocked,
                amBlocked
            });
        } catch (err) {
            console.log(err);

        }
    },

    sendMessagePost: async(req, res)=>{
        try {
            
            let content = req.body.message;
            
            let user = (await User.findOne({
                username: req.params.otherUser
            }))._id
            
            let thread = req.body.threadId;

            await Messages.create({
                content,
                user,
                thread
            })
            res.redirect('/threads/' + req.params.otherUser);

        } catch (error) {
            console.log(error);
            
        }
    },
    blockUserPost: async (req, res)=>{
        try {
            
            req.user.blockedUsers.push(req.params.otherUser);
            console.log(req.user.blockedUsers);
            
            await req.user.save();
            console.log(req.user.blockedUsers);
            res.redirect('/threads/' + req.params.otherUser);

        } catch (error) {
            console.log(error);
        }

    },
    unblockUserPost: async (req, res) => {
        try {
            req.user.blockedUsers = req.user.blockedUsers.filter(user => user !== req.params.otherUser);
            await req.user.save();
            res.redirect('/threads/' + req.params.otherUser);
        } catch (err) {
            console.log(err);
        }
    }
}