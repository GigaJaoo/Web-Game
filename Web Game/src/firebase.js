import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';

// SUBSTITUI pelos teus dados do Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBCC2Yfog_zF0UhoLb3KlkxY3LosmA_cR4",
  authDomain: "web-game-a0f1e.firebaseapp.com",
  projectId: "web-game-a0f1e",
  storageBucket: "web-game-a0f1e.firebasestorage.app",
  messagingSenderId: "566009723799",
  appId: "1:566009723799:web:93a9aaf1c71ee33e5b62d2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para submeter score
export const submitScore = async (name, score) => {
  try {
    await addDoc(collection(db, 'scores'), {
      name: name.trim(),
      score: score,
      timestamp: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting score: ', error);
    return { success: false, error: error.message };
  }
};

// Função para obter rankings
export const getTopRankings = async () => {
  try {
    const q = query(
      collection(db, 'scores'),
      orderBy('score', 'desc'),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const rankings = [];
    let rankCounter = 1; // Contador manual
    
    querySnapshot.forEach((doc) => {
      console.log(`Doc ${rankCounter}:`, doc.data()); // Debug
      
      rankings.push({
        rank: rankCounter, // Usar contador manual
        name: doc.data().name,
        score: doc.data().score,
        id: doc.id
      });
      
      rankCounter++; // Incrementar para o próximo
    });
    
    console.log('Rankings finais com contador manual:', rankings); // Debug
    return { success: true, rankings };
  } catch (error) {
    console.error('Error getting rankings: ', error);
    return { success: false, rankings: [] };
  }
};