const { Thought, User } = require('../models');

const thoughtController = {
    // get all Thoughts
    getAllThoughts(req, res) {
      Thought.find({})
        .populate({
          path: 'user',
          select: '-__v'
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // get one Thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .populate({
          path: 'user',
          select: '-__v'
        })
        .then(dbThoughtData => {
          // If no Thought is found, send 404
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    createThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
        .then(({ _id  }) => {
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    
    // update Thought by id
    updateThought({ params, body }, res) {
        console.log(params, body)
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
        .then(updatedThought => {
            if (!updatedThought) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
            }
            res.json(updatedThought);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete Thought
    deleteThought({ params }, res) {
        console.log(params)
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Nop thought with this ID' })
          return;
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.json(err));
    },
    removeReaction({ params }, res ) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId }}},
        { new: true }
      )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err))
    }
  }

module.exports = thoughtController;