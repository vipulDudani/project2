const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'borrower', 'lender'] },
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }],
});

module.exports = mongoose.model('User', userSchema);
