import React, { useState, useEffect } from 'react';
import styles from './AlibabaProducts.module.css';
import api from '../api/api'; // Assure-toi que le chemin est correct

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

  if (loading) {
    return <p className={styles.loading}>Chargement des produits...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

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
              <p className={styles.price}>{product.prix}</p>
              <a
                href={`https://wa.me/22788123456?text=Bonjour,%20je%20souhaite%20commander%20le%20produit%20suivant%20:%20${encodeURIComponent(
                  product.nom
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                Commander sur WhatsApp
              </a>
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
