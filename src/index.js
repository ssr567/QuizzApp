import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizServive from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class QuizzApp extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0,
  };

  getQuestions = () => {
    quizServive().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
  };

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5,
    });
  };

  playAgain = () => {
    this.setState({
      score: 0,
      responses: 0,
    });
    this.getQuestions();
  };

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    const { questionBank, responses, score } = this.state;
    return (
      <div className="container">
        <div className="title">Quizz App</div>
        {questionBank.length > 0 &&
          responses < 5 &&
          questionBank.map(({ question, answers, correct, questionId }) => (
            <QuestionBox
              question={question}
              options={answers}
              key={questionId}
              selected={(answer) => this.computeAnswer(answer, correct)}
            />
          ))}

        {responses === 5 ? (
          <Result score={score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<QuizzApp />, document.getElementById("root"));
