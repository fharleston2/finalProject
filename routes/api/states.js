const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/StatesController');


router.get('/', (req, res) => {
    const contig = req.query.contig;
    if (contig === 'true') {
        statesController.getContigStates(req, res);
    } else if (contig === 'false') {
        statesController.getNonContigStates(req, res);
    } else {
        statesController.getAllStates(req, res);
    }});

router.route('/')
    .get(statesController.getAllStates);
    //.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    //.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
   // .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

/* router.route('?contig=:contig')
   .get(statesController.getContigStates); */


router.route('/:state/funfact')
    .get(statesController.getStateFunFact)
    .post(statesController.createStateFunFact)
    .patch(statesController.updateStateFunFact)
    .delete(statesController.deleteStateFunFact);


router.route('/:state/capital')
    .get(statesController.getStateCapital);

router.route('/:state/nickname')
    .get(statesController.getStateNickname);

router.route('/:state/population')
    .get(statesController.getStatePopulation);

router.route('/:state/admission')
    .get(statesController.getStateAdmission); 



router.route('/:state')
   .get(statesController.getState);






module.exports = router;