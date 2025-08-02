const firebaseConfig = {
    apiKey: "AIzaSyCcs5C_hwX4CCtNVgksKEhW8fcIw8De1hg",
    authDomain: "ruposri.vercel.app",
    projectId: "ruposri-01",
    storageBucket: "ruposri-01.firebasestorage.app",
    messagingSenderId: "415958725383",
    appId: "1:415958725383:web:8c30eb2974965ce4230ba2"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();