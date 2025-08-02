// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcs5C_hwX4CCtNVgksKEhW8fcIw8De1hg",
    authDomain: "ruposri-1.firebaseapp.com",
    projectId: "ruposri-1",
    storageBucket: "ruposri-1.appspot.com",
    messagingSenderId: "415958725383",
    appId: "1:415958725383:web:8c30eb2974965ce4230ba2"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize services
  const auth = firebase.auth();
  const db = firebase.firestore();