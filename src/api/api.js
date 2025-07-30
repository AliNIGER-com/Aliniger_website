import axios from 'axios';

const BASE_URL = 'https://api.aliniger.com/api';
const BASE_IMAGE_URL = 'https://api.aliniger.com/media/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

/* ========== AUTHENTIFICATION ========== */
export const registerUser = (userData) => api.post('/users', userData);
export const loginUser = (loginData) => api.post('/login', loginData);

/* ========== VENDEURS ========== */
export const fetchVendeurs = () => api.get('/vendeurs');
export const fetchVendeurById = (id) => api.get(`/vendeurs/${id}`);

/* ========== BOUTIQUES ========== */
export const fetchBoutiques = () => api.get('/boutiques');
export const fetchBoutiqueDetail = (id) => api.get(`/boutiques/${id}`);
export const searchBoutiques = (searchData) => api.post('/boutiques/search', searchData);
export const filterBoutiques = (filterData) => api.post('/boutiques/filter', filterData);
export const trackBoutiqueView = (boutiqueId, userId) =>
  api.post('/boutiques/view', { boutique_id: boutiqueId, user_id: userId });

export const fetchProduitsByBoutique = (boutiqueId) =>
  api.get(`/boutiques/${boutiqueId}/produits`);
export const addBoutiqueVisit = (boutiqueId, userId) =>
  api.post('/boutiques/visit', { boutiqueId, userId });

/* ========== COMMANDES ========== */
export const createCommande = (data) => api.post('/commandes', data);
export const addDetailCommande = (detailData) => api.post('/details_commande', detailData);
export const createCommandeGroupee = (groupeeData) => api.post('/commandes_groupees', groupeeData);
export const fetchCommandeGroupee = (produitId) => api.get(`/commandes_groupees/${produitId}`);
export const getTracking = (commandeId) => api.get(`/tracking/${commandeId}`);
export const getCommandesByUser = (userId) => api.get(`/commandes/${userId}`);
export const getCommandeDetails = (commandeId, userId) =>
  api.post(`/commandes/details/${commandeId}`, { user_id: userId });
export const addReview = (commandeId, userId, reviewData) =>
  api.post(`/commandes/${commandeId}/review`, { user_id: userId, ...reviewData });
export const updateCommandeStatus = (commandeId, userId, statusData) =>
  api.put(`/commandes/${commandeId}/status`, { user_id: userId, ...statusData });

/* ========== PRODUITS ========== */
export const fetchProduitsAfrique = () => api.get('/produits_afrique');
export const fetchProduitsAlibaba = () => api.get('/produits_alibaba');
export const fetchProduitsRecents = () => api.get('/produits_recents');
export const fetchCategories = () => api.get('/categories');

export const chercherEquivalentProduit = (nom, categorie) =>
  api.post('/produits_afrique_similaires', { nom, categorie });

export const fetchProduitsSimilairesAlibaba = (nom, categorie) =>
  api.post('/produits_alibaba_similaires', { nom, categorie });

export const addProductView = (produitId, userId) =>
  api.post('/produits/view', { produitId, user_id: userId });

/* ========== UTILISATEURS ========== */
export const getUserProfile = (userId) => api.get(`/users/${userId}`);

export const updateUserProfile = (userId, updateData, token) =>
  api.put(`/users/${userId}`, updateData, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

export const updateUserAvatar = (userId, formData) =>
  api.put(`/users/${userId}/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getProduitsInspires = (userId) =>
  api.post(`/users/${userId}/produits-inspires`, { user_id: userId });

export const generateReferralLink = (userId) =>
  api.post(`/users/${userId}/referral-link`, { user_id: userId });

/* ========== PAIEMENTS ========== */
export const getPaiementConfig = () => api.get('/config/paiement');
export const createPaiement = (paiementData) => api.post('/paiements', paiementData);
export const validatePayment = (paymentData) =>
  api.post('/admin/validate-payment', paymentData);

/* ========== NOTIFICATIONS ========== */
export const sendNotification = (notificationData) =>
  api.post('/notifications/nouvelle-commande', notificationData);

export const sendOrderConfirmation = (notificationData) =>
  api.post('/notifications/order-confirmation', notificationData);

/* ========== FRAIS ET CONFIGURATION ========== */
export const getFraisConfiguration = () => api.get('/frais/configuration');

/* ========== PARTAGE ========== */
export const shareOrder = (shareData) => api.post('/orders/share', shareData);

/* ========== MÉDIAS / IMAGES ========== */
export const fetchAllImages = () => api.get('/images');
export const getImageUrl = (filename) => `${BASE_IMAGE_URL}${filename}`;

/* ========== EXPORT GLOBAL ========== */
export default {
  registerUser,
  loginUser,

  fetchVendeurs,
  fetchVendeurById,

  fetchBoutiques,
  fetchBoutiqueDetail,
  searchBoutiques,
  filterBoutiques,
  trackBoutiqueView,
  fetchProduitsByBoutique,
  addBoutiqueVisit,

  createCommande,
  addDetailCommande,
  createCommandeGroupee,
  fetchCommandeGroupee,
  getTracking,
  getCommandesByUser,
  getCommandeDetails,
  addReview,
  updateCommandeStatus,

  fetchProduitsAfrique,
  fetchProduitsAlibaba,
  fetchProduitsRecents,
  fetchCategories,
  chercherEquivalentProduit,
  addProductView,
  fetchProduitsSimilairesAlibaba,

  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
  getProduitsInspires,
  generateReferralLink,

  getPaiementConfig,
  createPaiement,
  validatePayment,

  sendNotification,
  sendOrderConfirmation,

  getFraisConfiguration,

  shareOrder,

  fetchAllImages,
  getImageUrl,
};
