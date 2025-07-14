import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaStore
} from 'react-icons/fa';
import { getUserProfile, updateUserProfile } from '../api/api';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (err) {
        console.error('Erreur chargement profil :', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = async () => {
    if (!editingField || !user) return;

    setUpdating(true);
    try {
      const updated = {
        ...user,
        [editingField]: tempValue,
      };
      const response = await updateUserProfile(user.id, updated);
      setUser(response.data);
      setEditingField(null);
      setTempValue('');
    } catch (err) {
      alert('Erreur lors de la mise à jour');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const getFieldIcon = (field) => {
    switch (field) {
      case 'prenom':
      case 'nom':
        return <FaUser />;
      case 'email':
        return <FaEnvelope />;
      case 'tel':
        return <FaPhone />;
      case 'pays':
        return <FaGlobe />;
      case 'adresse':
        return <FaMapMarkerAlt />;
      default:
        return <FaUser />;
    }
  };

  const getInitials = (prenom, nom) => {
    const first = prenom?.[0]?.toUpperCase() || '';
    const last = nom?.[0]?.toUpperCase() || '';
    return first + last || 'U';
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingCard}>
          <div className={styles.loader}></div>
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <h2>Profil introuvable</h2>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatar}>
          <span>{getInitials(user.prenom, user.nom)}</span>
        </div>
        <div className={styles.userInfo}>
          <h1>{`${user.prenom} ${user.nom}`}</h1>
          <p>{user.email}</p>
        </div>
      </header>

      <section className={styles.infoSection}>
        <h2>Mes informations</h2>
        <div className={styles.infoList}>
          {[
            { label: 'Prénom', field: 'prenom', value: user.prenom },
            { label: 'Nom', field: 'nom', value: user.nom },
            { label: 'Email', field: 'email', value: user.email },
            { label: 'Téléphone', field: 'tel', value: user.tel },
            { label: 'Pays', field: 'pays', value: user.pays },
            { label: 'Adresse', field: 'adresse', value: user.adresse },
          ].map(({ label, field, value }) => (
            <div key={field} className={styles.infoRow}>
              <div className={styles.label}>
                <span className={styles.icon}>{getFieldIcon(field)}</span> {label.toUpperCase()}
              </div>
              {editingField === field ? (
                <div className={styles.editRow}>
                  <input
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    autoFocus
                    className={styles.inputField}
                    placeholder={`Entrez votre ${label.toLowerCase()}`}
                    disabled={updating}
                  />
                  <button onClick={handleSave} disabled={updating} className={styles.saveBtn}>
                    {updating ? '...' : <><FaCheckCircle /> Sauvegarder</>}
                  </button>
                  <button onClick={handleCancel} className={styles.cancelBtn}>
                    <FaTimesCircle /> Annuler
                  </button>
                </div>
              ) : (
                <div className={styles.valueRow}>
                  <span>{value || `${label} non renseigné`}</span>
                  <button onClick={() => handleEdit(field, value || '')} className={styles.editBtn}>
                    <FaEdit /> Modifier
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.promoSection}>
        <div className={styles.promoHeader}>
          <FaStore size={32} color="#2E8B57" />
          <div>
            <h3>Devenez vendeur !</h3>
            <p>Rejoignez notre communauté de vendeurs et développez votre activité</p>
          </div>
        </div>
        <a
          href="https://wa.me/22781265075?text=Bonjour%20Je%20souhaite%20devenir%20vendeur%20sur%20AliNiger"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.promoButton}
        >
          Devenir vendeur sur AliNiger
        </a>
      </section>
    </div>
  );
};

export default ProfilePage;
