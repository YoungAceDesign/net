import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';

function Dashboard() {
  const [activeItem, setActiveItem] = useState('Accueil');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    company_name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zip_code: '',
  });
  const [originalProfileData, setOriginalProfileData] = useState(null); // Stocke les données originales du profil
  const [isEditing, setIsEditing] = useState(false); // Pour gérer le mode édition
  const [error, setError] = useState('');

  // Récupérer les données du profil utilisateur
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête Authorization
        },
      });
      setProfileData(response.data); // Stocker les données utilisateur
      setOriginalProfileData(response.data); // Stocker les données originales pour "Annuler"
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      setError('Erreur lors de la récupération du profil');
    }
  };

  // Fonction pour mettre à jour le profil
  const handleProfileUpdate = async () => {
    const token = localStorage.getItem('token'); // Récupérer le token JWT
    try {
      const response = await axios.put('http://localhost:5000/api/auth/profile', {
        name: profileData.name,
        email: profileData.email,
        company_name: profileData.company_name,
        phone: profileData.phone,
        address: profileData.address,
        city: profileData.city,
        country: profileData.country,
        zip_code: profileData.zip_code,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token JWT dans les headers
        },
      });

      console.log('Profil mis à jour avec succès:', response.data);
      setIsEditing(false); // Désactiver le mode édition après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };

  // Fonction pour annuler les modifications
  const handleCancelEdit = () => {
    setProfileData(originalProfileData); // Réinitialiser les données avec les valeurs originales
    setIsEditing(false); // Désactiver le mode édition
  };

  useEffect(() => {
    if (activeItem === 'Profil') {
      fetchUserProfile(); // Récupérer les données du profil lorsqu'on clique sur "Profil"
    }
  }, [activeItem]);

  const renderContent = () => {
    switch (activeItem) {
      case 'Accueil':
        return <p>Bienvenue sur l'accueil du tableau de bord.</p>;
      case 'Profil':
        if (error) return <p>{error}</p>;
        if (!profileData) return <p>Chargement des informations du profil...</p>;
        return (
          <div>
            <h2>Profil utilisateur</h2>
            <form>
              <div>
                <label>Nom : </label><br />
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  disabled={!isEditing} // Désactivé sauf en mode édition
                />
              </div>
              <div>
                <label>Email : </label><br />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label>Nom de l'entreprise : </label><br />
                <input
                  type="text"
                  value={profileData.company_name || ''}
                  onChange={(e) => setProfileData({ ...profileData, company_name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label>Téléphone : </label><br />
                <input
                  type="text"
                  value={profileData.phone || ''}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label>Adresse : </label><br />
                <input
                  type="text"
                  value={profileData.address || ''}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label>Ville : </label><br />
                <input
                  type="text"
                  value={profileData.city || ''}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label>Pays : </label><br />
                <input
                  type="text"
                  value={profileData.country || ''}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label>Code Postal : </label><br />
                <input
                  type="text"
                  value={profileData.zip_code || ''}
                  onChange={(e) => setProfileData({ ...profileData, zip_code: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </form>
            <div>
              {isEditing ? (
                <>
                  <button onClick={handleProfileUpdate}>Enregistrer</button>
                  <button onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Annuler</button> {/* Bouton pour annuler */}
                </>
              ) : (
                <button onClick={() => setIsEditing(true)}>Modifier</button>
              )}
            </div>
          </div>
        );
      case 'Paramètres':
        return <p>Voici la page des paramètres.</p>;
      case 'Déconnexion':
        return <p>Vous avez été déconnecté.</p>;
      default:
        return <p>Sélectionnez un élément du menu pour voir le contenu.</p>;
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul className='liste'>
          <div className='logo1'>
            <img src='/images/logo1.png' alt="Logo" />
          </div>
          <li className={activeItem === 'Accueil' ? 'active' : ''} onClick={() => setActiveItem('Accueil')}>Accueil</li>
          <li className={activeItem === 'Profil' ? 'active' : ''} onClick={() => setActiveItem('Profil')}>Profil</li>
          <li className={activeItem === 'Paramètres' ? 'active' : ''} onClick={() => setActiveItem('Paramètres')}>Paramètres</li>
          <li className={activeItem === 'Déconnexion' ? 'active' : ''} onClick={() => setActiveItem('Déconnexion')}>Déconnexion</li>
        </ul>
      </div>
      <div className="content">
        <h1>{activeItem}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
