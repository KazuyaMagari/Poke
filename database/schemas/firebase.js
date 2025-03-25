import { initializeApp } from "firebase/app";
import { 
  getFirestore, deleteDoc, getDoc, setDoc, getDocs, collection, addDoc, doc, serverTimestamp, updateDoc, arrayUnion, 
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth";
import PokeData from "../PokeData.js";
import { PokeImagesURL } from "./PokemonList.js";


const firebaseConfig = {
  apiKey: "AIzaSyCO8bW9kv_oD9Lj2q97Tnw9ZLJzc-s80KU",
  authDomain: "pokemonlist-ce83b.firebaseapp.com",
  projectId: "pokemonlist-ce83b",
  storageBucket: "pokemonlist-ce83b.appspot.com",
  messagingSenderId: "1032065133155",
  appId: "1:1032065133155:web:96bb3c3ae15da172026656"
};
console.log('hello')
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export const savePokemonToUserList = async (pokemonIndex, userId) => {
  onAuthStateChanged(auth, async () => {
    if (!userId) {
      console.log("Please sign in first!");
      return;
    }
    console.log("User is:", userId);
  });
  try {
    // Firestore からポケモンのURLを取得
    const pokemonRef = doc(db, "pokemon", pokemonIndex); 
    const pokemonDoc = await getDoc(pokemonRef);

    if (!pokemonDoc.exists()) {
      console.error("Pokemon not found in Firestore.");
      return;
    }

    const { url } = pokemonDoc.data();
    
    // PokeData からポケモンの名前を取得
    console.log("userIndex", pokemonIndex)
    const pokemon = PokeData.pokemon[pokemonIndex].name;
    console.log("pokemon name", pokemon)
    if (!pokemon) {
      console.error("Pokemon data not found in local PokeData.");
      return;
    }

    // Firestore に保存
    await addDoc(collection(db, "users", userId, "pokemons"), {
      index: pokemonIndex,
      name: pokemon,
      url: url,
      createdAt: serverTimestamp(),
    });

    console.log(`Saved Pokemon: ${pokemon} (ID: ${pokemonIndex})`);
  } catch (error) {
    console.error("Error saving Pokemon:", error);
  }
};

export { deleteDoc,db, firebaseConfig, app, doc, getDoc, getDocs, auth, collection, provider, signInWithPopup, serverTimestamp};
