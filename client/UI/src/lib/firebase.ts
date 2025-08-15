// thin wrapper so UI imports a small, stable module path
import {
  auth,
  db,
  provider,
  signInWithPopup,
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  serverTimestamp,
} from 'database/schemas/firebase';

export { auth, db, provider, signInWithPopup, doc, getDoc, getDocs, collection, deleteDoc, serverTimestamp };

export default { auth, db };
