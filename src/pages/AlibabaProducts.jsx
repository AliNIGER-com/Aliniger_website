import React, { useState, useEffect } from 'react';
import styles from './AlibabaProducts.module.css';
import api from '../api/api';
import { Link } from 'react-router-dom';

const AlibabaProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.fetchProduitsAlibaba();
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des produits.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className={styles.loading}>Chargement des produits...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Bienvenue sur AliNiger - Produits Alibaba 🏭</h2>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Rechercher un produit Alibaba..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

<div className={styles.grid}>
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <div className={styles.card} key={product.id}>
        <img src={product.image} alt={product.nom} className={styles.image} />
        <h3 className={styles.name}>{product.nom}</h3>
        <p className={styles.price}>{product.prix.toLocaleString()} FCFA</p>
        <Link
          to={`/produit/${product.id}`}
          className={styles.button}
        >
          Voir le produit
        </Link>
      </div>
    ))
  ) : (
    <p className={styles.noResult}>Aucun produit trouvé.</p>
  )}
</div>
</div>
  );
};

export default AlibabaProducts;
