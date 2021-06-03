const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {

    },
    reactionBody: {

    }, 
    username: {

    },
    createdAt: {

    }
})

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;