import React, { useState } from 'react';
import styles from './AlibabaPaiement.module.css';

const AlibabaPaiement = ({ produit, quantite, selectedColor, modePaiement, modeTransit, total }) => {
  const [imageFile, setImageFile] = useState(null);

  const infosPaiement = {
    Nita: { numero: '77077736', nom: 'AliNiger NITA' },
    Amana: { numero: '77077736', nom: 'AliNiger AMANA' },
    'Airtel Money': { numero: '77077736', nom: 'AliNiger Airtel' },
    'Zamani Cash': { numero: '81265075', nom: 'AliNiger Zamani' },
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copié dans le presse-papiers.');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleConfirmer = () => {
    const message = `Bonjour 👋, j’ai effectué un paiement via ${modePaiement} pour le produit suivant :

🧾 Produit : ${produit.nom}
🎨 Couleur : ${selectedColor}
📦 Quantité : ${quantite}
📦 Transit Option : ${modeTransit}
💰 Total payé : ${total.toLocaleString()} FCFA

Veuillez trouver ci-joint la capture de confirmation.`;

    const url = `https://wa.me/22777474448?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const info = infosPaiement[modePaiement];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Informations de Paiement</h1>

      <div className={styles.card}>
        <label>Produit :</label>
        <p>{produit.nom}</p>

        <label>Couleur :</label>
        <p>{selectedColor}</p>

        <label>Quantité :</label>
        <p>{quantite}</p>

        <label>Montant à Payer :</label>
        <p>{total.toLocaleString()} FCFA</p>

        <label>Mode de Paiement :</label>
        <p>{modePaiement}</p>

        <label>Mode de Transit :</label>
        <p>{modeTransit}</p>
      </div>

      {info && (
        <div className={styles.card}>
          <h3>Instructions :</h3>
          <p>
            1️⃣ Entrez le numéro ci-dessous<br />
            2️⃣ Indiquez le montant exact<br />
            3️⃣ Ajoutez votre nom comme référence<br />
            4️⃣ Effectuez le paiement
          </p>

          <div className={styles.copyRow}>
            <span><strong>Numéro :</strong> {info.numero}</span>
            <button onClick={() => handleCopy(info.numero)}>📋 Copier</button>
          </div>

          <div className={styles.copyRow}>
            <span><strong>Nom :</strong> {info.nom}</span>
            <button onClick={() => handleCopy(info.nom)}>📋 Copier</button>
          </div>
        </div>
      )}

      <div className={styles.uploadContainer}>
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          onChange={handleImageChange}
        />
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Capture de paiement"
            className={styles.imagePreview}
          />
        )}
      </div>

      <button
        onClick={handleConfirmer}
        disabled={!imageFile}
        className={imageFile ? styles.btnConfirmer : styles.btnConfirmerDisabled}
      >
        Confirmer ma commande
      </button>
    </div>
  );
};

export default AlibabaPaiement;
