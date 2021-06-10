const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//add prefix of '/pizzas' to routes crfeated in 'pizza-routes.js'
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;