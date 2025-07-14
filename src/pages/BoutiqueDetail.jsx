import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BoutiqueScreen.module.css';
import { fetchBoutiqueDetail, fetchProduitsByBoutique, getImageUrl } from '../api/api';

function BoutiqueDetail() {
  const { id } = useParams();
  const [boutique, setBoutique] = useState(null);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [boutiqueRes, produitsRes] = await Promise.all([
          fetchBoutiqueDetail(id),
          fetchProduitsByBoutique(id)
        ]);
        setBoutique(boutiqueRes.data);
        setProduits(produitsRes.data);
      } catch (err) {
        console.error('Erreur lors du chargement de la boutique :', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (error || !boutique) return <div className={styles.error}>Erreur de chargement.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {boutique.icone && (
          <img
            src={getImageUrl(`boutique/${boutique.icone}`)}
            alt={boutique.nom}
            className={styles.boutiqueIcon}
          />
        )}
        <div>
          <h1 className={styles.boutiqueTitle}>{boutique.nom}</h1>
          <p className={styles.boutiqueLocation}>
            {boutique.ville}, {boutique.pays}
          </p>
        </div>
      </div>

      <p className={styles.boutiqueDescription}>{boutique.description}</p>

      <h2 className={styles.produitSectionTitle}>Produits disponibles</h2>
      <div className={styles.produitGrid}>
        {produits.map(produit => (
          <div key={produit.id} className={styles.produitCard}>
            <img
              src={getImageUrl(`produits_afrique/${produit.image}`)}
              alt={produit.nom}
              className={styles.produitImage}
            />
            <h3 className={styles.produitNom}>{produit.nom}</h3>
            <p className={styles.produitPrix}>{produit.prix} FCFA</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoutiqueDetail;
