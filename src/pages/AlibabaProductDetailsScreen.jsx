import React, { useState } from 'react';
import styles from './AlibabaProductDetails.module.css';

function AlibabaProductDetailsScreen({ produit }) {
  const [quantite, setQuantite] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    produit.couleur ? produit.couleur.split(',')[0].trim() : 'Standard'
  );
  const [modePaiement, setModePaiement] = useState(null);
  const [modeTransit, setModeTransit] = useState(null);

  const couleursDispo = produit.couleur
    ? produit.couleur.split(',').map((c) => c.trim())
    : ['Standard'];

  const prix = produit.prix || produit.prix_estime || 0;
  const total = prix * quantite;

  const optionsPaiement = ['Nita', 'Amana', 'Airtel Money', 'Zamani Cash'];
  const optionsTransit = ['Express Aerienne', 'Standard Aerienne', 'Maritime'];

  const increment = () => setQuantite((q) => q + 1);
  const decrement = () => setQuantite((q) => (q > 1 ? q - 1 : 1));

  const handleCommander = () => {
    if (!modePaiement) {
      alert('Veuillez choisir un mode de paiement.');
      return;
    }
    alert(`Commande : ${quantite}x ${produit.nom}, Paiement : ${modePaiement}, Transit : ${modeTransit}`);
  };

  const handleDiscuter = () => {
    const message = "Bonjour 👋, j’ai une question concernant un produit Alibaba.";
    const url = `https://wa.me/22777444748?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={styles.container}>
      <img src={produit.image} alt={produit.nom} className={styles.imageProduit} />

      <h1 className={styles.nomProduit}>{produit.nom}</h1>
      <h2 className={styles.prix}>{prix.toLocaleString()} FCFA</h2>
      {produit.min_commande && (
        <p className={styles.minCommande}>Commande min : {produit.min_commande} unités</p>
      )}

      <div className={styles.card}>
        <h3>Quantité & Couleur</h3>
        <div className={styles.quantiteContainer}>
          <button onClick={decrement}>-</button>
          <span>{quantite}</span>
          <button onClick={increment}>+</button>
        </div>

        <div className={styles.row}>
          {couleursDispo.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className={
                selectedColor === color
                  ? `${styles.colorOption} ${styles.selected}`
                  : styles.colorOption
              }
            >
              {color}
            </button>
          ))}
        </div>

        <p className={styles.totalText}>Total : {total.toLocaleString()} FCFA</p>
      </div>

      <div className={styles.card}>
        <h3>Mode de paiement</h3>
        <div className={styles.row}>
          {optionsPaiement.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setModePaiement(option)}
              className={
                modePaiement === option
                  ? `${styles.paiementOption} ${styles.selected}`
                  : styles.paiementOption
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h3>Mode de transit Chine-Niger</h3>
        <div className={styles.row}>
          {optionsTransit.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setModeTransit(option)}
              className={
                modeTransit === option
                  ? `${styles.paiementOption} ${styles.selected}`
                  : styles.paiementOption
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h3>Description</h3>
        <p>{produit.description || 'Aucune description disponible.'}</p>
      </div>

      <div className={styles.card}>
        <h3>Protection & Sécurité</h3>
        <p>
          ✔ Livraison assurée par notre équipe<br />
          ✔ Paiement sécurisé via Nita, Amana, Airtel Money, Zamani Cash<br />
          ✔ Remboursement en cas de non réception<br />
          ✔ Assistance client 24/7
        </p>
      </div>

      <div className={styles.footer}>
        <button onClick={handleDiscuter} className={styles.btnDiscuter}>💬 Discuter</button>
        <button onClick={handleCommander} className={styles.btnCommander}>🛒 Commander</button>
      </div>
    </div>
  );
}

export default AlibabaProductDetailsScreen;
