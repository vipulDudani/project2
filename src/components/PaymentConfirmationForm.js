import React, { useState } from 'react';
import axios from 'axios';

const PaymentConfirmationForm = () => {
  const [lenderEmail, setLenderEmail] = useState('');

  const handleConfirmPayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/confirmPayment', { lenderEmail });
      console.log('Payment Confirmed:', response.data);
    } catch (error) {
      console.error('Payment confirmation failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Payment Confirmation Form</h2>
      <label>Lender Email:</label>
      <input type="email" value={lenderEmail} onChange={(e) => setLenderEmail(e.target.value)} />
      <button onClick={handleConfirmPayment}>Confirm Payment</button>
    </div>
  );
};

export default PaymentConfirmationForm;
