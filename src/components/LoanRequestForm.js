import React, { useState } from 'react';
import axios from 'axios';

const LoanRequestForm = () => {
  const [borrowerEmail, setBorrowerEmail] = useState('');

  const handleRequestLoan = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/requestLoan', { borrowerEmail });
      console.log('Loan Requested:', response.data);
    } catch (error) {
      console.error('Loan request failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Loan Request Form</h2>
      <label>Borrower Email:</label>
      <input type="email" value={borrowerEmail} onChange={(e) => setBorrowerEmail(e.target.value)} />
      <button onClick={handleRequestLoan}>Request Loan</button>
    </div>
  );
};

export default LoanRequestForm;
