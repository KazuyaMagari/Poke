import axios from 'axios';
import { useState, useEffect } from 'react';
import PokeData from '../../../../../database/PokeData.ts';

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Quiz() {
  const [quiz, setQuiz] = useState<string | null>(null); 
  const [userAnswer, setUserAnswer] = useState(""); 
  const [questionCount, setQuestionCount] = useState(0); 
  const [correctCount, setCorrectCount] = useState(0); 
  const [quizComplete, setQuizComplete] = useState(false); 
  const [correctAnswer, setCorrectAnswer] = useState("");

  const getQuiz = async () => {
    try {
      const randNum = Math.floor(Math.random() * 151) + 1;
      const res = await axios.get(`${API_URL}/quiz/image/${randNum}`);
  
      setQuiz(res.data.url);
      const correctName: string | undefined = PokeData.pokemon.find(pokemon => pokemon.id === randNum)?.name;
      setCorrectAnswer(correctName ?? "");
      
      console.log("Correct Answer:", correctName);
      console.log("Pokemon ID:", randNum);

      setUserAnswer(""); // Reset user answer
      setQuestionCount(prev => prev + 1); 
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setQuiz("クイズの取得に失敗しました。");
    }
  };

  const handleSubmit = () => {
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setCorrectCount(prev => prev + 1);
    }

    if (questionCount < 10) { // 10 questions total
      getQuiz(); 
    } else {
      setQuizComplete(true);
    }
  };

  useEffect(() => {
    getQuiz(); // Load first quiz on component mount
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <h1>What is the name of this Pokemon?</h1>
        </div>
      </div>

      {quizComplete ? (
        <div className="text-center">
          <h2>クイズ終了！</h2>
          <p>あなたの正解数は {correctCount} / 10 問です！</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            もう一度挑戦する
          </button>
        </div>
      ) : (
        <div className="col-auto d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center">
            {quiz && (
              <img 
                src={quiz}
                alt="Pokemon" 
                className="mb-3"
                style={{ width: '300px', height: '300px' }}
              />
            )}
            
            <input 
              type="text" 
              className="form-control mb-2"
              style={{ width: '300px', height: '50px' }}
              placeholder="答えを入力してください"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            
            <button className="btn btn-primary" onClick={handleSubmit} style={{ width: '100px', height: '50px' }}>
              次へ
            </button>
            
            <p className="mt-3">問題 {questionCount} / 10</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
