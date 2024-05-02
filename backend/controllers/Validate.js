const mongoose = require('mongoose');
const AdminModel = require('../models/AdminModel');
const jwt = require('jsonwebtoken')

const LoginUser = async (req, res) => {
  try {
    const { userName, passWord } = req.body;
    
    const user = await AdminModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.passWord !== passWord) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '30m'});

    res.status(200).json({ message: 'Login successful', token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  LoginUser,
};
