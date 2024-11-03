import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState(''); // Only the 10 digits of the phone number
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vérifie si le téléphone contient déjà +225, si oui, l'enlève
      const formattedPhone = phone.startsWith('+225') ? phone : `+225${phone}`;

      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
        company_name: companyName,
        phone: formattedPhone,  // Correct phone formatting
        address,
        city,
        country: 'CI',  // Pays par défaut (Côte d'Ivoire)
        zip_code: zipCode
      });

      setMessage(response.data.message);

      if (response.status === 201) {
        navigate('/login');  // Redirection après inscription réussie
      }
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className='signup'>
      <div className='description'>
        <img className='logo' src="/images/logo1.png" alt="Logo"></img>
        <p>Join ComptaNet for simplified accounting! Create an account to access powerful features that help you manage your sales, inventory, and more, with ease.</p>
      </div>
      <div className='signup-content'>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='inputC'
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='inputC'
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='inputC'
            />
          </div>
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className='inputC'
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <div className="phone-input">
              <span>+225</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="0123456789" // Only the 10 digits
                className='inputC'
              />
            </div>
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className='inputC'
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className='inputC'
            />
          </div>
          <div>
            <label>Zip Code:</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className='inputC'
            />
          </div>
          <button type="submit">Sign Up</button>
          <h3>Already registered? <Link to="/login" className='login-btn'>Log in here</Link>.</h3>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
