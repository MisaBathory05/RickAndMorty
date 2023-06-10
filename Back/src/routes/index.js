const router = require ('express').Router();

const getChatById = require('../controllers/getCharById');
const login = require('../controllers/login');
const {postFav , deleteFav} = require('../controllers/handleFavorites');

router.get('/character/:id', getChatById);
router.get('/login', login);
router.post('/fav', postFav);
router.delete('/fav/:id', deleteFav)

module.exports = router;
