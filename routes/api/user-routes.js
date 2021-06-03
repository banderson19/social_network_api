const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser
} = require('../../controllers/user-controller');

// Set up GET all and POST all /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);


// Set up GET one, PUT, and DELETE at /api/users/:id
router.route('/:id')
    .get(getUserById);

module.exports = router;