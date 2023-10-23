const express = require('express')
const router = express.Router();

const {db_get, db_post, db_detail, db_delete, db_update} = require('../controllers/db_controller');

router.get('/',db_get).post('/',db_post);
router.route('/:id').get(db_detail)
router.route('/delete/:id').post(db_delete);
router.route('/update/:id').post(db_update);
module.exports = router;