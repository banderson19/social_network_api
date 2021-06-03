const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought
} = require('../../controllers/thought-controller');

// Set up GET all and POSt all /api/users
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

module.exports = router;