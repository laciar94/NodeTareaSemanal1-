const Repair = require('../models/repair.model');

exports.findRepairs = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {},
  });

  res.status(200).json({
    status: 'success',
    message: 'The products found were successfully',
    repairs,
  });
};

exports.findRepair = async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The product was not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'The product was found successfully',
    repair,
  });
};

exports.createRepair = async (req, res) => {
  try {
    const { date, status, userId } = req.body;
    const newRepair = await Repair.create({
      date,
      status,
      userId,
    });

    res.status(201).json({
      status: 'success',
      message: 'The product was created successfully',
      newRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.updateRepair = async (req, res) => {
  const { id } = req.params;
  const { title, description, quantity, price } = req.body;
  const repair = await Repair.findOne({
    where: {
      id,
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The product was not found',
    });
  }
  const updatedRepair = await repair.update({
    status: 'cancelled',
  });
  res.status(200).json({
    status: 'success',
    message: 'Then product has been updated successfully',
    updatedRepair,
  });
};

exports.deleteRepair = (req, res) => {
  const { id } = req.params;

  res.json({
    status: 'success',
    message: 'ROUTE - DELETE',
    id,
  });
};
