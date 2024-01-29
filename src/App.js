import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoanRequestForm from './components/LoanRequestForm';
import PaymentConfirmationForm from './components/PaymentConfirmationForm';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register" component={RegistrationForm} />
          <Route path="/request-loan" component={LoanRequestForm} />
          <Route path="/confirm-payment" component={PaymentConfirmationForm} />
          <Route path="/dashboard/:userId" component={Dashboard} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
