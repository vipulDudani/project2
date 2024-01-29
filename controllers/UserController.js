const User = require('../models/User');
const Loan = require('../models/Loan');

module.exports = {
  registerUser: async (req, res) => {
    const { email, role } = req.body;

    try {
      const user = await User.create({ email, role });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'User registration failed.' });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email, password });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      // In a real-world scenario, you would generate a token here and send it to the client.
      res.json({ message: 'Login successful.', user });
    } catch (error) {
      res.status(500).json({ error: 'Login failed.' });
    }
  },

  requestLoan: async (req, res) => {
    const { borrowerEmail } = req.body;

    try {
      const borrower = await User.findOne({ email: borrowerEmail, role: 'borrower' });

      if (!borrower) {
        return res.status(404).json({ error: 'Borrower not found.' });
      }

      const loan = await Loan.create({ borrower: borrower._id, status: 'Pending' });

      borrower.loans.push(loan);
      await borrower.save();

      res.json(loan);
    } catch (error) {
      res.status(500).json({ error: 'Loan request failed.' });
    }
  },

  confirmPayment: async (req, res) => {
    const { lenderEmail } = req.body;

    try {
      const lender = await User.findOne({ email: lenderEmail, role: 'lender' });

      if (!lender) {
        return res.status(404).json({ error: 'Lender not found.' });
      }

      const pendingLoan = await Loan.findOne({ lender: null, status: 'Pending' });

      if (!pendingLoan) {
        return res.status(404).json({ error: 'No pending loan found for the lender.' });
      }

      pendingLoan.lender = lender._id;
      pendingLoan.status = 'Paid';
      await pendingLoan.save();

      lender.payments.push(pendingLoan);
      await lender.save();

      res.json(pendingLoan);
    } catch (error) {
      res.status(500).json({ error: 'Payment confirmation failed.' });
    }
  },

  getUserDashboard: async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await User.findById(userId).populate('loans');
      res.json(user.loans);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user dashboard.' });
    }
  },

  getAdminDashboard: async (req, res) => {
    try {
      const transactions = await Loan.find().populate('borrower lender');
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching admin dashboard.' });
    }
  },
};
