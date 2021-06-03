const { User } = require ('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(dbUserData => {
            //If no pizza is found, send 404
            if (!dbUserData) {
                res.status(404).json({message: 'No user with this id'});
                return; 
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create user
    createUser({ params, body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    }
}

module.exports = userController;