import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LocalProducts.module.css';
import { fetchProduitsAfrique } from '../api/api';

const LocalProducts = () => {
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduits = async () => {
      try {
        const response = await fetchProduitsAfrique();
        setProduits(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduits();
  }, []);

  const produitsFiltres = produits
    .filter((p) => p.nom.toLowerCase().includes(searchTerm.toLowerCase()))
    .reduce((acc, produit) => {
      const categorie = produit.categorie || 'Autres';
      if (!acc[categorie]) acc[categorie] = [];
      acc[categorie].push(produit);
      return acc;
    }, {});

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Bienvenue sur AliNiger</h1>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : Object.entries(produitsFiltres).map(([categorie, produits]) => (
        <section key={categorie} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{categorie}</h2>
          <div className={styles.productsGrid}>
            {produits.map((prod) => (
              <Link
                key={prod.id}
                to={`/product/local/${prod.id}`}
                className={styles.productCard}
                title={`Voir détails de ${prod.nom}`}
              >
                <img src={prod.image} alt={prod.nom} className={styles.productImage} />
                <h3 className={styles.productName}>{prod.nom}</h3>
                <p className={styles.productPrice}>{prod.prix.toLocaleString()} FCFA</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default LocalProducts;
