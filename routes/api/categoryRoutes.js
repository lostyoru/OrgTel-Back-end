const express = require('express');
const router = express.Router(); 
const categoryController = require('../../controllers/categoryController');
const ROLES_LIST = require('../../config/roles_list');
const verifyJWT = require('../../middlewares/verifyJWT');
const verifyRoles = require('../../middlewares/verifyRoles');

router.get('/',categoryController.getAllCategories);
router.post('/', verifyJWT, verifyRoles(ROLES_LIST.Admin), categoryController.addCategory);
router.delete('/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), categoryController.deleteCategory);

module.exports = router;