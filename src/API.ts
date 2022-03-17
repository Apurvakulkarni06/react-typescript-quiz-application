import { shuffleAnswers } from './utils';

import { Question, Difficulty } from './propTypes'; 

export const fetchQuestions =async (amount:number, difficulty: Difficulty) => {
    const questionUrl = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(questionUrl)).json();

    return data.results.map((question: Question) =>({
        ...question,
        answers: shuffleAnswers([...question.incorrect_answers, question.correct_answer])
    }));
}