import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import Signup from './components/signup';
import Payment from './components/payment'; // Import en fonction du nom exact du fichier
import WavePayment from './components/WavePayment';
import VisaPayment from './components/Visapayment';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route racine qui redirige vers la page de connexion */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Autres routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/wave" element={<WavePayment />} />
          <Route path="/payment/visa" element={<VisaPayment />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
