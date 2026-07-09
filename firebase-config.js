/*
  TEMPLATE: firebase-config.js
  ---------------------------------
  Place your Firebase web SDK initialization here to enable direct
  writes to Firestore from the landing page. This file is intentionally
  non-operative until you add your config and uncomment the import code.

  Example (module-based):

  // 1) Add Firebase SDK via CDN (module) in index.html or dynamically import
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
  import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

  const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // 2) expose sendToFirestore to the page
  window.sendToFirestore = async function(submission) {
    // collection name: prelaunch_vendors
    const docRef = await addDoc(collection(db, 'prelaunch_vendors'), submission);
    return docRef;
  }

  For an easier setup you can use Firebase v8 namespaced SDK or write
  a small Cloud Function to accept POST requests from the frontend.

  WARNING: Do NOT commit production API keys in public repositories.
*/

// Placeholder stub while firebase is not configured.
window.sendToFirestore = window.sendToFirestore || undefined;
