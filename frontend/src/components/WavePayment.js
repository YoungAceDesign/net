// WavePayment.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WavePayment() {
  const navigate = useNavigate();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await axios.post('https://api-checkout.cinetpay.com/v2/payment', {
          apikey: 'YOUR_APIKEY',
          site_id: 'YOUR_SITE_ID',
          transaction_id: Math.floor(Math.random() * 100000000).toString(),
          amount: 100, // Montant fixe
          currency: 'XOF',
          description: 'Paiement via Wave',
          channels: 'MOBILE_MONEY', // Wave payment channel
          notify_url: 'https://yourdomain.com/notify',
          return_url: 'https://yourdomain.com/payment/success', // URL de succès
        });

        // Rediriger l'utilisateur vers l'URL de paiement de CinetPay
        if (response.data && response.data.data.payment_url) {
          window.location.href = response.data.data.payment_url;
        }
      } catch (error) {
        console.error('Erreur lors de la génération du lien de paiement Wave:', error);
        navigate('/payment/failure');
      }
    };

    initiatePayment();
  }, [navigate]);

  return (
    <div>
      <h2>Redirection vers le paiement Wave...</h2>
    </div>
  );
}

export default WavePayment;
