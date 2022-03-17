import { UserAnswer } from "../propTypes";
import { Wrapper, ButtonWrapper } from "./Quizcard.styles";
type QuestionCardProps = {
  question: string;
  answers: string[];
  userAnswer: UserAnswer | undefined;
  totalQuestion: number;
  questionNumber: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const QuizCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  userAnswer,
  totalQuestion,
  questionNumber,
  callback,
}) => {

  return (
    <Wrapper>
      <p className="number">
        Question: {questionNumber} / {totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="answers">
        {answers.map((answer, index: number) => (
          <ButtonWrapper 
          correct = { userAnswer?.correct_answer === answer}
          userClicked = { userAnswer?.answer === answer}
          key={index}>
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuizCard;
