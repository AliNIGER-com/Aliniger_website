import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.module.css';
import {
  fetchProduitsAfrique,
  fetchProduitsAlibaba,
  getImageUrl,
} from '../api/api';

const ProductDetails = () => {
  const { type, id } = useParams();
  const [produit, setProduit] = useState(null);
  const [quantite, setQuantite] = useState(1);
  const [loading, setLoading] = useState(true);

  // Initialise selectedColor avec une valeur fixe
  const [selectedColor, setSelectedColor] = useState('Standard');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        let produits = [];
        if (type === 'local') {
          const res = await fetchProduitsAfrique();
          produits = res.data;
        } else if (type === 'alibaba') {
          const res = await fetchProduitsAlibaba();
          produits = res.data;
        }

        const p = produits.find((prod) => prod.id === parseInt(id || '0'));
        if (p && p.image && !p.image.startsWith('http')) {
          p.image = getImageUrl(p.image);
        }
        setProduit(p || null);

        // Met à jour selectedColor dès que produit est chargé
        if (p) {
          const couleursDispo = p.couleur
            ? p.couleur.split(',').map((c) => c.trim())
            : ['Standard'];
          setSelectedColor(couleursDispo[0]);
        }
      } catch (err) {
        console.error('Erreur lors du chargement du produit :', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [type, id]);

  if (loading) return <p>Chargement...</p>;
  if (!produit) return <p>Produit introuvable.</p>;

  const couleursDispo = produit.couleur
    ? produit.couleur.split(',').map((c) => c.trim())
    : ['Standard'];

  const prix = produit.prix ?? produit.prix_estime ?? 0;
  const total = prix * quantite;

  const increment = () => setQuantite((q) => q + 1);
  const decrement = () => setQuantite((q) => (q > 1 ? q - 1 : 1));

  const handleCommander = () => {
    const message = `Bonjour 👋,

Je souhaite commander ce produit depuis AliNiger :

Produit : ${produit.nom}
Couleur : ${selectedColor}
Quantité : ${quantite}
Prix estimé : ${prix.toLocaleString()} FCFA
Total : ${total.toLocaleString()} FCFA

Merci de me communiquer les options de livraison et le compte pour le paiement.`;

    const url = `https://wa.me/22777474448?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleDiscuter = () => {
    const message = "Bonjour 👋, j’ai une question concernant un produit sur AliNiger.";
    const url = `https://wa.me/22781265075?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="product-details-container">
      <img src={produit.image} alt={produit.nom} className="product-image" />

      <h2 className="product-name">{produit.nom}</h2>
      <p className="product-price">{prix.toLocaleString()} FCFA</p>
      {produit.min_commande && (
        <p className="min-commande">
          Commande minimum : {produit.min_commande} unités
        </p>
      )}

      <section className="quantity-color-section">
        <h3>Quantité & Couleur</h3>

        <div className="quantity-controls">
          <button type="button" onClick={decrement} aria-label="Diminuer la quantité">-</button>
          <span className="quantity-text">{quantite}</span>
          <button type="button" onClick={increment} aria-label="Augmenter la quantité">+</button>
        </div>

        <div className="colors-list">
          {couleursDispo.map((color, i) => {
            const isSelected = selectedColor === color;
            return (
              <button
                key={i}
                type="button"
                className={`color-option ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedColor(color)}
                aria-pressed={isSelected}
              >
                {color}
              </button>
            );
          })}
        </div>

        <p className="total-price">Total : {total.toLocaleString()} FCFA</p>
      </section>

      <section className="description-section">
        <h3>Description</h3>
        <p>{produit.description || 'Aucune description disponible.'}</p>
      </section>

      <section className="protection-section">
        <h3>Protection & Sécurité</h3>
        <ul>
          <li>✔ Livraison assurée par notre équipe</li>
          <li>✔ Paiement sécurisé via Nita, Amana, Airtel Money</li>
          <li>✔ Remboursement en cas de non réception</li>
          <li>✔ Assistance client 24/7</li>
        </ul>
      </section>

      <div className="footer-buttons">
        <button type="button" className="btn-discuter" onClick={handleDiscuter}>
          💬 Discuter
        </button>
        <button type="button" className="btn-commander" onClick={handleCommander}>
          🛒 Commander
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
