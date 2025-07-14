import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './BoutiqueScreen.module.css';
import {
  fetchBoutiques,
  addBoutiqueVisit,
  getImageUrl
} from '../api/api';

const BoutiqueScreen = () => {
  const [boutiques, setBoutiques] = useState([]);
  const [search, setSearch] = useState('');
  const [filtre, setFiltre] = useState('Toutes');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadBoutiques();
  }, []);

  const loadBoutiques = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetchBoutiques();
      setBoutiques(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filtered = boutiques.filter(b => {
    const matchNom = b.nom.toLowerCase().includes(search.toLowerCase());
    const matchCat = filtre === 'Toutes' || b.categorie === filtre;
    return matchNom && matchCat;
  });

  const handleClick = async (b) => {
    try {
      const uid = localStorage.getItem('userId');
      if (uid) await addBoutiqueVisit(b.id, uid);
    } catch {}
  };

  if (loading) return <div className={styles.loading}>Chargement des boutiques…</div>;
  if (error) return (
    <div className={styles.error}>
      <p>Erreur de connexion. <button onClick={loadBoutiques}>Réessayer</button></p>
    </div>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Découvrez nos boutiques</h1>
          <div className={styles.tabs}>
            <button onClick={() => setFiltre('Toutes')} className={filtre === 'Toutes' ? styles.active : ''}>Toutes</button>
            {/* Ajoute d'autres filtres si besoin */}
          </div>
        </div>
        <input
          type="search"
          placeholder="Rechercher une boutique…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.search}
        />
      </header>

      <div className={styles.boutiquesList}>
        {filtered.length === 0 && <p>Aucune boutique trouvée.</p>}
        {filtered.map(b => (
          <Link
            key={b.id}
            to={`/boutique/${b.id}`}
            className={styles.card}
            onClick={() => handleClick(b)}
            title={`Voir ${b.nom}`}
          >
            <img
              src={b.icone ? getImageUrl(`boutique/${b.icone}`) : ''}
              alt={b.nom}
              className={styles.image}
            />
            <div className={styles.info}>
              <h2>{b.nom}</h2>
              <p>{b.description}</p>
              <div className={styles.meta}>
                <span>⭐ {b.note ?? 4.5}/5</span>
                {b.ville && <span>📍 {b.ville}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoutiqueScreen;
