import axios from 'axios';
import { useState, useEffect } from 'react';
const API_URL =  import.meta.env.VITE_API_BASE_URL;


function Quiz() {
    const [quiz, setQuiz] = useState(""); 

    const getQuiz = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/quiz/image/1`);
            setQuiz(res.data.url);
        } catch (error) {
            console.error("Error fetching quiz:", error);
            setQuiz("クイズの取得に失敗しました。");
        }

    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <div>
            <h1>クイズ</h1>
            <img src={quiz} alt="Pokemon" />
        </div>
    );
}

export default Quiz;
