const { db, getDoc, doc } = await import("../../database/schemas/firebase.js");
import { PokeImagesURL } from "../../database/schemas/PokemonList.js";

const quizController = {
    get: (req, res) => {
        console.log("success");
        res.json({ message: "Hello World" });
    },

    getImage: async (req, res) => {
        const { index } = req.params;
        try {
            const docId = String(index);
            const pokemonRef = doc(db, "pokemon", docId);
            const pokemonDoc = await getDoc(pokemonRef);

            const url = (pokemonDoc.exists() && pokemonDoc.data().url) ? pokemonDoc.data().url : `${PokeImagesURL}${Number(index) + 1}.png`;
            res.json({ url, index });
        } catch (error) {
            console.error("Error fetching image:", error);
            res.status(500).json({ message: "Error fetching image" });
        }
        
    }
};

export default quizController;
