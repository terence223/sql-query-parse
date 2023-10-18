const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    modifiedSQL: {
      type: String,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Data', dataSchema);
