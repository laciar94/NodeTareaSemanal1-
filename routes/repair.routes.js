const { Router } = require('express');
const {
  findRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
  findRepair,
} = require('../controllers/repair.controller');

const router = Router();

router.post('/', createRepair);

router.get('/', findRepairs);

router.get('/:id', findRepair);

router.patch('/:id', updateRepair);

router.delete('/:id', deleteRepair);

module.exports = {
  repairRouter: router,
};
