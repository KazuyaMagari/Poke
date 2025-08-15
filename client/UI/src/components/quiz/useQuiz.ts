import axios from 'axios';

import { useEffect, useState, useCallback } from 'react';
import PokeData from '../../lib/pokeData';
import { buildApiUrl, validateApiConfig } from '../../config/api';

export interface SolvedItem {
  url: string;
  name: string;
  isCorrect: boolean;
  id: number;
}

export default function useQuiz(total = 10) {
  const [quizUrl, setQuizUrl] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [solved, setSolved] = useState<SolvedItem[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const getQuiz = useCallback(async () => {
    try {
      // Validate API configuration
      if (!validateApiConfig()) {
        throw new Error('API configuration is invalid');
      }
      
      const randNum = Math.floor(Math.random() * 151) + 1;
      const res = await axios.get(buildApiUrl('quiz/image', randNum.toString()));
      setQuizUrl(res.data.url);

      const correctName: string | undefined = PokeData.pokemon.find((p: any) => p.id === randNum)?.name;
      setCorrectAnswer(correctName ?? '');

  setSolved((prev) => [...prev, { url: res.data.url, name: correctName ?? '', isCorrect: false, id: randNum }]);
      setUserAnswer('');
      setQuestionCount((c) => c + 1);
    } catch (e) {
      console.error('Error fetching quiz:', e);
      setQuizUrl(null);
    }
  }, []);

  const submitAnswer = useCallback(() => {
    if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      setCorrectCount((c) => c + 1);
      setSolved((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = { ...updated[updated.length - 1], isCorrect: true };
        }
        return updated;
      });
    }

    if (questionCount < total) {
      getQuiz();
    } else {
      setQuizComplete(true);
    }
  }, [correctAnswer, getQuiz, questionCount, total, userAnswer]);

  const restart = useCallback(() => {
    setQuizUrl(null);
    setUserAnswer('');
    setSolved([]);
    setQuestionCount(0);
    setCorrectCount(0);
    setQuizComplete(false);
    setCorrectAnswer('');
    getQuiz();
  }, [getQuiz]);

  useEffect(() => {
    getQuiz();
  }, [getQuiz]);

  return {
    quizUrl,
    userAnswer,
    setUserAnswer,
    solved,
    questionCount,
    correctCount,
    quizComplete,
    submitAnswer,
    restart,
  };
}
