const router = require('express').Router();

const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');
const homeRoutes = require('../homeRoutes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/home', homeRoutes);

module.exports = router;