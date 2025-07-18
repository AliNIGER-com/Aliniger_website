import React, { useState } from 'react';
import styles from './ProductDetails.module.css';

function ProductDetailsScreen({ produit }) {
  const [quantite, setQuantite] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    produit.couleur ? produit.couleur.split(',')[0].trim() : 'Standard'
  );
  const [modePaiement, setModePaiement] = useState(null);

  const couleursDispo = produit.couleur
    ? produit.couleur.split(',').map(c => c.trim())
    : ['Standard'];

  const prix = produit.prix || produit.prix_estime || 0;
  const total = prix * quantite;

  const handleCommander = () => {
    if (!modePaiement) {
      alert('Choisissez un mode de paiement');
      return;
    }

    if (modePaiement === 'Paiement à l’arrivée') {
      const message = `Bonjour 👋,

Je souhaite commander ce produit depuis AliNiger :

Produit : ${produit.nom}
Couleur : ${selectedColor}
Quantité : ${quantite}
Prix estimé : ${prix.toLocaleString()} FCFA
Total : ${total.toLocaleString()} FCFA

Mode de paiement : Paiement à l’arrivée.

Merci de confirmer les modalités de livraison.`;

      const url = `https://wa.me/22777444748?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } else {
      alert(`Redirection vers la page de paiement (${modePaiement})`);
    }
  };

  const handleDiscuter = () => {
    const message = "Bonjour 👋, j’ai une question concernant un produit local sur AliNiger.";
    const url = `https://wa.me/22781265075?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const increment = () => setQuantite(q => q + 1);
  const decrement = () => setQuantite(q => (q > 1 ? q - 1 : 1));

  const optionsPaiement = [
    'Nita',
    'Amana',
    'Airtel Money',
    'Zamani Cash',
    'Paiement à l’arrivée',
  ];

  return (
    <div className={styles['product-details']}>
      <img src={produit.image} alt={produit.nom} className={styles['product-image']} />

      <div className={styles['product-content']}>
        <h1>{produit.nom}</h1>
        <h2>{prix.toLocaleString()} FCFA</h2>

        {produit.min_commande && (
          <p>Commande min : {produit.min_commande} unités</p>
        )}

        <div className={styles['quantite-section']}>
          <h3>Quantité & Couleur</h3>
          <div className={styles['quantite-controls']}>
            <button onClick={decrement}>-</button>
            <span>{quantite}</span>
            <button onClick={increment}>+</button>
          </div>

          <div className={styles['colors-section']}>
            {couleursDispo.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={
                  selectedColor === color
                    ? `${styles['color-btn']} ${styles['selected']}`
                    : styles['color-btn']
                }
              >
                {color}
              </button>
            ))}
          </div>

          <p><strong>Total :</strong> {total.toLocaleString()} FCFA</p>
        </div>

        <div className={styles['paiement-section']}>
          <h3>Mode de paiement</h3>
          <div className={styles['paiement-options']}>
            {optionsPaiement.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setModePaiement(option)}
                className={
                  modePaiement === option
                    ? `${styles['paiement-btn']} ${styles['selected']}`
                    : styles['paiement-btn']
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles['description-section']}>
          <h3>Description</h3>
          <p>{produit.description || 'Aucune description disponible.'}</p>
        </div>

        <div className={styles['protection-section']}>
          <h3>Protection & Sécurité</h3>
          <p>
            ✔ Livraison assurée par notre équipe<br />
            ✔ Paiement sécurisé via Nita, Amana, Airtel Money<br />
            ✔ Remboursement en cas de non réception<br />
            ✔ Assistance client 24/7
          </p>
        </div>

        <div className={styles['footer-buttons']}>
          <button
            onClick={handleDiscuter}
            className={`${styles['btn']} ${styles['discuter-btn']}`}
          >
            💬 Discuter
          </button>

          <button
            onClick={handleCommander}
            className={`${styles['btn']} ${styles['commander-btn']}`}
          >
            🛒 Commander
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsScreen;
