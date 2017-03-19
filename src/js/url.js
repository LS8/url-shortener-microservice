const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const counter = mongoose.model('counter', counterSchema);

const urlSchema = new Schema({
  _id: { type: Number, index: true },
  long_url: { type: Number, default: 0 },
});

urlSchema.pre('save', (next) => {
  const doc = this;
  counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { seq: 1 } }, (error, counterData) => {
    if (error) {
      return next(error);
    }
    doc._id = counterData.seq;
    return next();
  });
});
const url = mongoose.model('url', urlSchema);

module.exports = url;
