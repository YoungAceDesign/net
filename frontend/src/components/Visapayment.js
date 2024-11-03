// VisaPayment.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VisaPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await axios.post('https://api-checkout.cinetpay.com/v2/payment', {
          apikey: '112584110366f549b3229714.42242748',
          site_id: '5880568',
          transaction_id: Math.floor(Math.random() * 100000000).toString(),
          amount: 30000, // Montant fixe
          currency: 'XOF',
          description: 'Paiement via Visa',
          channels: 'CREDIT_CARD', // Visa payment channel
          customer_name: 'John',
          customer_surname: 'Doe',
          customer_email: 'johndoe@example.com',
          customer_phone_number: '+2250123456789',
          customer_address: 'Abidjan',
          customer_city: 'Abidjan',
          customer_country: 'CI',
          notify_url: 'https://yourdomain.com/notify',
          return_url: 'https://yourdomain.com/payment/success', // URL de succès
        });

        // Rediriger l'utilisateur vers l'URL de paiement de CinetPay
        if (response.data && response.data.data.payment_url) {
          window.location.href = response.data.data.payment_url;
        }
      } catch (error) {
        console.error('Erreur lors de la génération du lien de paiement Visa:', error);
        navigate('/payment/failure');
      }
    };

    initiatePayment();
  }, [navigate]);

  return (
    <div>
      <h2>Redirection vers le paiement Visa...</h2>
    </div>
  );
}

export default VisaPayment;
