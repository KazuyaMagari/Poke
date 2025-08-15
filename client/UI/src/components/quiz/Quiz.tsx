import { useCallback } from 'react';
import useQuiz from './useQuiz';
import ResultItem from './ResultItem';
import { auth } from '../../lib/firebase';
import axios from 'axios';

function Quiz() {
  const {
    quizUrl,
    userAnswer,
    setUserAnswer,
    solved,
    questionCount,
    correctCount,
    quizComplete,
    submitAnswer,
    restart,
  } = useQuiz(10);

  const listHandler = useCallback(async (index: number) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert('Please sign in first!');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/list/${userId}/${index}`);
      if (res.status === 200) alert('ポケモンがリストに追加されました！');
    } catch (e) {
      console.error(e);
    }
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
          <h3>解いたポケモン</h3>
          {solved.map((item) => (
            <ResultItem key={item.id} item={item} onAddToList={listHandler} />
          ))}

          <button className="btn btn-primary" onClick={restart}>
            もう一度挑戦する
          </button>
        </div>
      ) : (
        <div className="col-auto d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-column align-items-center">
            {quizUrl && (
              <img 
                src={quizUrl}
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

            <button className="btn btn-primary" onClick={submitAnswer} style={{ width: '100px', height: '50px' }}>
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
