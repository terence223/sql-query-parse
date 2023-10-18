const { validationResult } = require('express-validator/check');
const Data = require('../models/data');
const parseAndModified = require('../utils/parseAndModified');
const rebuildSQL = require('../utils/rebuildSQL');

exports.getList = (req, res, next) => {
  Data.find({})
    .sort({ createdAt: -1 })
    .select(['_id', 'modifiedSQL', 'map'])
    .then(data => {
      res.status(200).json({
        data,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// change input SQL to Modified SQL and map
exports.parseSQL = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    throw error;
  }

  let result;

  try {
    result = parseAndModified(req.body.queryString);
  } catch (err) {
    res.status(500).json({
      message: 'parse Error',
    });
  }

  const data = new Data(result);

  data
    .save()
    .then(() => {
      res.status(201).json({
        message: 'created successfully!',
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// change Modified SQL and MAP back to input SQL
exports.rebuild = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    throw error;
  }

  try {
    res.status(200).json({
      sqlString: rebuildSQL({
        modifiedSQL: req.body.data.modifiedSQL,
        map: req.body.data.map,
      }),
    });
  } catch (err) {
    res.status(500).json({
      message: 'rebuild failed!',
    });
    next(err);
  }
};

exports.delete = (req, res, next) => {
  const id = req.params.id;

  Data.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({ message: 'deleted successfully!' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
