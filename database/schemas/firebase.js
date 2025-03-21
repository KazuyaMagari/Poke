import {initializeApp}  from "firebase/app";
import { getFirestore, getDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { PokeImagesURL } from "./PokemonList.js";

const firebaseConfig = {
  apiKey: "AIzaSyCO8bW9kv_oD9Lj2q97Tnw9ZLJzc-s80KU",
  authDomain: "pokemonlist-ce83b.firebaseapp.com",
  projectId: "pokemonlist-ce83b",
  storageBucket: "pokemonlist-ce83b.appspot.com",
  messagingSenderId: "1032065133155",
  appId: "1:1032065133155:web:96bb3c3ae15da172026656"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addPokemon(index) {
  const url = `${PokeImagesURL}${index}.png`;
  
  try {
    await setDoc(doc(db, "pokemon", `${index}`), {
      url,
      index,
      createdAt: serverTimestamp()
    });
    console.log(`Pokemon with index ${index} added successfully.`);
  } catch (error) {
    console.error("Error adding Pokemon:", error);
  }
}

// for (let i = 1; i <= 150; i++) {
//   addPokemon(i);
// }

export  { db, firebaseConfig, app, doc, getDoc };
