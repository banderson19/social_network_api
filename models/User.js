const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        match: [/.+@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ], 
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtual: true,
        getters: true
    },
    id: false
})

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;