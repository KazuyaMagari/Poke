declare module 'database/schemas/firebase' {
  export const auth: any;
  export const db: any;
  export const provider: any;
  export const signInWithPopup: any;
  export const doc: any;
  export const getDoc: any;
  export const getDocs: any;
  export const collection: any;
  export const deleteDoc: any;
  export const serverTimestamp: any;
  export const firebaseConfig: any;
  export default any;
}

declare module 'database/PokeData.js' {
  const data: any;
  export default data;
}

// Also allow direct relative imports used earlier
declare module '../../../../../database/schemas/firebase' {
  export const auth: any;
  export const db: any;
  export const provider: any;
  export const signInWithPopup: any;
  export const doc: any;
  export const getDoc: any;
  export const getDocs: any;
  export const collection: any;
  export const deleteDoc: any;
  export const serverTimestamp: any;
  export const firebaseConfig: any;
  export default any;
}

declare module '../../../../../database/PokeData.js' {
  const data: any;
  export default data;
}
