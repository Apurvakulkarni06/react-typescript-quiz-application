import React, { useState } from "react";
import QuizCard from "./components/QuizCard";

import { fetchQuestions } from "./API";
import { QuestionState, Difficulty, UserAnswer } from "./propTypes";

import { GlobalStyles, Wrapper } from "./App.styles"

const TOTAL_QUESTIONS = 10;


const enum state {
  INIT = "initial",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

function App() {
  const [appState, setAppState] = useState(state.INIT);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameover] = useState(true);

  const startTrivia = async () => {
    setAppState(state.LOADING);
    setGameover(false);
    try {
      const quizQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );
      setQuestions(quizQuestions);
      setAppState(state.SUCCESS);
    } catch {
      setAppState(state.ERROR);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // get user's answer
    const selectedAnswer = e.currentTarget.value;
   
    // check selected  anwers is correct
    const isCorrectAnswer = questions[number].correct_answer === selectedAnswer;
    
    // add score if answer is correct
    if(isCorrectAnswer) setScore(prev=> prev + 1);
    
    // save user answer in an array
    const userSelectedAnswer = {
      question: questions[number].question,
      answer: selectedAnswer,
      correct: isCorrectAnswer,
      correct_answer: questions[number].correct_answer
    }

    setUserAnswers(prev=>[...prev, userSelectedAnswer])
  };

  const nextQuestion = () => {
    if (number === (TOTAL_QUESTIONS - 1)) {
      setGameover(true);
    }
    else{
      setNumber(prev=> prev + 1);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        {appState === state.ERROR && <p> Opps something went wrong..</p>}
        
        <h1>REACT QUIZ APP</h1>

        {
          gameOver && userAnswers.length > 0  && 
          <h2 className="score-board">Your total score is {score} / {TOTAL_QUESTIONS} </h2>
        }
        
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start-button" onClick={startTrivia}>
            Start Quiz
          </button>
        ) : null}
        
        {!gameOver && <p className="score">Score:{score}</p>}
        {appState === state.LOADING && (
          <p className="loader">Loading Questions...</p>
        )}

        {appState === state.SUCCESS && !gameOver && (
          <>
            <QuizCard
              questionNumber={number + 1}
              question={questions[number].question}
              answers={questions[number].answers}
              totalQuestion={TOTAL_QUESTIONS}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
            {
              userAnswers.length === number + 1
              && number !== TOTAL_QUESTIONS
              ?
              <button className = "next-question" onClick={nextQuestion}>Next Question</button>
              :
              null
              
            }
          </>
        )}
      </Wrapper>
    </>
    
  );
}

export default App;
