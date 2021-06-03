const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {

    },
    createdAt: {

    },
    username: {

    }, 
    reactions: {

    }
})


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;