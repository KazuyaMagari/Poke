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
  // Build canonical image URL from PokeImagesURL using the pokemon id + 1 (requested mapping)
  const idNumber = Number(pokemonIndex);
  const targetId = idNumber + 1;
  const url = `${PokeImagesURL}${targetId}.png`;

  // PokeData からポケモンの名前を取得（画像を +1 したターゲットに合わせる）
  console.log("userIndex", pokemonIndex, "targetId", targetId);
  const pokeEntry = PokeData.pokemon.find((p) => Number(p.id) === targetId);
  const pokemon = pokeEntry?.name ?? PokeData.pokemon[targetId - 1]?.name;
  console.log("pokemon name", pokemon);
    if (!pokemon) {
      console.error("Pokemon data not found in local PokeData.", { idNumber });
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
