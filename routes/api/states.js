const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/StatesController');


router.route('/')
    .get(statesController.getAllStates);
    //.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    //.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
   // .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

//router.route('/:state')
//   .get(employeesController.getEmployee);

module.exports = router;