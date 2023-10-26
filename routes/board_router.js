const express = require('express')
const router = express.Router();

const {
    board_get, 
    board_post, 
    board_detail, 
    board_delete, 
    board_update
} = require('../controllers/board_controller');

router.get('/',board_get).post('/',board_post);
router.route('/:id').get(board_detail)
router.route('/delete/:id').post(board_delete);
router.route('/update/:id').post(board_update);
module.exports = router;