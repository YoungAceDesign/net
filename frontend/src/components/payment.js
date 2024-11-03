import React, { useState } from 'react';
import axios from 'axios';
import './Payment.css';

function Payment() {
  const [paymentUrl, setPaymentUrl] = useState(null);

  // Gérer le paiement par carte Visa
  const handleVisaPayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment/visa', {
        userId: 1, // Remplacer par l'ID de l'utilisateur connecté
        plan: 'premium', // Exemple de plan d'abonnement
      });

      // Rediriger l'utilisateur vers l'URL de paiement Visa
      setPaymentUrl(response.data.paymentUrl);
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Erreur lors de l'initiation du paiement par Visa", error);
    }
  };

  // Gérer le paiement par Wave
  const handleWavePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment/wave', {
        userId: 1, // Remplacer par l'ID de l'utilisateur connecté
        plan: 'premium', // Exemple de plan d'abonnement
      });

      // Rediriger l'utilisateur vers l'URL de paiement Wave
      setPaymentUrl(response.data.paymentUrl);
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Erreur lors de l'initiation du paiement par Wave", error);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-logo">
        <img src="/images/logo1.png" alt="Logo" />
      </div>
      <div className='payment-grid'>
        <div className='price'>
        <h1>Abonnement</h1>
        <h2>30 000 FCFA / Par mois</h2>
        </div>
        {/* Grandes parties et sous-parties */}
        <div className="services">
          <h1 className='title-services'>Nos Services</h1>
          <div className="service-section">
          <svg
  viewBox="0 0 117 117"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  fill="#000000"
  width="50px"
  height="30px"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
      <g fillRule="nonzero" id="correct">
        <path
          d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z"
          fill="#003366"
          id="Shape"
        ></path>
        <path
          d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z"
          fill="#000000"
          id="Shape"
        ></path>
      </g>
    </g>
  </g>
</svg>

            <h3>Gestion des écritures comptables</h3>
          </div>

          <div className="service-section">
          <svg
  viewBox="0 0 117 117"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  fill="#000000"
  width="50px"
  height="30px"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
      <g fillRule="nonzero" id="correct">
        <path
          d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z"
          fill="#003366"
          id="Shape"
        ></path>
        <path
          d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z"
          fill="#000000"
          id="Shape"
        ></path>
      </g>
    </g>
  </g>
</svg>

            <h3>Génération de rapports financiers</h3>
          </div>

          <div className="service-section">
          <svg
  viewBox="0 0 117 117"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  fill="#000000"
  width="50px"
  height="30px"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
      <g fillRule="nonzero" id="correct">
        <path
          d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z"
          fill="#003366"
          id="Shape"
        ></path>
        <path
          d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z"
          fill="#000000"
          id="Shape"
        ></path>
      </g>
    </g>
  </g>
</svg>

            <h3>Gestion des factures</h3>
          </div>

          <div className="service-section">
          <svg
  viewBox="0 0 117 117"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  fill="#000000"
  width="50px"
  height="30px"
>
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
      <g fillRule="nonzero" id="correct">
        <path
          d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z"
          fill="#003366"
          id="Shape"
        ></path>
        <path
          d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z"
          fill="#000000"
          id="Shape"
        ></path>
      </g>
    </g>
  </g>
</svg>

<h3>Alertes fiscales</h3>
          </div>
        </div>
        
        <div className="payment-options">
        <h2>Choisissez votre méthode de paiement</h2>
          <div className="payment-option visa" onClick={handleVisaPayment}>
            <img src="/images/visa-logo.png" alt="Visa Logo" />
            <span>Payer avec Visa</span>
          </div>
          <div className="payment-option wave" onClick={handleWavePayment}>
            <img src="/images/wave-logo.png" alt="Wave Logo" />
            <span>Payer avec Wave</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
