const { db, getDoc, doc } = await import("../../database/schemas/firebase.js");

const quizController = {
    get: (req, res) => {
        console.log("success");
        res.json({ message: "Hello World" });
    },

    getImage: async (req, res) => {
        const { index } = req.params;
        try {
            const pokemonRef = doc(db, "pokemon", index);
            const pokemonDoc = await getDoc(pokemonRef);
            
            if (pokemonDoc.exists()) {
                const { url } = pokemonDoc.data();
                res.json({ url, index });
            } else {
                res.status(404).json({ message: "Pokemon not found" });
            }
        } catch (error) {
            console.error("Error fetching image:", error);
            res.status(500).json({ message: "Error fetching image" });
        }
        
    }
};

export default quizController;
