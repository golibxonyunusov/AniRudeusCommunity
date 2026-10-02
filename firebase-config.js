// ============================================================
// Umumiy Firebase konfiguratsiyasi.
// Ushbu faylni auth, ma'lumotlar bazasi kerak bo'lgan HAR BIR
// sahifaga <script src="firebase-config.js"></script> orqali ulang
// (Firebase compat SDK skriptlaridan KEYIN joylashtiring).
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyDabRBPtkrieFfxeLgWH6u2Jlebl7aXb-k",
  authDomain: "olmp-cb037.firebaseapp.com",
  projectId: "olmp-cb037",
  storageBucket: "olmp-cb037.firebasestorage.app",
  messagingSenderId: "724494651784",
  appId: "1:724494651784:web:291cd4b1a28e2ce999ea3d",
  measurementId: "G-SLXV56GYLV"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

// Foydalanuvchi faqat nickname + parol bilan ishlaydi.
// Firebase Auth email talab qilgani uchun nickname'dan "soxta" email yasaymiz.
const NICK_DOMAIN = "@users.anirudeus.app";

function sanitizeNickname(raw) {
  return (raw || "").trim().toLowerCase().replace(/[^a-z0-9_.]/g, "");
}

function nickToEmail(nickname) {
  return sanitizeNickname(nickname) + NICK_DOMAIN;
}
