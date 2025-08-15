import { auth, db, doc, getDocs, collection, deleteDoc } from "../../lib/firebase";
import { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


interface Props {
    name: string;
    url: string;
    id: string
}
function List() {
    const [data, setData] = useState<Props[]>([]);
    const [userId, setUserId] = useState<string | null>(auth.currentUser?.uid || null);

    useEffect(() => {
        // 認証状態が変わったら userId を更新
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                setUserId(user.uid);
                console.log("User ID:", user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // add Pokemon data from firestore
    const getData = async (userId: string) => {
        try {
          const userRef = collection(db, "users", userId, "pokemons"); // Collection reference
      
          const querySnapshot = await getDocs(userRef); // Fetch documents from collection
      
          if (querySnapshot.empty) {
            console.log("No Pokémon found for this user.");
            setData([]); // Clear data if empty
            return;
          }
      
          // Map over documents and set data
          const pokemonsData = querySnapshot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id, // Add document ID
          }));

          setData(pokemonsData);
        } catch (error) {
          console.error("Error fetching Pokémons:", error);
        }
      };
        useEffect(() => {
          if (userId) getData(userId); 
        }, [userId]);
        const handleDelete = async (pokemonId: string) => {
            try {
                // delete doc of database
                const pokemonRef = doc(db, "users", userId!, "pokemons", pokemonId);
                await deleteDoc(pokemonRef);
                console.log(`Deleted Pokémon with ID: ${pokemonId}`);
    
                // delete localdata
                setData((prevData) => prevData.filter((item) => item.id !== pokemonId));
            } catch (error) {
                console.error("Error deleting Pokémon:", error);
            }
        };
          
    return (
            <div className="container">
                <div className="row text-center">
                    <h2>Pokemon List</h2>
                </div>
                {data.length === 0 ? (
                    <div className="row text-center">
                        <h3>No Pokémon found.</h3>
                    </div>
                ) : (
                    <div className="row d-flex justify-content-center">
                        {data.map((item, index) => (
                            <div className="col-md-2 mb-4 d-flex justify-content-center" key={index}>
                                <Card style={{ width: '13rem' }}>
                                    <Card.Img variant="top" src={item.url} alt={item.name} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Button variant="primary" onClick={() => handleDelete(item.id)}>削除する</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
}

export default List;
