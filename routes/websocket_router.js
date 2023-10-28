const express = require('express')
const router = express.Router();

const {test, chatting} = require('../controllers/websocket_controller');

router.get('/test',test);
router.get('/',chatting)
module.exports = router;