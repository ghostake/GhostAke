// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCcs5C_hwX4CCtNVgksKEhW8fcIw8De1hg",
    authDomain: "ruposri.vercel.app",
    projectId: "ruposri-01",
    storageBucket: "ruposri-01.appspot.com",
    messagingSenderId: "415958725383",
    appId: "1:415958725383:web:8c30eb2974965ce4230ba2",
    measurementId: "G-RMJQ3EV113"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();