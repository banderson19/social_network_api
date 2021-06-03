const router = require('express').Router();
const userRoutes = require('./user-routes')

//add prefix of '/pizzas' to routes crfeated in 'pizza-routes.js'
router.use('/users', userRoutes);

module.exports = router;