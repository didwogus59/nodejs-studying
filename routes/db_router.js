const express = require('express')
const router = express.Router();

const {db_get, db_post, db_detail, db_delete} = require('../controllers/db_controller');

router.get('/',db_get).post('/',db_post);
router.route('/:id').get(db_detail).delete(db_delete);
module.exports = router;