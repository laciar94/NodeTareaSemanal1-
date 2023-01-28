const User = require('../models/user.model');

const findUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {},
    });
    res.status(200).json({
      status: 'success',
      message: 'Users was found successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // 4. ENVIAR UNA RESPUESTA AL USUARIO
    res.status(200).json({
      status: 'success',
      message: 'User was found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: password,
    role: role,
  });
  res.status(201).json({
    status: 'succes',
    message: 'User Created succesfully',
    user,
  });
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    await user.update({ name, email });
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail updating user',
      message: 'Internal server error',
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (res.status == 'cancelled') {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    await user.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
