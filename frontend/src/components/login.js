import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Utiliser useNavigate pour rediriger

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Email:", email, "Password:", password);
  
    try {
      // Envoyer la requête POST pour se connecter
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
  
      // Si la connexion est réussie, on reçoit un token et l'état de la subscription
      if (response.status === 200) {
        const token = response.data.token;
        const hasSubscription = response.data.hasSubscription;  // Récupère l'état de l'abonnement
  
        if (token) {
          // Stocker le token dans localStorage (ou cookies)
          localStorage.setItem('token', token);
  
          // Vérifier si l'utilisateur a une subscription active
          if (hasSubscription) {
            navigate('/dashboard');  // Redirige vers le dashboard si l'abonnement est actif
          } else {
            navigate('/payment');  // Redirige vers la page de paiement si l'abonnement est inactif
          }
        } else {
          // Si le token n'est pas trouvé dans la réponse
          setMessage("Erreur : Token non reçu. Veuillez réessayer.");
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setMessage('Erreur de connexion. Veuillez vérifier vos identifiants.');
    }
  };
    

  return (
    <div className='connexion'>
      <div className='description'>
        <img className='logo' src="/images/logo1.png" alt="Logo"></img>
        <p>ComptaNet simplifie la gestion de votre comptabilité...</p>
      </div>
      <div className='connexion-content'>
        <h2>CONNEXION</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email :</label><br></br>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='inputC'
            />
          </div>
          <div>
            <label>Mot de passe :</label><br></br>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='inputC'
            />
          </div>
          <button type="submit">Connexion</button>
          {message && <p>{message}</p>}
          <h3>Si vous n'avez pas de compte, veuillez vous inscrire.</h3>
          <Link className='ins-btn' to="/signup">Inscription</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
