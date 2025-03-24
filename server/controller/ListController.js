import { savePokemonToUserList } from "../../database/schemas/firebase.js";
import PokeData from "../../database/PokeData.js";

const ListController = {
    addList: async (req, res) => {
        const { index, userId } = req.params;
        try {
            await savePokemonToUserList(index, userId);
            res.json({ message: "Pokemon saved!" });
        } catch (error) {
            console.error("Error saving pokemon:", error);
            res.status(500).json({ message: "Error saving pokemon" });
        }
        res.json({ message: "Hello World from index" });
    }
};

export default ListController;
